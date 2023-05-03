import React from 'react';

const CardLoadingListTopApp = () => {
  return (
    <>
      {
        [0,1,2,3,4].map((data)=>{
          return(
            <div key={data} className="card-loading-list">
              <div className="row1">
                <img height="20px"src="/images/icon-apps/app-default.png" alt="logo-movistar"/>
              </div>
              <div className="row2">Loading ...</div>
              <div className="row3">: ..... User - ..... GB</div>
            </div>
          )
        })
        
      }
    </>
  );
}

export default CardLoadingListTopApp;