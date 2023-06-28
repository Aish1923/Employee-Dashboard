export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
    id: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export interface Option {
    value: string;
    label: string;
    id: string;
    name: string;
}

export interface RadioButtonProps {
    options: Option[];
    selectedValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    checked: boolean
}