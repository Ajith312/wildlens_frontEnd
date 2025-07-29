import GalleryImageCard from 'Components/Card/GalleryImageCard'
import React from 'react'
import Image from 'Utils/Image'

const Gallery = () => {
  const images = [
    {src:Image.gallery1},
    {src:Image.gallery2},
    {src:Image.gallery3},
    {src:Image.gallery4},
    {src:Image.gallery5},
    {src:Image.gallery6},
    {src:Image.gallery7},
    {src:Image.gallery8}

  ]
  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div className="coverImageContainer d-flex justify-content-center align-items-center position-relative">
        <img src={Image.heroSection} alt="cover-image" className="coverImage w-100 h-100"/>
        <p className="coverText position-absolute text-white fw-bold">Gallery</p>
      </div>
      <div className='galleryContainer py-5 d-flex justify-content-center' >
        <div className="col-11 py-5 ">
          <div className='d-flex justify-content-center'>
           <h2 className='fw-bold mt-3 galleryText'>WildLens Tour Pictutes</h2>
          </div>
          <div className="galleryImagesContainer row mx-4 my-4">
            {
              images.map((image)=>{
                return(
                  <GalleryImageCard image={image} />
                )
              })
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Gallery