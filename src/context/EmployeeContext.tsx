import React, { createContext, useEffect, useReducer, useState } from "react";
import { Employee } from "../types/EmployeeTypes";
import { employeeReducer } from "../reducers/EmployeeReducer";
import { ADD_EMPLOYEE, SET_EMPLOYEES } from "../actions/actionTypes";

interface EmployeeContextProps {
    employees: Employee[];
    addEmployee: (employee: Employee) => void;
    isLoading: boolean;
}
interface EmployeeProviderProps {
    children: React.ReactNode;
}

export const EmployeeContext = createContext<EmployeeContextProps>({
    "employees": [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    "addEmployee": () => { },
    "isLoading": true
});

export const EmployeeProvider = ({ children }: EmployeeProviderProps): JSX.Element => {

    const [isLoading, setisLoading] = useState<boolean>(true);
    const [employees, dispatch] = useReducer(employeeReducer, []);

    /*
     *To fetch data from local json file to populate different UI components on the dashboard
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                setisLoading(true);
                const response = await fetch("/data.json");
                const data: Employee[] = await response.json();
                dispatch({ "type": SET_EMPLOYEES, "payload": data });
                setisLoading(false);
            } catch (error) {
                setisLoading(true);
                console.error("Error fetching data from Json:", error);
            }
        };
        fetchData();
    }, []);

    /*
     *!
     * To update employees state with newly added employee
     *
     * @param employee:new employee object
     */
    const addEmployee = (employee: Employee): void => {
        dispatch({ "type": ADD_EMPLOYEE, "payload": employee });
    };


    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, isLoading }}>
            {children}
        </EmployeeContext.Provider>
    );

};
