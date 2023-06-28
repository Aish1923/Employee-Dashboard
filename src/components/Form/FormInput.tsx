import { InputProps } from "../../types/FormComponentTypes";
import "./FormComponent.css";


function FormInput(props: InputProps): JSX.Element {

    const { label, id, errorMessage, handleChange, handleBlur, ...inputProps } = props;

    return (
        <div className="form-input">
            <label htmlFor={id}>{label}</label>
            <input {...inputProps} id={id} onChange={handleChange} onBlur={handleBlur} />
            <span className="error">{errorMessage}</span>
        </div>
    );

}

export default FormInput;