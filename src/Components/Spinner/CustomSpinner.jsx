import React from "react";

const Spinner = ({ size = 60, color = "#03ad53",}) => {
  return (
    <div className="spinner-wrapper">
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
    </div>
  );
};

export default Spinner;
