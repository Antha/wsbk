import React from "react";

const MyMarker = (data) => {
  const handleClick = () => {
    console.log(`You clicked on ${data.title}`);
  };

  // FORMAT CONTENT THEME
  let image ="/images/icons/itdc-green.png"
  let colorText = '#00d000';
  let colorIcon = 'green';
  let iconType = 'itdc';

  if (data.alarm === 'clear') {
    colorIcon = 'green';
    colorText = '#00d000';
  }
  if (data.alarm === 'warning') {
    colorIcon = 'yellow';
    colorText = '#fcc009';
  }
  if (data.alarm === 'danger') {
    colorIcon = 'red';
    colorText = '#f2060a';
  }

  if (data.category === 'bandara') {
    iconType = 'airport';
  }
  if (data.category === 'itdc') {
    iconType = 'itdc';
  }
  if (data.category === 'hospitaly') {
    iconType = 'hospital';
  }
  if (data.category === 'wisata') {
    iconType = 'wisata';
  }


  image =`/images/icons/${iconType}-${colorIcon}.png`
  // END FORMAT THEME

  return (
    <div onClick={handleClick}>
      <div style={{height: '44px', width: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)', color: '#000'}}>
        <div>
          <img height="28px" src={image} alt={data.title} style={{margin: '2px 0px'}}/>
        </div>
        <span style={{backgroundColor: '#fff', color: `${colorText}`, fontSize: '8px', fontWeight: '600', padding: '2px'}}>
          {data.title}
        </span>
      </div>
    </div>
  );
};

export default MyMarker;
