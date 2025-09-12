import React from "react";


const ButtonLoading = ({ 
  componentFrom,
  title,
  buttonName,
  as,
  className,
  type = "button",
  clickFunction,
  loading = false,
  loadingText = "Loading..." 
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
      {loading ? (
        <span className="loading-wave">
          {loadingText.split("").map((letter, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.1}s` }}>
              {letter}
            </span>
          ))}
        </span>
      ) : (
        buttonName
      )}
    </button>
  );
};

export default ButtonLoading;
