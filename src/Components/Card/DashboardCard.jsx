import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import ButtonComponent from 'Components/Button/Button';
import Icons from 'Utils/Icons';

const DashboardCard = ({
  item,
  timeFrame = "Last 7 days",
  isFooter = false,
  className
}) => {
  return (
    <Card className={`bg-white h-100 ${className}`}>
      <Card.Header className='d-flex justify-content-between align-items-center border-0 bg-transparent p-3'>
        <h5 className='mb-0 fw-normal'>{item?.title}</h5>
        <button className='btn btn-sm btn-icon' aria-label="More options">
          {Icons.moreIcon}
        </button>
      </Card.Header>
      
      <Card.Body className='p-3 pt-0'>
        <div className='d-flex align-items-baseline gap-2 mb-1'>
          <h4 className='mb-0'>{item?.value}</h4>
          {item?.changePercentage && (
            <span className='fs-6 text-success'>↑ {item?.changePercentage}</span>
          )}
        </div>
        <p className='text-muted mb-0'>{timeFrame}</p>
      </Card.Body>
      
      {isFooter && (
        <Card.Footer className='d-flex justify-content-end border-0 bg-transparent p-3 pt-0'>
          <ButtonComponent 
            variant='outline-primary' 
            size="sm"
            buttonName={item?.footerButtonText}
          />
       
        </Card.Footer>
      )}
    </Card>
  )
}

export default DashboardCard;