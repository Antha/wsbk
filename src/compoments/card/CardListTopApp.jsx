import React from 'react';
import TitleHeaderCard from '../header/HeaderTitleCard';
import CardLoadingListTopApp from './CardLoadingListTopApp';

const CardListTopApp = ({data}) => {
  data.sort( compare );
  return (
      <div style={{overflowY: "scroll", height: "177px"}}>
        { 
          data.length > 0 ?
            data.map((app, i)=>{
              return(
                <div key={i} className="cardlist">
                  <div className="row1">
                    <img height="19px" src={setImageByName(app.app_name)} alt="logo-movistar"/>
                  </div>
                  <div className="row2">{app.app_name}</div>
                  <div className="row3">: {formatNumber(app.TOTAL_USER)} User (<b>{parseFloat(app.TOTAL/1024).toFixed(1)} GB</b>)</div>
                </div>
              )
            })
          : <CardLoadingListTopApp/>
        }
      </div>
  );
}

function compare( a, b ) {
  if ( parseFloat(a.TOTAL) < parseFloat(b.TOTAL) ){
    return 1;
  }
  if ( parseFloat(a.TOTAL) > parseFloat(b.TOTAL) ){
    return -1;
  }
  return 0;
}

const formatNumber = (numb) => {
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const setImageByName = (name) => {
  const lowerName = name.toLowerCase();
  switch (lowerName) {
    case 'youtube':
      return '/images/icon-apps/youtube.png';

    case 'instagram':
      return '/images/icon-apps/instagram.png';

    case 'facebook':
      return '/images/icon-apps/facebook.png';

    case 'tiktok':
      return '/images/icon-apps/tiktok.png';

    case 'whatsapp':
      return '/images/icon-apps/whatsapp.png';

    case 'amazons3':
      return '/images/icon-apps/amazons3.png';

    case 'shopee':
      return '/images/icon-apps/shopee.png';

    case 'appstore':
      return '/images/icon-apps/appstore.png';

    case 'viu viu':
      return '/images/icon-apps/viu viu.png';
  
    case 'line':
      return '/images/icon-apps/line.png';

    case 'twitter':
      return '/images/icon-apps/twitter.png';
    
    default:
      return '/images/icon-apps/app-default.png';
    
  }
}

export default CardListTopApp;
