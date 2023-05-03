/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const HeaderTitleCard = ({title, iconSrc='', widthTitleWrapper="60%", widthIconWrapper="40%", linkDetail = ''}) => {
  return (
    <div className="d-flex">
      <div style={{width: widthIconWrapper}}>
        {iconSrc ?
          <div className="d-flex justify-content-center">
            <div style={{height: '28px', marginTop: '1px'}}>
              <img height="26px" src={iconSrc} alt="icon"/>
            </div>
          </div>
        : ''}
      </div>
      <div style={{width: widthTitleWrapper}}>
        <div className="header-top">
          <div className="header">
            {linkDetail !== '' ?
            <div style={{display: 'inline-block', marginRight: '6px'}}>
              <a href={linkDetail} target="_blank" rel="noreferrer" style={{padding: '0px 2px 2px 2px'}} className="hoverIconHeadre">
                <img height="15px" src="/wsbk-2023/images/icons/details.png" alt="click details"/>
              </a>
            </div>
            : ''}
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}


export default HeaderTitleCard;
