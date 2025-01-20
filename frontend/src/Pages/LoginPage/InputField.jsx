import { useState } from "react";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        value={value} // Set the value from the parent
        onChange={onChange} // Trigger the parent's onChange handler
        required
      />
      <i className="material-symbols-rounded">{icon}</i>
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-symbols-rounded eye-icon"
        >
          {/* {isPasswordShown ? "visibility" : "visibility_off"} */}
        </i>
      )}
    </div>
  );
};

export default InputField;
