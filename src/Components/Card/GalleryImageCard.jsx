import React from "react";


const GalleryImageCard = ({image}) => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 px-3 rounded-3" >
      <div className="GalleryCard card  d-flex justify-content-center align-items-center">
        <img src={image.src} className="w-100 h-100 rounded-3" />
      </div>
    </div>
  );
};

export default GalleryImageCard;
