import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ placeholder, value, onChange, name }) => {
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ position: "relative"}}>
            <input
                type={visible ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className="form-control"
            />
            <span onClick={() => setVisible(!visible)} className="eyeIcon">
                {visible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </span>
        </div>
    );
};

export default PasswordInput;
