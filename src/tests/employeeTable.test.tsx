import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeTable from "../components/Table/EmployeeTable";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("EmployeeTable", () => {
  const mockEmployees = [
    {
      "name": "Jesse Karl",
      "jobTitle": "Developer",
      "tenure": "3",
      "gender": "Male"
    },
    {
      "name": "Kelly Turner",
      "jobTitle": "QA",
      "tenure": "8",
      "gender": "Female"
    },
    {
      "name": "Allison Rogers",
      "jobTitle": "Marketing Specialist",
      "tenure": "1",
      "gender": "Female"
    },
    {
      "name": "Allison",
      "jobTitle": "Marketing Specialist",
      "tenure": "1",
      "gender": "Female"
    },
    {
      "name": "Brian Phillips",
      "jobTitle": "QA",
      "tenure": "12",
      "gender": "Male"
    },
  ];
  const renderEmployeeTable = () => {
    return render(
      <BrowserRouter>
        <EmployeeContext.Provider value={{ employees: mockEmployees, isLoading: true, addEmployee: jest.fn() }}>
          <EmployeeTable />
        </EmployeeContext.Provider>
      </BrowserRouter>
    );
  };

  it("should render the table with employee data", () => {
    renderEmployeeTable();

    const headingElement = screen.getAllByRole("table")
    expect(headingElement.length).toBe(1);
    
    const rowElement = screen.getByRole("row", { name: "Jesse Karl Developer 3 Male" });
    expect(rowElement).toBeInTheDocument();

    const genderM = screen.getAllByRole("cell", { name: "Male" });
    expect(genderM.length).toBe(2);

    const genderF = screen.getAllByRole("cell", { name: "Female" });
    expect(genderF.length).toBe(3);

    const columnHeader = screen.getByRole("columnheader", { name: "Job Title" });
    expect(columnHeader).toBeInTheDocument();
  });

  it("should render each employee detail in a row", () => {
    renderEmployeeTable();

    mockEmployees.forEach((data) => {
      const text = data.name + " " + data.jobTitle + " " + data.tenure + " " + data.gender;
      const rowElement = screen.getByRole("row", { name: text });
      expect(rowElement).toBeInTheDocument();
    });
  });
});
