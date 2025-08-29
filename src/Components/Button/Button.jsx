import React from "react";

const ButtonComponent = ({ 
  componentFrom,
  title,
  buttonName,
  as,
  className,
  type = "button",
  clickFunction,
  loading = false 
}) => {
  return (
    <button
      as={as}
      type={type}
      className={`btn ${className} d-flex align-items-center justify-content-center`}
      onClick={clickFunction}
      title={title}
      disabled={loading} 
    >
      {loading && (
        <span 
          className="spinner-border me-2" 
          role="status" 
          aria-hidden="true"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      )}
      {loading ? "Please wait..." : buttonName}
    </button>
  );
};

export default ButtonComponent;
