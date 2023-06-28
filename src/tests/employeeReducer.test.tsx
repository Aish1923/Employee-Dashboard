import { Employee } from "../types/EmployeeTypes";
import { ADD_EMPLOYEE, SET_EMPLOYEES } from "../actions/actionTypes";
import { EmployeeAction } from "../types/EmployeeTypes";
import { employeeReducer } from "../reducers/EmployeeReducer";

describe("employeeReducer", () => {
  const mockEmployees: Employee[] = [
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
    }];

  it("should set employees List to be shown on Dashboard or charts", () => {
    const initialState: Employee[] = [];
    const action: EmployeeAction = {
      type: SET_EMPLOYEES,
      payload: mockEmployees,
    };

    const newState = employeeReducer(initialState, action);

    expect(newState).toEqual(mockEmployees);
  });

  it("should add a new employee correctly to the list of existing employees", () => {
    const initialState: Employee[] = mockEmployees;
    const action: EmployeeAction = {
      type: ADD_EMPLOYEE,
      payload: {
        "name": "Allison Rogers",
        "jobTitle": "Marketing Specialist",
        "tenure": "1",
        "gender": "Female"
      },
    };

    const newState = employeeReducer(initialState, action);

    expect(newState).toEqual([
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
      }
    ]);
  });
  
  it("should return initialState if an action is dispatched with a not matching action types", () => {
    const initialState: Employee[] = mockEmployees;
    const action: EmployeeAction = {
      type: 'DEFAULT_CASE',
      payload: {
        "name": "Allison Rogers",
        "jobTitle": "Marketing Specialist",
        "tenure": "1",
        "gender": "Female"
      },
    };

    const newState = employeeReducer(initialState, action);

    expect(newState).toEqual(mockEmployees);
  });
});
