import React from 'react';

interface CustomCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void; // Note the parameter type here
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, checked, onChange }) => {
    return (
        <label className="">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="form-checkbox h-5 w-5"
            />
           
        </label>
    );
};

export default CustomCheckbox;
