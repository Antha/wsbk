/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const CardProductivityPercentage = ({data, name}) => {
  if(data){
    var showArrow = parseInt(data);
  }else{
    var showArrow = 0;
  }
  return (
    <>
      <div className="card-productivity">
          <div className="card-productivity-name">{name}</div>
          <span className="presentage">{data ? data : '0%'}
          <div className="arrow-float-left">
            {
              showArrow < 1 ? 
              <span className="arrow color-danger">&#9660;</span>
                : 
              <span className="arrow color-success">&#9650;</span>
            }
          </div>
          </span>
      </div>
    </>
  );
}


export default CardProductivityPercentage;
