
import React, {useEffect, useState} from "react";
import HeaderTitleCard from "../header/HeaderTitleCard";
import ModalDetailAlarm from "../modal/ModalDetailAlarn";
import axios from 'axios';

const CardAlarmPOICategory = ({dataAlarm, dataPoi, title, iconSrc, index}) => {
  const [dataAlarmCritical, setDataAlarmCritical] = useState('');
  const [dataAlarmQuality, setDataAlarmQuality] = useState('');
  const [dataAlarmNormal, setDataAlarmNormal] = useState('');
  const [dataAlarmCapacity, setDataAlarmCapacity] = useState('');
  const [statusAlarm, setStatusAlarm] = useState('NORMAL');
  const [iconAlarm, setIconAlarm] = useState('');

  // state alarm poi
  const [modalAlarmVisible, setModalAlarmVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [dataDetailAlarm, setDataDetailAlarm] = useState([]);
  const [dataDetailAlarmLast, setDataDetailAlarmLast] = useState('');
  const [loadingDataDetailAlarm, setLoadingDataDetailAlarm] = useState(false);
  const [errorGetDataDetail, setErrorGetDataDetail] = useState(false);
// console.log(dataPoi)
  // Alarm POI
  const getDetailAlarm = async (poi, type) => {
    setErrorGetDataDetail(false);
    setDataDetailAlarm([]);
    setLoadingDataDetailAlarm(true);
    axios(`https://10.65.103.51:8479/wsbk-2023/api/poi-alarm/${poi}/${type}`,{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        const resData = res.data;
        setDataDetailAlarm(res.data.data);
        setDataDetailAlarmLast(res.data.last_update);
        setStatusAlarm(type);
        setLoadingDataDetailAlarm(false);
      })
      .catch(function(error){
        setLoadingDataDetailAlarm(false);
        setDataDetailAlarmLast('');
        setErrorGetDataDetail(true);
      })
  }

  const showModalAlarm = (poi, type) => {
    getDetailAlarm(poi, type);
    setModalAlarmVisible(!modalAlarmVisible);
    setModalData({poi, type})
  }

  const selectAlarmType = (arrayData, dataPoi) =>{
    if(arrayData && dataPoi){
      arrayData.map((alarm) => {
        // const alarmType = alarm.severity.toLowerCase()
        if (alarm.CATEGORY === dataPoi) {
          setDataAlarmCritical(alarm.DOWN);
          setDataAlarmQuality(alarm.QUALITY);
          setDataAlarmNormal(alarm.GREEN);
          setDataAlarmCapacity(alarm.CAPACITY);

          setIconAlarm(alarm.iconurl);
        }
      })
    }
  }

  useEffect(() => {
    selectAlarmType(dataAlarm, dataPoi);
  })

  return (
    <div className="full-width color-white" style={{marginRight: `${index < 4 ? '6px' : '0px'}`}}>
      <div className="dark-bg">
        <HeaderTitleCard title={title} iconSrc={iconSrc} widthTitleWrapper="80%" widthIconWrapper="20%"/>
        <div className="div-alarm">
          <div className="d-flex justify-content-space-between row-alarm">
            <div className="w-50 d-flex justify-content-center card-alarm">
              <div className="color-danger hover" onClick={()=>showModalAlarm(dataPoi, 'CRITICAL')}>
                {dataAlarmCritical.length === 1 ? `0${dataAlarmCritical}` : dataAlarmCritical}
              </div>
            </div>
            <div className="w-50 d-flex justify-content-center card-alarm card-alarm">
              <div className="color-warning hover" onClick={()=>showModalAlarm(dataPoi, 'CAPACITY')}>
                {dataAlarmCapacity.length === 1 ? `0${dataAlarmCapacity}` : dataAlarmCapacity}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-space-between row-alarm">
            <div className="w-50 d-flex justify-content-center card-alarm">
              <div className="color-primary hover" onClick={()=>showModalAlarm(dataPoi, 'QUALITY')}>
                {dataAlarmQuality.length === 1 ? `0${dataAlarmQuality}` : dataAlarmQuality}
              </div>
            </div>
            <div className="w-50 d-flex justify-content-center card-alarm">
              <div className="color-success hover" onClick={()=>showModalAlarm(dataPoi, 'NORMAL')}>
                {dataAlarmNormal.length === 1 ? `0${dataAlarmNormal}` : dataAlarmNormal}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalDetailAlarm showModal={showModalAlarm} visible={modalAlarmVisible} detailALarm={dataDetailAlarm} data={modalData} error={errorGetDataDetail} loadingData={loadingDataDetailAlarm} lastUpdate={dataDetailAlarmLast} status={statusAlarm}/>
    </div>
  );
}


export default CardAlarmPOICategory;
