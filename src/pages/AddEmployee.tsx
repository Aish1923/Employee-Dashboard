import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/Form/FormInput";
import FormRadio from "../components/Form/FormRadio";
import { EmployeeContext } from "../context/EmployeeContext";
import { Employee } from "../types/EmployeeTypes";
import { validateForm } from "../utility/validateForm";
import "./AddEmployee.css"

function AddEmployee() {
    const { addEmployee } = useContext(EmployeeContext);
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        jobTitle: "",
        tenure: "",
        gender: "",
    });
    const [errors, setFormErrors] = useState<Partial<Employee>>({});
    const isSubmitDisabled = Object.values(errors).some((error) => !!error) || !values.name || !values.jobTitle || !values.tenure || !values.gender;

    const options = [
        { value: "Male", label: "Male", id: "1", name: "Male" },
        { value: "Female", label: "Female", id: "2", name: "Female" },
    ];

    /* function to navigate to the dashboard component after new employee is added and is shown on table */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addEmployee(values);
        navigate("/");
    };
    /* function to hab=ndle Input button change onBlur to show error messsages  */
    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const error = validateForm(e.target.name as keyof Employee, e.target.value);
        setFormErrors({ ...errors, [e.target.name]: error })
    };
    /* function to handle the Input button change and update form values */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    /* function to handle the radio button selection and update form values */
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="heading">Add Employee Form</h2>
            <FormInput placeholder="Please enter the name" id="name" required name="name" handleBlur={handleBlur} errorMessage={errors.name} handleChange={handleInputChange} label="Name:" />
            <FormInput placeholder="Please enter the Job Title" id="jobTitle" name="jobTitle" handleBlur={handleBlur} errorMessage={errors.jobTitle} handleChange={handleInputChange} label="Job Title:" />
            <FormInput placeholder="Please enter the tenure" id="tenure" name="tenure" handleBlur={handleBlur} errorMessage={errors.tenure} handleChange={handleInputChange} label="Tenure:" />
            <FormRadio
                options={options}
                selectedValue={values.gender}
                handleChange={handleRadioChange}
                name="gender"
                label="Gender"
                checked={false}
            />
            <div className="buttons-container">
                <button className="add-employee-btn" disabled={isSubmitDisabled}>Add Employee</button>
                <button onClick={() => navigate("/")}>Cancel</button>
            </div>
        </form>
    )
}

export default AddEmployee