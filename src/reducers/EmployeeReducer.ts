import { Employee, EmployeeAction } from "../types/EmployeeTypes";
import { SET_EMPLOYEES, ADD_EMPLOYEE } from "../actions/actionTypes";

export const employeeReducer = (state: Employee[], action: EmployeeAction): Employee[] => {
    switch (action.type) {
        case SET_EMPLOYEES:
            return action.payload as Employee[];
        case ADD_EMPLOYEE:
            return [...state, action.payload as Employee];
        default:
            return state;
    }
};