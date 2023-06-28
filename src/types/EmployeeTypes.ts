export interface Employee {
    name: string,
    jobTitle: string,
    tenure: string,
    gender: string
}

export interface EmployeeAction {
    type: string;
    //currently since using only add employee and setting initial employee list,otherwise can also convert each action to type and use union of each
    payload?: Employee | Employee[];
}