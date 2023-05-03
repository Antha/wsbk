import React from 'react';

const CardListTopUserOperatorCountry = ({data}) => {
  return (
    <>
      <div className="div-cardtopuser">#Top User County & Operator</div>
      <div style={{height: "180px", overflowY: "scroll"}}>

        {data.map((dt, i) => {
          const operatorSplit = dt.operator.split(' ');
          let country = dt.country;

          if (country.length > 9) {
            country = `${country.slice(0, 9)}...`;
          }

          const imgOperator = setImgOperator(dt.operator);

          return(
            <div className="cardtopuser">
              <div className="row1">
                <img height="20px"src={imgOperator} alt="logo-movistar"/>
              </div>
              <div className="row2">{operatorSplit[0]} - {country}</div>
              <div className="row3">: {dt.TOTAL_USER} Users</div>
            </div>
          )
        })}

        {data.length === 0 ? <div className="loading-text">Loading...</div> :''}

      </div>
    </>
  );
}

const setImgOperator = (name) =>{
  const nameLower = name.toLowerCase();
  switch (nameLower) {
    case 'singtel':
      return '/images/other-operator/logo-singtel.png';
    case 'telstra' :
      return '/images/other-operator/logo-telstra.png';
    case 'csl (telstra)' :
      return '/images/other-operator/logo-csl.png';
    case 'telekom (deutsche telekom)' :
      return '/images/other-operator/logo-telekom.png';
    case 'kddi corporation' :
      return '/images/other-operator/logo-kddi.png';
    case 'vodafone' :
      return '/images/other-operator/logo-vodafone.png';
    case 'maxis' :
      return '/images/other-operator/logo-maxis.png';
    case 'mts' :
      return '/images/other-operator/logo-mts.png';
    default:
      return '/images/other-operator/logo-default.png';
  }
}



export default CardListTopUserOperatorCountry;
