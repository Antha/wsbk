/* eslint-disable array-callback-return */
import React, {useEffect, useState} from "react";
import axios from "axios";
import Helmet from "react-helmet";
import { Row, Col } from 'antd';
import MapG20 from "../../compoments/map/MapG20";
import FlashScreen from "../../compoments/flashScreen/FlashScreen";
import CardAlarmPOICategory from "../../compoments/card/CardAlarmPOICategory";
import ModalAddTicket from "../../compoments/modal/ModalAddTicket";
import ModalTicket from "../../compoments/modal/ModalTicket";
import ModalCore from "../../compoments/modal/ModalCore";
import ModalTopApps from "../../compoments/modal/ModalTopApps";
import ModalRoamers from "../../compoments/modal/ModalRoamers";
import ModalProductivity from "../../compoments/modal/ModalProductivity";
import moment from "moment";

const Bot = () => {
  const [loadingTableTicket, setLoadingTableTicket] = useState(false);
  const [DataDetailTicketTable, setDataDetailTicketTable] = useState([]);
  const [mapArea, setMapArea] = useState([]);
  const [mapPoi, setMapPoi] = useState([]);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [hourNow, setHourNow] = useState(null);
  const [mapIcon, setMapIcon] = useState([]);
  const [dataAlarmPoi, setDataAlarmPoi] = useState([]);
  const [mapPeople, setMapPeople] = useState([]);

  var uriSegment = window.location.pathname.split("/").pop();

  // map
  const getDataMap = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/poi/map/first',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setMapArea(res.data.resultData);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }
  
  const getDataMapPoi = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/poi',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setMapPoi(res.data.resultData);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getDataAlarm = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/poi-alarm',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataAlarmPoi(res.data.resultData);
      }
    })
  }

  const getDataMapPeople = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/engineer',{
      method: 'GET',
      headers: {
          'key': `Tg4otwiL1LP2yVLggvBvZcVqFhfGWi6n1sbMQW2aNq4Nd0NaY5FRHXxOo9iL0hgN0IIDAd9MwYYjb5CY1JPXHgfVJ8RtkBSgMTiySstMblz6TGyxJVClixPDX6AVuGcz`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setMapPeople(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getDate = () => {
    const d = new Date();
    // console.log(`${d.getFullYear()} ${d.getMonth()} ${d.getDate()}`);
    let month = (d.getMonth() + 1).toString();
    month = month.length === 1 ? `0${month}` : month;

    let date = d.getDate().toString();
    date = date.length === 1 ? `0${date}` : date;
  
    const dateNow = `${d.getFullYear()}-${month}-${date}`
    setDate(dateNow);
  }

  const getHour = () =>{
    const d = new Date();
    let minutes = d.getMinutes().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    const hourNow = `${d.getUTCHours() + 7}:${minutes}`;
    setHour(hourNow);
  }

  const getHourNow = () =>{
    const d = new Date();
    let minutes = d.getMinutes().toString();
    let sec = d.getSeconds().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    sec = sec.length === 1 ? `0${sec}` : sec;
    const hourNow = `${d.getUTCHours() + 7}:${minutes}:${sec} WIB`;
    setHourNow(hourNow);
  }

  useEffect(() => {
    getDataMap();
    getDataMapPoi();
  
    getDate();
    getHour();
    getHourNow();
    getDataAlarm()
    getDataMapPeople();
    setInterval(()=>{
      getDataMap();
      getDataMapPoi();
      getDataAlarm();
      getDataMapPeople();
    }, 180 * 1000);

    setInterval(()=>{
      getHour();
    }, 900 * 1000);

    // setTimeout(()=>{
    //   setFlashScreen(false);
    // }, 1.3 * 1000);

    setInterval(()=>{
      getHourNow();
    }, 1000);
  }, []);
  return (
    <div>
      <Helmet>
        <title>Dashboard Para Games Solo 2022</title>
      </Helmet>

      <FlashScreen/>
      
      <div className="body" style={{backgroundColor: '#000000', color: '#333', position: 'absolute', top: 0, width: '100%'}}>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#000000', color: '#fff', padding: '4px 12px', marginBottom: '4px'}}>
            <div style={{display: 'flex'}}>
              <div style={{marginRight: '18px'}}>
                <img height="68px" src="/images/top.png" alt="Para Games Solo 2022"/>
              </div>
              <div>
                <div style={{color: 'rgb(170 135 12)',fontSize: '30px', fontWeight: '700', marginTop: '3px', letterSpacing: '1px'}}>EMPEROR</div>
                <span style={{ display: 'block', marginTop: '-4px', fontSize: '14px', marginBottom: '4px', color:"rgb(170 135 12)"}}>Event Monitoring Platform Provided for Area 3 - Para Games Solo 2022</span>
              </div>
            </div>
            <div>
              <div style={{display: 'flex', marginLeft: '110px', textAlign: 'right'}}>
                <img height="46px" src="/images/icon-telkomsel.png" alt="icon-telkomsel" style={{marginTop: '4px'}}/>
              </div>
              <span style={{margin: '0px', fontSize: '10px', textAlign: 'right'}}>Update: {date}; {hour} WIB | Time Now: {hourNow}</span>
            </div>
          </div>
        </div>
        <div style={{margin: '0px 4px 4px 4px', display: 'flex'}}>

          {/* LEFT */}
          <div style={{width: '100vw'}}>
            <div style={{height: '480px'}}>
              <MapG20 dataMapIcon={mapIcon} dataMapArea={mapArea} dataMapPoi={mapPoi} uri={uriSegment} dataMapPeople={mapPeople}/>
            </div>
            <div style={{display: 'flex', marginTop: '6px'}}>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'EXIT POINT'} title='EXIT POINT' iconSrc="/paragames/ic_diamond_airplane_dark.png" index={0}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'MAIN VENUE'} title='MAIN VENUE' iconSrc="/paragames/ic_diamond_mainvenue_dark.png" index={1}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'HOSPITALITY'} title='HOSPITALITY' iconSrc="/paragames/ic_diamond_hospital_dark.png" index={2}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'SUPPORTING VENUE'} title='SUPPORTING VENUE' iconSrc="/paragames/ic_diamond_recreation_dark.png" index={3}/>
            </div>
            <div>
              <div style={{backgroundColor: '#333e50', marginTop: '6px', color: '#eee'}}>
                <div style={{padding: '0px 12px', justifyContent: 'space-between'}}>
                  <div>
                    <Row gutter={12}>
                      <Col span={13}>
                        <div style={{fontSize: '17px', marginTop: '0px', position: 'absolute'}}>Legend:</div>
                        <div className="d-flex" style={{marginLeft: '60px'}}>
                          <div className="legend-alarm"><span className="bullet danger"></span> <span> CRITICAL</span></div>
                          <div className="legend-alarm"><span className="bullet warning"></span> <span> CAPACITY</span></div>
                          <div className="legend-alarm"><span className="bullet primary"></span> <span> QUALITY</span></div>
                          <div className="legend-alarm"><span className="bullet normal"></span> <span> NORMAL SITE</span></div>
                        </div>

                        <div>
                          <div style={{fontSize: '13px', marginTop: '0px'}}>Develop By:</div>
                          <div style={{fontSize: '12px', color: '#bbb', fontStyle: 'italic', margin: '0px 0px 0px', paddingBottom: "3px"}}>Network Digitization Development & NPAC A3</div>
                        </div>
                      </Col>
                      <Col span={11} style={{display: 'flex', justifyContent: 'end', padding: '0px 8px', alignItems: "center"}}>
                        <div>
                          <img height="25px" src="/images/icon-dessy.png" alt="icon-dessy" style={{marginTop: '1px', marginRight: '12px'}}/>
                          <img height="30px" src="/images/Light Logo NPA A3.png" alt="icon-diamond" style={{marginTop: '1px', marginRight: '12px'}}/>
                          <img height="45px" src="/images/logo-inhouse-white.png" alt="icon-inhouse" style={{marginTop: '1px',}}/>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getdatetoday(mind){
    var today = new Date();
    var mindate = addDaystoDate(today, mind);
    var dd = String(mindate.getDate()).padStart(2, '0');
    var mm = String(mindate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = mindate.getFullYear();

    mindate = yyyy + '-' + mm + '-' + dd;
    return mindate;
}

function addDaystoDate(date, days) {
  let result = new Date();
  result.setDate(date.getDate() - days);
  return result;
}

export default Bot;