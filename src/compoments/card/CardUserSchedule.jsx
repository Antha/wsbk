import React, {useEffect, useState} from 'react';
import TitleHeaderCard from '../header/HeaderTitleCard';

const CardUserSchedule = ({data}) => {
  var timestandby = `${getHour()} - ${getdatetoday(0)}`;
  var datafromshift = fetchuser(data, timestandby);
  return (
    <div className="dark-bg div-cardlist" style={{marginTop: "4px"}}>
      <TitleHeaderCard title="Engineer Standby" />
      {datafromshift.length > 0 ? <div style={{textAlign: 'left', color: '#fff', marginLeft: "10px", fontWeight: "700"}}>{timestandby}</div> : ""}     
      <div style={{overflowY: "scroll", height: "62px"}}>
        { 
          datafromshift.length > 0 ? 
            datafromshift.map((app, i)=>{
              return(
                <div key={i} className="cardlist">
                  <div className="row1" style={{width:"100%"}}>
                    {app.name}
                  </div>
                </div>
              )
            })
          : <div style={{textAlign: 'center', color: '#fff'}}>No Engineer Clock In</div>
        }
      </div>
    </div>
  );
}

function getdatetoday(mind){
    var today = new Date();
    var mindate = addDaystoDate(today, mind);
    var dd = String(mindate.getDate()).padStart(2, '0');
    var mm = String(mindate.getMonth() + 1); //January is 0!
    var yyyy = mindate.getFullYear();
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "Desember"];
    mindate = dd + ' ' + monthNames[mm-1] + ' ' + yyyy;
    return mindate;
}

function getHour(){
    const d = new Date();
    let minutes = d.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    const hourNow = `${d.getUTCHours() + 8}${minutes}`;

    if(parseFloat(hourNow) >= 700 && parseFloat(hourNow) <= 1400){
      return "Shift 1";      
    }else if(parseFloat(hourNow) >= 1401 && parseFloat(hourNow) <= 2200){
      return "Shift 2";
    }else{
      return "";
    }
}

function fetchuser(load, shift){
  var payload = [];
  var i = 0;
  load.map((datapayload) => {
    if(shift == datapayload.scheduleLabel){
      i += 1;
      payload.push({"name": i + ". " + datapayload.userFullName});
    }
  })
  return payload;
}

function addDaystoDate(date, days) {
  let result = new Date();
  result.setDate(date.getDate() - days);
  return result;
}

export default CardUserSchedule;
