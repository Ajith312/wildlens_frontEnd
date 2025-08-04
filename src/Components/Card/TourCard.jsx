import React from 'react';
import Card from 'react-bootstrap/Card';
import { MdOutlineAccessTime } from 'react-icons/md';
import { TfiLocationPin } from 'react-icons/tfi';
import { Button } from 'react-bootstrap';
import { IoMdStar } from 'react-icons/io';
import { RiMoneyRupeeCircleLine } from 'react-icons/ri';
import Image from 'Utils/Image';
import { useCustomNavigate } from 'Components/CustomHooks';
import ButtonComponent from 'Components/Button/Button';

const TourCard = ({ tour,admin=false }) => {
  const navigate = useCustomNavigate();

  const handleCardClick = () => {
    if(admin){
      navigate(`/admin/packages/${tour._id}`);
    }else {
      navigate(`/user/tour/${tour._id}`);
    }
  
  };

  return (
    <div className="tour-card" onClick={handleCardClick}>
      <Card className="card-box">
        <Card.Img variant="top" src={Image.cardImg} className="p-3" />
        <Card.Body>
          <Card.Text className="mb-3 text-dark fs-5 fw-bold">
            {tour?.title}
          </Card.Text>
          <div className="tour-card-content d-flex flex-column">
            <div className="d-flex align-items-center mb-3">
              <MdOutlineAccessTime size={25} className="text-primary" />
              <span className="ms-3 text-secondary fs-6 fw-bold">
                Duration: {tour?.days} Days
              </span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <TfiLocationPin size={25} className="text-primary" />
              <span className="ms-3 text-secondary fs-6 fw-bold">
                Location: {tour?.country}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <RiMoneyRupeeCircleLine size={25} className="text-primary" />
              <span className="ms-3 text-secondary fs-6 fw-bold">
                Price: {tour?.budget}
              </span>
            </div>
          </div>
        </Card.Body>

        {!admin ?<Card.Footer className="bg-white">
          <div className="tourcard-footer d-flex flex-column flex-sm-row justify-content-sm-between justify-content-center align-items-center p-2">
            <div className="d-flex flex-column mb-3 mb-sm-0">
              <div>
                <IoMdStar className="text-warning" size={25} />
                <IoMdStar className="text-warning" size={25} />
                <IoMdStar className="text-warning" size={25} />
                <IoMdStar className="text-warning" size={25} />
                <IoMdStar className="text-secondary" size={25} />
              </div>
              <span className="text-secondary fs-6 fw-bold">547 reviews</span>
            </div>
            
            <Button variant="success" className="py-2" onClick={handleCardClick}>
              <span className="fs-6 fw-bold">View More...</span>
            </Button>
          </div>
        </Card.Footer> :
           <Card.Footer className="bg-white">
           <div className="tourcard-footer d-flex flex-column flex-sm-row justify-content-sm-between justify-content-center align-items-center p-2 gap-2">
              <ButtonComponent className='btn-outline-primary w-100 w-md-50 ' buttonName='Edit' clickFunction={()=>console.log("tour?.id")} />
              <ButtonComponent className='btn-outline-danger w-100 w-md-50 ' buttonName='Delete' clickFunction={()=>console.log("tour?.id")} />
           </div>
         </Card.Footer>
        
        }
      </Card>
    </div>
  );
};

export default TourCard;
