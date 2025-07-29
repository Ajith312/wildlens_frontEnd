import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
import JsonData from 'Utils/JsonData'

const Home = () => {
  const { jsonOnly } = JsonData()
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }
  
  const carouselStyle = {
    height: '500px',
    width: '100%',
    overflow: 'hidden'
  }
  
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }

  return (
    <div className="container-fluid p-0">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
        {jsonOnly?.carosal_details?.map((item, ind) => (
          <Carousel.Item key={ind} className="carousel-container">
            <img
              className="carousel-image"
              src={item?.src}
              alt={`Slide ${ind + 1}`}
            />
            <Carousel.Caption className="carousel-caption">
              <h1 className="carousel-title">{item?.title}</h1>
              <p className="carousel-text">{item?.details}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Home