import { Employee } from "../types/EmployeeTypes";

export const validateForm = (fieldName: keyof Employee, value: string): string => {
    let error = "";
    if (fieldName === "name") {
        if (value.trim() === "") {
            error = "Name is required";
        }
    }
    if (fieldName === "jobTitle") {
        if (value.trim() === "") {
            error = "Job Title is required";
        }
    }

    if (fieldName === "tenure") {
        if (value.trim() === "") {
            error = "Tenure is required";
        }
        else if (!/^\d+$/.test(value)) {
            error = "Tenure must be a numeric value";
        }
    }

    return error;

}