import { screen, render, fireEvent } from "@testing-library/react";
import { EmployeeContext } from "../context/EmployeeContext";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import * as router from "react-router"
import "@testing-library/jest-dom";

describe("Dasboard Component:", () => {

  const mockEmployees = [
    {
      "name": "Mike Potts",
      "jobTitle": "CEO",
      "tenure": "5",
      "gender": "Male"
    },
    {
      "name": "Tom Connor",
      "jobTitle": "Developer",
      "tenure": "2",
      "gender": "Male"
    },
  ];

  const navigate = jest.fn();
  beforeEach(() => {
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate)
  })

  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <EmployeeContext.Provider value={{ employees: mockEmployees, isLoading: false, addEmployee: jest.fn() }}>
          <Dashboard />
        </EmployeeContext.Provider>
      </BrowserRouter>

    );
  };
  it("renders the Dashboard component", () => {
    renderDashboard();
    const headingElement = screen.getByText("Corporate Employees");
    expect(headingElement).toBeInTheDocument();

    const addButton = screen.getByText("Add Employee");
    expect(addButton).toBeInTheDocument();

    const addEmployeeButton = screen.getByRole("button");
    expect(addEmployeeButton).toBeInTheDocument();

    const employeeTable = screen.getByRole("table");
    expect(employeeTable).toBeInTheDocument();

  });

  it("should have four columns as table headers and three rows including the header row", () => {
    renderDashboard();
    const tableHeaders = screen.getAllByRole("columnheader");
    expect(tableHeaders.length).toBe(4);

    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBe(3);
  });


  it("should redirect to add-employee page on click of button", async () => {
    renderDashboard();
    fireEvent.click(screen.getByRole("button"));
    expect(navigate).toBeCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("/add-employee");

  });

  it("should render the tiles showing BarGraph and PieChart", async () => {
    renderDashboard();
    const tileHeading = screen.getByRole("group", { name: "Employees By Job Title" });
    expect(tileHeading).toBeInTheDocument();

    const tileHeading2 = screen.getByRole("group", { name: "Employees By Gender" });
    expect(tileHeading2).toBeInTheDocument();

    const chartElements = screen.getAllByRole("img");
    expect(chartElements.length).toBe(2);


  });


  it("should render progressBar when data is still being loaded", () => {
    render(
      <BrowserRouter>
        <EmployeeContext.Provider value={{ employees: mockEmployees, isLoading: true, addEmployee: jest.fn() }}>
          <Dashboard />
        </EmployeeContext.Provider>
      </BrowserRouter>
    );
    const progressSpinner = screen.getByRole("alert");
    expect(progressSpinner).toBeInTheDocument();
  });
});