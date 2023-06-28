import React from "react";
import { RadioButtonProps } from "../../types/FormComponentTypes";
import { Option } from "../../types/FormComponentTypes";
import "./FormComponent.css";


function FormRadio({ options, selectedValue, name, handleChange, label }: RadioButtonProps): JSX.Element {

    return (
        <>
            <div className="form-radio">
                <label>{label}</label>
                {options.map((option: Option) => (
                    <React.Fragment key={option.id}>
                        <input
                            type="radio"
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={handleChange}
                            name={name}
                            id={option.label}
                        />
                        <label htmlFor={option.label} key={option.value}> {option.label}
                        </label>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default FormRadio;