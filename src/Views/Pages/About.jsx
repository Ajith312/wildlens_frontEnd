import React from 'react'
import Image from 'Utils/Image'
import { FaFirstAid } from "react-icons/fa"
import { Col, Container, Row } from 'react-bootstrap'
import ButtonComponent from 'Components/Button/Button'
import TravelGuideCard from 'Components/Card/TravelGuideCard'

const About = () => {

  const facilities = [
    "Safety First Always",
    "Trusted Travel Guide",
    "Expertise And Experience",
    "Time And Stress Savings",
  ]
  const companyStats = [
    "10K+ Happy traveller",
    "10K+ Happy traveller",
    "90%+ positive reviews",
    "10+ Travel Guide",
  ]

  const guideData = [
    { src: Image?.guide1, guidename: "Mateo Daniel", desigination: "Travel Guide" },
    { src: Image?.guide2, guidename: "Elias Joseph", desigination: "Travel Guide" },
    { src: Image?.guide3, guidename: "Milex Jackson", desigination: "Travel Guide" },
    { src: Image?.guide1, guidename: "Silax Nicholas", desigination: "Travel Guide" },
  ]


  return (
    <div className="container-fluid d-flex flex-column p-0">
      <div className="coverImageContainer d-flex justify-content-center align-items-center position-relative">
        <img src={Image.heroSection} alt="cover-image" className="coverImage w-100 h-100"/>
        <p className="coverText position-absolute text-white fw-bold">About</p>
      </div>
      <div className="aboutContainer d-flex justify-content-center">
        <div className="aboutBoxContent col-10 d-flex flex-column my-5 ">
          <div className="aboutBox d-flex flex-column flex-xl-row justify-content-center">
            <div className="aboutBoxText col-12 col-xl-6 p-5">
              <h1 className="text-success mb-3">About Us</h1>
              <h2 className="fw-bold mb-3">We provide the best tour facilities</h2>
              <p className="text-wrap text-secondary mb-4">
                We are the largest holiday service provider in the world with
                partners and places spread all over the world by prioriti-zing
                service and customer satisfaction.
              </p>

              <Container>
                <Row className=''>
                  {facilities.map((title, index) => (
                    <Col key={index} lg={6} className="mb-3 g-3">
                      <div className={`p-2 d-flex align-items-center rounded-2 ${index % 2 === 0 ? 'bg-danger-subtle' : 'bg-success-subtle'
                        }`}>
                        <span className="p-2"><FaFirstAid size={30} /></span>
                        <h4 className="mb-0 ms-4 p-2">{title}</h4>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Container>
              <ButtonComponent className="btn brand-color mt-4 p-3" buttonName="Find out more" />
            </div>
            <div className="aboutBoxImage col-12 col-xl-6">
              <img src={Image?.womenImg} alt="women-image" className="" />
            </div>
          </div>
          <hr />
          <Container fluid className="my-3">
            <Row className="border border-secondary rounded-2 overflow-hidden">
              {companyStats.map((text, index) => (
                <Col
                  key={index}
                  md={3}
                  className={`p-5 d-flex align-items-center justify-content-center border-bottom border-secondary ${index !== companyStats.length - 1 ? 'border-end border-secondary' : ''
                    }`}
                >
                  <h2 className="text-center m-0">{text}</h2>
                </Col>
              ))}
            </Row>
          </Container>
          <hr />
        </div>
      </div>
      <div className="row travelGuideContainer d-flex justify-content-center">
        <div className="col-10 d-flex flex-column h-100 my-5">
          <div className="w-100">
            <p className="mb-0 text-center text-success fs-4">--- Tours Guide ---</p>
            <h2 className="mb-0 text-center">Our Travel Guide</h2>
          </div>
          <div className="travelGuideCardContainer w-100 row my-3">
            {guideData.map((guide, index) => (
              <div key={index} className="travelGuideCard col-12 col-md-6 col-xl-3 rounded-3 px-2 mb-4">
                <TravelGuideCard
                  className="h-100 w-100"
                  src={guide.src}
                  guidename={guide.guidename}
                  desigination={guide.desigination}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default About