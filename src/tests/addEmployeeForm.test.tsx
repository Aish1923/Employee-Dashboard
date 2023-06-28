import * as router from "react-router";
import { screen, render, fireEvent } from "@testing-library/react";
import AddEmployee from "../pages/AddEmployee";
import { BrowserRouter } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import "@testing-library/jest-dom";
describe("Add Employee form", () => {
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

    const navigate = jest.fn();
    const addEmployeeMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(router, "useNavigate").mockImplementation(() => navigate)
    })

    const mockContextValue = {
        employees: mockEmployees,
        isLoading: false,
        addEmployee: addEmployeeMock
    };

    const renderAddEmployeeForm = () => {
        return render(
            <BrowserRouter>
                <EmployeeContext.Provider value={mockContextValue}>
                    <AddEmployee />
                </EmployeeContext.Provider>
            </BrowserRouter>
        );
    };
    it("should render the UI form Elements", () => {

        renderAddEmployeeForm();

        const formHeading = screen.getByRole("heading", { name: "Add Employee Form" });
        expect(formHeading).toBeInTheDocument();

        const inputBoxes = screen.getAllByRole("textbox");
        expect(inputBoxes.length).toBe(3);

        const radioButton = screen.getAllByRole("radio");
        expect(radioButton.length).toBe(2);

        const addEmployeeButton = screen.getByRole("button", { name: "Add Employee" });
        expect(addEmployeeButton).toBeInTheDocument();

    })
    it("should call addEmployee function with entered values from form and navigate to dashboard Page when button clicked", () => {

        renderAddEmployeeForm();
        const nameInput = screen.getByLabelText("Name:");
        const jobTitleInput = screen.getByLabelText("Job Title:");
        const tenureInput = screen.getByLabelText("Tenure:");
        const addEmployeeButton = screen.getByRole("button", { name: "Add Employee" });
        const radioInput = screen.getByLabelText("Male");

        fireEvent.click(radioInput);
        fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
        fireEvent.change(nameInput, { target: { value: "John Doe" } });
        fireEvent.change(tenureInput, { target: { value: "2" } });

        fireEvent.click(addEmployeeButton);

        expect(mockContextValue.addEmployee).toHaveBeenCalledWith({
            name: "John Doe",
            jobTitle: "Software Engineer",
            tenure: "2",
            gender: "Male",
        });
       
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith("/");

    })
    it("should display error messages for fields depending on the conditions", () => {

        renderAddEmployeeForm();
        const nameInput = screen.getByLabelText("Name:");
        const jobTitleInput = screen.getByLabelText("Job Title:");
        const tenureInput = screen.getByLabelText("Tenure:");

        fireEvent.blur(jobTitleInput, { target: { value: "" } });
        const errorElementJobTitle = screen.getByText("Job Title is required");
        expect(errorElementJobTitle).toBeInTheDocument();
        expect(errorElementJobTitle).toHaveClass("error");

        fireEvent.blur(tenureInput, { target: { value: "abcdef" } });
        const errorElementTenure = screen.getByText("Tenure must be a numeric value");
        expect(errorElementTenure).toBeInTheDocument();
        expect(errorElementTenure).toHaveClass("error");

        fireEvent.blur(nameInput, { target: { value: "" } });
        const errorElementName = screen.getByText("Name is required");
        expect(errorElementName).toBeInTheDocument();
        expect(errorElementName).toHaveClass("error");


    })
    it("should render Cancel button and clicking it should redirect back to dashboard", () => {

        renderAddEmployeeForm();
        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(cancelButton);
        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith("/");


    })
})