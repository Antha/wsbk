import React, {useEffect} from 'react';

  
  const FlashScreen = () => {
    useEffect(() => {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
    }, [])

    return (
      <div className='spalshScreen'>
        <div className='spalshScreenBg'>
          <div style={{paddingTop: '36px'}}>
            <div className="title">MotoGP Mandalika 2022</div>
            <div className="text-center" style={{ marginTop: '26px'}}>
              <img src="/images/logo-inhouse-white.png" alt="inhouse" height="210px"/>
            </div>
            <div className="subtitle">
              {/* <div>Network Data Design & Digitization</div> */}
              <div>Network Digitization Development</div>
              <div>2022</div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  
export default FlashScreen;
  