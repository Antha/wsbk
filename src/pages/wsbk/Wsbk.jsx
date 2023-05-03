/* eslint-disable array-callback-return */
import React, {useEffect, useState} from "react";
import axios from "axios";
import Helmet from "react-helmet";
import { Row, Col, Tabs } from 'antd';
import MapG20 from "../../compoments/map/MapG20";
import HeaderTitleCard from "../../compoments/header/HeaderTitleCard";
// import CardListTopApp from "../../compoments/card/CardListTopApp";
import ChartProductivity from "../../compoments/chart/ChartProductivity";
import ChartProductivityDaily from "../../compoments/chart/ChartProductivityDaily";
import ChartRoamers from "../../compoments/chart/ChartRoamers";
import CardProductivityPercentage from "../../compoments/card/CardProductivityPercentage";
// import CardTicket from "../../compoments/card/CardTicket";
// import CardListTopUserOperatorCountry from "../../compoments/card/CardListTopUserOperatorCountry";
// import CardUserSchedule from "../../compoments/card/CardUserSchedule";
import FlashScreen from "../../compoments/flashScreen/FlashScreen";
import CardAlarmPOICategory from "../../compoments/card/CardAlarmPOICategory";
import ModalAddTicket from "../../compoments/modal/ModalAddTicket";
import ModalTicket from "../../compoments/modal/ModalTicket";
import ModalCore from "../../compoments/modal/ModalCore";
import ModalTopApps from "../../compoments/modal/ModalTopApps";
import ModalRoamers from "../../compoments/modal/ModalRoamers";
import ModalProductivity from "../../compoments/modal/ModalProductivity";
import ModalDownloadReport from "../../compoments/modal/ModalDownloadReport";
import Sidebar from "../../compoments/sidebar/Sidebar";
import moment from "moment";

const Wsbk = () => {
  const { TabPane } = Tabs;
  const [flashScreen, setFlashScreen] = useState(true);
  const [dataPayloadChart, setDataPayloadChart] = useState([]);
  const [dataTrafficChart, setDataTrafficChart] = useState([]);
  const [dataPayloadChartDaily, setDataPayloadChartDaily] = useState([]);
  const [dataTrafficChartDaily, setDataTrafficChartDaily] = useState([]);
  const [dataPayloadPresentage, setDataPayloadPresentage] = useState('');
  const [dataTrafficPresentage, setDataTrafficPresentage] = useState('');
  const [dataPayloadPresentageDaily, setDataPayloadPresentageDaily] = useState('');
  const [dataTrafficPresentageDaily, setDataTrafficPresentageDaily] = useState('');
  const [dataTopApps, setDataTopApps] = useState([]);

  const [dataTopUserContry, setDataTopUserContry] = useState([]);
  const [dataRoamersChart, setDataRoamersChart] = useState([]);
  const [dataAllUserRoamers, setDataAllUserRoamers] = useState('');
  const [dataRoamersPercentage, setDataRoamersPercentage] = useState([]);

  const [dataAlarmPoi, setDataAlarmPoi] = useState([]);

  const [dataCore, setDataCore] = useState([]);
  const [dataUserSchedule, setDataUserSchedule] = useState([]);

  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [hourNow, setHourNow] = useState(null);

  const [dataTicket, setDataTicket] = useState([]);
  const [dataTableTicket, setDataTableTicket] = useState([]);
  const [errorGetTableTicket, setErrorGetTableTicket] = useState(false);
  const [loadingTableTicket, setLoadingTableTicket] = useState(false);
  const [DataDetailTicketTable, setDataDetailTicketTable] = useState([]);

  const [modalAddTicket, setModalAddTicket] = useState(false);

  const [modalTicket, setModalTicket] = useState(false);
  const [modalDataTicket, setModalDataTicket] = useState({});
  
  const [modalCore, setModalCore] = useState(false);
  const [errorGetTableCore, setErrorGetTableCore] = useState(false);
  const [loadingTableCore, setLoadingTableCore] = useState(false);
  const [DataDetailCoreTable, setDataDetailCoreTable] = useState([]);
  const [modalCoreVal, setModalCoreVal] = useState('all');

  const [modalTopApps, setModalTopApps] = useState(false);
  const [errorGetTableTopApps, setErrorGetTableTopApps] = useState(false);
  const [loadingTableTopApps, setLoadingTableTopApps] = useState(false);
  const [DataDetailTopAppsTable, setDataDetailTopAppsTable] = useState([]);

  const [modalRoamers, setModalRoamers] = useState(false);
  const [errorGetTableRoamers, setErrorGetTableRoamers] = useState(false);
  const [loadingTableRoamers, setLoadingTableRoamers] = useState(false);
  const [DataDetailRoamersTable, setDataDetailRoamersTable] = useState([]);

  const [modalProductivity, setModalProductivity] = useState(false);
  const [errorGetTableProductivity, setErrorGetTableProductivity] = useState(false);
  const [loadingTableProductivity, setLoadingTableProductivity] = useState(false);
  const [topTraffic, setTopTraffic] = useState([]);
  const [worstTraffic, setWorstTraffic] = useState([]);
  const [topPayload, setTopPayload] = useState([]);
  const [worstPayload, setWorstPayload] = useState([]);
  const [topTrafficSite, setTopTrafficSite] = useState([]);
  const [worstTrafficSite, setWorstTrafficSite] = useState([]);
  const [topPayloadSite, setTopPayloadSite] = useState([]);
  const [worstPayloadSite, setWorstPayloadSite] = useState([]);
  const [chartProductivityTraffic, setChartProductivityTraffic] = useState([]);
  const [chartProductivityPayload, setChartProductivityPayload] = useState([]);

  const [mapIcon, setMapIcon] = useState([]);
  const [mapArea, setMapArea] = useState([]);
  const [mapPoi, setMapPoi] = useState([]);
  const [mapSite, setMapSite] = useState([]);
  const [mapPeople, setMapPeople] = useState([]);

  const [tokenSmartcare, setTokenSmartcare] = useState("");
  const [tokenSmartcareTopApps, setTokenSmartcareTopApps] = useState("");

  const [growthRoamers, setGrowthRoamers] = useState(0);
  const [growthVLR, setGrowthVLR] = useState(0);

  const [modalDownloadReport, setModalDownloadReport] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const [reportData, setReportData] = useState('');
  var uriSegment = window.location.pathname.split("/").pop();

  const getdataProductivity = async () => {
    axios('https://10.65.103.51:8479/wsbk-2023/api/payloadtraffic',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        var payload = []
        var traffic = []
        for(var i = 0; i < res.data.resultData[0].length; i++){
          payload.push({"RESULTTIME" : moment(res.data.resultData[0][i].STARTTIME).zone('+0000').format('DD-MM-YYYY HH:mm'), "PAYLOAD" : res.data.resultData[0][i].PAYLOAD});
          traffic.push({"RESULTTIME" : moment(res.data.resultData[0][i].STARTTIME).zone('+0000').format('DD-MM-YYYY HH:mm'), "TRAFFIC" : res.data.resultData[0][i].TRAFFIC});
        }
        console.log(traffic)
        setDataPayloadChart(payload);
        setDataTrafficChart(traffic);

        var payloaddaily = []
        var trafficdaily = []
        var popdatapayloadtraffic = res.data.resultData[2].slice(0, -1)
        for(var i = 0; i < popdatapayloadtraffic.length; i++){
          payloaddaily.push({"RESULTTIME" : moment(popdatapayloadtraffic[i].RESULTTIME).format('DD-MM-YYYY'), "PAYLOAD" : popdatapayloadtraffic[i].PAYLOAD});
          trafficdaily.push({"RESULTTIME" : moment(popdatapayloadtraffic[i].RESULTTIME).format('DD-MM-YYYY'), "TRAFFIC" : popdatapayloadtraffic[i].TRAFFIC});
        }
        setDataPayloadChartDaily(payloaddaily);
        setDataTrafficChartDaily(trafficdaily);

        setDataPayloadPresentage(res.data.resultData[1][0].GROWTH_PAYLOAD.toFixed(2));
        setDataTrafficPresentage(res.data.resultData[1][0].GROWTH_TRAFFIC.toFixed(2));
        setDataPayloadPresentageDaily(res.data.resultData[3][0].GROWTH_PAYLOAD.toFixed(2));
        setDataTrafficPresentageDaily(res.data.resultData[3][0].GROWTH_TRAFFIC.toFixed(2));
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityTopTraffic = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/poi/GROWTH_TRAFFIC/DESC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setTopTraffic(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityWorstTraffic = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/poi/GROWTH_TRAFFIC/ASC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setWorstTraffic(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityTopPayload = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/poi/GROWTH_PAYLOAD/DESC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setTopPayload(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityWorstPayload = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/poi/GROWTH_PAYLOAD/ASC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setWorstPayload(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityTopTrafficSite = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/site/GROWTH_TRAFFIC/DESC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setTopTrafficSite(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityWorstTrafficSite = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/site/GROWTH_TRAFFIC/ASC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setWorstTrafficSite(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityTopPayloadSite = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/site/GROWTH_PAYLOAD/DESC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setTopPayloadSite(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityWorstPayloadSite = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/apI/payloadtraffic/site/GROWTH_PAYLOAD/ASC',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setWorstPayloadSite(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityChartTraffic = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/api/productivity/traffic',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setChartProductivityTraffic(res.data.resultData);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getProductivityChartPayload = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/api/productivity/payload',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setChartProductivityPayload(res.data.resultData);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  // map
  const getDataMap = async () => {
    axios('https://10.65.103.51:8479/wsbk-2023/api/poi/map/first',{
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
    axios('https://10.65.103.51:8479/wsbk-2023/api/poi',{
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

  const getDataMapPeople = async () => {
    axios('https://10.65.103.51:8443/royal-wedding/api/engineer',{
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

  const getDataTopApps = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/topapps',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataTopApps(res.data.resultData);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  // ROAMER 
  const getDataTopUserContry = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/roamer',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataTopUserContry(res.data.resultData);
        // let totaluser = 0;
        // for(var i = 0; i < res.data.resultData.length; i++){
        //   totaluser += res.data.resultData[i].TOTAL_USER
        // }
        // setDataAllUserRoamers(totaluser);
        // setDataRoamersPercentage(res.data.roamers_growth);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }

  const getDataTopRoamersChart = async () => {
    axios('https://10.65.103.51:8479/wsbk-2023/api/vlr/chart',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataRoamersChart(res.data.data);
        setGrowthRoamers(res.data.growth[0].DELTA)
        setGrowthVLR(res.data.growth[0].GROWTH)
        
        setDataAllUserRoamers(res.data.data.slice(-1).pop().VLR);
        // setDataAllUserRoamers(res.data.data.slice(-1).pop().TOTAL_USER + res.data.data.slice(-1).pop().VLR);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }
  // END ROAMER 

  // GET DATA ALARM POI
  const getDataAlarm = async () => {
    axios('https://10.65.103.51:8479/wsbk-2023/api/poi-alarm',{
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
  // END GET DATA ALARM POI

  // CORE 
  const getDataCore = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/core',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.data.error){
          setDataCore(res.data.data);
        }
      })
      .catch(function(error){
          console.log(error)
      })
  }

  const getDataDetailCore = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/core/detail',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.data.error){
          setDataDetailCoreTable(res.data.data);
        }
      })
      .catch(function(error){
          console.log(error)
      })
  }

  const getDataDetailTopApps = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/topapps/detail',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.data.error){
          setDataDetailTopAppsTable(res.data.resultData);
        }
      })
      .catch(function(error){
          console.log(error)
      })
  }

  const getDataDetailRoamers = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/paragames/roamer/detail',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if(!res.data.error){
          setDataDetailRoamersTable(res.data.resultData);
        }
      })
      .catch(function(error){
          console.log(error)
      })
  }

  const getDetailTicket = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/ineom/summary?poi=MOTOGP2022',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataTicket(res.data.data);
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }

  const getTokenSmartcare = async () => {
    axios('http://10.54.36.55:9007/dashboard-g20/api/ineom/smartcarelogin',{
      method: 'POST',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setTokenSmartcareTopApps(`http://10.77.116.247/trusted/${res.data.response}/views/motogp_mandalika_roamerapps/motogp_roamerapps?:embed=n&:showAppBanner=false&:display_count=no&:showVizHome=no&:refresh=yes`)
        setTokenSmartcare(`http://10.77.116.247/trusted/${res.data.response}/views/motogp_mandalika_2022/motogp_2022?:embed=n&:showAppBanner=false&:display_count=no&:showVizHome=no&:refresh=yes`);
      }
    })
    .catch(function(error){
      console.log(error);
    })
  }

  const getTableTicket = async () => {
    setErrorGetTableTicket(false);
    setDataDetailTicketTable([]);
    setLoadingTableTicket(true);

    axios('http://10.54.36.55:9007/dashboard-g20/api/ineom/list?query=IMT916&limit=100&page=1&start=0&poi=MOTOGP2022',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataDetailTicketTable(res.data.data);
        setLoadingTableTicket(false);
      }else{
        setLoadingTableTicket(false);
        setErrorGetTableTicket(true);
      }
    })
    .catch(function(error){
      setErrorGetTableTicket(true);
    })
  }   

  // user schedule
  const getDataUserSchedule = async () => {
    axios(`http://10.54.36.55:9007/dashboard-g20/api/ineom/userschedule?date1=${getdatetoday(0)} 00:00:00&date2=${getdatetoday(0)} 23:00:00`,{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setDataUserSchedule(res.data.data);
      }
    })
    .catch(function(error){
        console.log(error)
    })
  }


  const showModalDownloadReport = async() => {
    axios('https://10.65.103.51:8479/wsbk-2023/api/report/summary',{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
       
        setReportData(res.data.data);
        setModalDownloadReport(!modalDownloadReport);
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
    const hourNow = `${d.getUTCHours() + 8}:${minutes}`;
    setHour(hourNow);
  }

  const getHourNow = () =>{
    const d = new Date();
    let minutes = d.getMinutes().toString();
    let sec = d.getSeconds().toString();
    minutes = minutes.length === 1 ? `0${minutes}` : minutes;
    sec = sec.length === 1 ? `0${sec}` : sec;
    const hourNow = `${d.getUTCHours() + 8}:${minutes}:${sec} WITA`;
    setHourNow(hourNow);
  }

  const showModalAddTicket = () => {
    setModalAddTicket(!modalAddTicket);
  }

  const showModalTicket = () => {
    setModalTicket(!modalTicket);
  }

  const showModalCore = (val) => {
    setModalCoreVal(val)
    setModalCore(!modalCore);
  }

  const showModalTopApps = () => {
    setModalTopApps(!modalTopApps);
  }

  const showModalRoamers = () => {
    setModalRoamers(!modalRoamers);
  }

  const showModalProductivity = () => {
    setModalProductivity(!modalProductivity);
  }

  
  const showSidebar = () => {
    setSidebar(!sidebar);
  }

  useEffect(() => {
    
    showSidebar();
    getDataMap();
    getDataMapPoi();
    getDataMapPeople();
    getdataProductivity();
    getProductivityTopTraffic();
    getProductivityWorstTraffic();
    getProductivityTopPayload();
    getProductivityWorstPayload();
    getProductivityTopTrafficSite();
    getProductivityWorstTrafficSite();
    getProductivityTopPayloadSite();
    getProductivityWorstPayloadSite();
    getProductivityChartTraffic();
    getProductivityChartPayload();

    // getDataTopApps();

    // getDataTopUserContry();
    getDataTopRoamersChart();

    getDataAlarm();

    getDataCore();
    getDataDetailCore();
    getDetailTicket();
    getTableTicket();

    getTokenSmartcare();

    getDataUserSchedule();

    // getDataDetailTopApps();
    getDataDetailRoamers();

    getDate();
    getHour();
    getHourNow();
    
    setInterval(()=>{
      getDataMap();
      getDataMapPoi();
      getDataMapPeople();
      getDataAlarm();
    }, 180 * 1000);

    setInterval(()=>{
      getdataProductivity();
      getProductivityTopTraffic();
      getProductivityWorstTraffic();
      getProductivityTopPayload();
      getProductivityWorstPayload();
      getProductivityTopTrafficSite();
      getProductivityWorstTrafficSite();
      getProductivityTopPayloadSite();
      getProductivityWorstPayloadSite();
      getProductivityChartTraffic();
      getProductivityChartPayload();

      // getDataTopApps();

      // getDataTopUserContry();
      getDataTopRoamersChart();

      getTokenSmartcare();

      getDataUserSchedule();

      getDataCore();
      getDataDetailCore();
      getDetailTicket();
      getTableTicket();

      // getDataDetailTopApps();
      getDataDetailRoamers();

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
        <title>Dashboard WSBK 2023</title>
      </Helmet>

      <FlashScreen/>
      
      <div className="body" style={{backgroundColor: '#000000', color: '#333', position: 'absolute', top: 0, width: '100%'}}>
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#000000', color: '#fff', padding: '4px 12px', marginBottom: '4px'}}>
            <div style={{display: 'flex'}}>
            <a onClick={()=>showSidebar()} href="#" rel="noreferrer" style={{padding: '2px 0px 0px',position: "relative", fontSize: "40px", color: "#fff"}}>
                ☰
              </a>
              <div style={{marginRight: '18px'}}>
                <img height="68px" src="/wsbk-2023/images/WSBK.png" alt="WSBK"/>
              </div>
              <div>
                <div style={{color: '#fff',fontSize: '30px', fontWeight: '700', marginTop: '3px', letterSpacing: '1px'}}>EMPEROR</div>
                <span style={{ display: 'block', marginTop: '-4px', fontSize: '14px', marginBottom: '4px', color:"#fff"}}>Event Monitoring Platform Provided for Area 3 - WSBK 2023</span>
              </div>
            </div>
            <div>
              <div style={{display: 'flex', marginLeft: '110px', textAlign: 'right'}}>
                <img height="46px" src="/wsbk-2023/images/icon-telkomsel.png" alt="icon-telkomsel" style={{marginTop: '4px'}}/>
              </div>
              <span style={{margin: '0px', fontSize: '10px', textAlign: 'right'}}>Update: {date}; {hour} WITA | Time Now: {hourNow}</span>
            </div>
          </div>
        </div>
        <div style={{margin: '0px 4px 4px 4px', display: 'flex'}}>

          {/* LEFT */}
          <div style={{width: '62vw'}}>
            <div style={{height: '480px'}}>
              <MapG20 dataMapIcon={mapIcon} dataMapArea={mapArea} dataMapPoi={mapPoi} uri={uriSegment} dataMapPeople={mapPeople}/>
            </div>
            <div style={{display: 'flex', marginTop: '6px'}}>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'EXIT POINT'} title='EXIT POINT' iconSrc="/wsbk-2023/paragames/ic_diamond_airplane_dark.png" index={0}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'MAIN VENUE'} title='MAIN VENUE' iconSrc="/wsbk-2023/paragames/ic_diamond_mainvenue_dark.png" index={1}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'HOSPITALITY'} title='HOSPITALITY' iconSrc="/wsbk-2023/paragames/ic_diamond_hospital_dark.png" index={2}/>
              <CardAlarmPOICategory dataAlarm={dataAlarmPoi} dataPoi={'SUPPORTING VENUE'} title='RECREATION' iconSrc="/wsbk-2023/paragames/ic_diamond_recreation_dark.png" index={3}/>
            </div>
            <div>
              <div style={{backgroundColor: '#333e50', marginTop: '6px', color: '#eee'}}>
                <div style={{padding: '0px 12px', justifyContent: 'space-between'}}>
                  <div>
                    <Row gutter={12}>
                      <Col span={15}>
                        <div style={{fontSize: '17px', marginTop: '0px', position: 'absolute'}}>Legend:</div>
                        <div className="d-flex" style={{marginLeft: '60px'}}>
                          <div className="legend-alarm"><span className="bullet danger"></span> <span> CRITICAL</span></div>
                          <div className="legend-alarm"><span className="bullet warning"></span> <span> CAPACITY</span></div>
                          <div className="legend-alarm"><span className="bullet primary"></span> <span> QUALITY</span></div>
                          <div className="legend-alarm"><span className="bullet normal"></span> <span> NORMAL SITE</span></div>
                        </div>

                        <div>
                          <div style={{fontSize: '13px', marginTop: '0px'}}>Develop By:</div>
                          <div style={{fontSize: '12px', color: '#bbb', fontStyle: 'italic', margin: '0px 0px 0px', paddingBottom: "3px"}}>NPAC A3</div>
                        </div>
                      </Col>
                      <Col span={9} style={{display: 'flex', justifyContent: 'end', padding: '0px 8px', alignItems: "center"}}>
                        <div>
                          {/* <img height="25px" src="/images/icon-dessy.png" alt="icon-dessy" style={{marginTop: '1px', marginRight: '12px'}}/> */}
                          <img height="50px" src="/wsbk-2023/images/NPAC_A3.png" alt="icon-diamond" style={{marginTop: '1px', marginRight: '12px'}}/>
                          {/* <img height="45px" src="/images/logo-inhouse-white.png" alt="icon-inhouse" style={{marginTop: '1px',}}/> */}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{width: '38vw', marginLeft: '6px',}}>
            <div>
              
              <div style={{display: 'flex', marginBottom: "5px"}}>
                <div style={{width: '100%'}}>
                  <div style={{backgroundColor: '#333e50', display: 'block', position: 'relative'}}>
                    {/*<HeaderTitleCard title="PRODUCTIVITY" linkDetail="http://10.65.181.175/KTTG20/" />*/}
                    <HeaderTitleCard title="PRODUCTIVITY" />
                    {/* <a onClick={()=>showModalProductivity()} href="#" rel="noreferrer" style={{padding: '0px 2px 2px 2px',position: "relative", marginTop: "-25px", marginRight: "111px", float: "right"}} className="hoverIconHeadre">
                      <img height="15px" src="/wsbk-2023/images/icons/details.png" alt="click details"/>
                    </a> */}
                    <Tabs defaultActiveKey="1" className="ant-paragames" style={{marginTop: "15px"}}>
                      <TabPane tab="Hourly" key="11">
                        <div>
                          <div style={{color: '#f9fbfe', position: 'relative'}}>
                            <CardProductivityPercentage name="PAYLOAD" data={dataPayloadPresentage} />
                          </div>
                          <div style={{width: '100%', height: '205px'}}>
                            <ChartProductivity data={dataPayloadChart} dataKey="PAYLOAD" />
                          </div>
                          <div style={{padding: '1px 5px'}}>
                            <div style={{borderBottom: '1.3px solid #aaa'}}></div>
                          </div>
                          {/*<div style={{display: 'flex', justifyContent: 'space-between', margin: '6px 6px 0px 6px'}}>*/}
                            <div style={{color: '#f9fbfe', position: 'relative'}}>
                              <CardProductivityPercentage name="TRAFFIC" data={dataTrafficPresentage} />
                            </div>
                            <div style={{width: '100%', height: '205px'}}>
                              <ChartProductivity data={dataTrafficChart} dataKey="TRAFFIC" />
                            </div>
                          {/*</div>*/}
                          <div style={{textAlign: 'right', fontSize: '9px', color: '#bac3d0', margin: '4px 6px', paddingBottom: '6px', fontStyle: 'italic'}}>Baseline 03 - 09 February 2023</div>
                        </div>
                      </TabPane>
                      <TabPane tab="Daily" key="12">
                        <div>
                          <div style={{color: '#f9fbfe', position: 'relative'}}>
                            <CardProductivityPercentage name="PAYLOAD" data={dataPayloadPresentageDaily} />
                          </div>
                          <div style={{width: '100%', height: '205px'}}>
                            <ChartProductivityDaily data={dataPayloadChartDaily} dataKey="PAYLOAD" />
                          </div>
                          <div style={{padding: '1px 5px'}}>
                            <div style={{borderBottom: '1.3px solid #aaa'}}></div>
                          </div>
                          {/*<div style={{display: 'flex', justifyContent: 'space-between', margin: '6px 6px 0px 6px'}}>*/}
                            <div style={{color: '#f9fbfe', position: 'relative'}}>
                              <CardProductivityPercentage name="TRAFFIC" data={dataTrafficPresentageDaily} />
                            </div>
                            <div style={{width: '100%', height: '205px'}}>
                              <ChartProductivityDaily data={dataTrafficChartDaily} dataKey="TRAFFIC" />
                            </div>
                          {/*</div>*/}
                          <div style={{textAlign: 'right', fontSize: '9px', color: '#bac3d0', margin: '4px 6px', paddingBottom: '6px', fontStyle: 'italic'}}>Baseline 03 - 09 February 2023</div>
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>

              <div>
               
              </div>

              <div>
                <div style={{backgroundColor: '#333e50', marginTop: '4px', paddingBottom: '4px'}}>
                  <HeaderTitleCard title="VLR" />
                  <a onClick={()=>showModalRoamers()} href="#" rel="noreferrer" style={{padding: '0px 2px 2px 2px',position: "relative", marginTop: "-25px", marginRight: "40px", float: "right"}} className="hoverIconHeadre">
                    {/* <img height="15px" src="/images/icons/details.png" alt="click details"/> */}
                  </a>
                  <div style={{display: 'flex', justifyContent: 'space-between', margin: '6px'}}>
                    <div style={{width: '100%', display: "block", position: "relative"}}>
                      <div style={{color: '#f9fbfe'}}>
                        <span style={{fontSize: '11px', fontWeight: '700', marginTop: "-20px", position: "relative", display: 'flex', alignItems:"center"}}>#Incremental VLR <div style={{fontSize: "15px", margin:"0px 1px 0px 3px"}}>{(growthVLR).toFixed(2)}</div> % or <div style={{fontSize: "15px", margin:"0px 1px 0px 3px"}}>{growthRoamers}</div> Subs</span>
                        <span style={{fontSize: '11px', fontWeight: '700'}}>#All User</span>
                        <span style={{fontSize: '26px', fontWeight: '700', marginLeft: '7px'}}>{parseInt(dataAllUserRoamers) > 0 ? numberWithCommas(dataAllUserRoamers) : '0'}  </span>
                        <span style={{fontSize: '11px'}}> Subscriber</span>
                      </div>
                      
                      <div style={{marginLeft: '12px', marginBottom: '10px', color: '#f9fbfe'}}>
                      {/* {dataRoamersPercentage.length !== 0 ?
                        <div>
                          { parseFloat(dataRoamersPercentage) < 0 ?
                            <span style={{fontSize: '26px', color: '#fe504f', marginRight: '12px'}}>&#9660;</span>
                            :
                            <span style={{fontSize: '26px', color: '#06ca07', marginRight: '12px'}}>&#9650;</span>
                          }
                          
                          <span style={{fontSize: '26px', fontWeight: '700'}}>{dataRoamersPercentage}</span>
                        </div>
                        : 
                        <div>
                          <span style={{fontSize: '26px', color: '#06ca07', marginRight: '12px'}}></span>
                          <span style={{fontSize: '26px', fontWeight: '700'}}>loading...</span>
                        </div>
                      } */}
                      </div>

                      <div style={{width: '100%', height: '157px'}}>
                        <ChartRoamers data={dataRoamersChart}/>
                      </div>
                      <div style={{textAlign: 'right', fontSize: '9px', color: '#bac3d0', fontStyle: 'italic', marginTop: '-20px', position: "absolute", display:"block", right:"15px"}}>Baseline 03 - 09 February 2023</div>
                      {/* <div style={{textAlign: 'right', fontSize: '12px', color: '#bac3d0', fontStyle: 'italic', marginTop: '-20px', position: "absolute", display:"block", right:"15px"}}>Cluster Solo Raya</div> */}
                    </div>
                    {/* <div style={{width: '50%', color: '#f9fbfe'}}>
                      <CardListTopUserOperatorCountry data={dataTopUserContry} />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalAddTicket showModal={showModalAddTicket} visible={modalAddTicket}/>
      <ModalTicket showModal={showModalTicket} visible={modalTicket} error={errorGetTableTicket} loadingData={loadingTableTicket} detailTicket={DataDetailTicketTable}/>
      <ModalProductivity showModal={showModalProductivity} visible={modalProductivity} error={errorGetTableProductivity} loadingData={loadingTableProductivity} toptraffic={topTraffic} worsttraffic={worstTraffic} toppayload={topPayload} worstpayload={worstPayload} toptrafficsite={topTrafficSite} worsttrafficsite={worstTrafficSite} toppayloadsite={topPayloadSite} worstpayloadsite={worstPayloadSite} dataChartTraffic={chartProductivityTraffic} dataChartPayload={chartProductivityPayload}/>
      <ModalCore showModal={showModalCore} visible={modalCore} error={errorGetTableCore} loadingData={loadingTableCore} detailCore={DataDetailCoreTable} valCore={modalCoreVal}/>
      <ModalTopApps showModal={showModalTopApps} visible={modalTopApps} error={errorGetTableTopApps} loadingData={loadingTableTopApps} detailTopApps={DataDetailTopAppsTable}/>
      <ModalRoamers showModal={showModalRoamers} visible={modalRoamers} error={errorGetTableRoamers} loadingData={loadingTableRoamers} detailRoamers={DataDetailRoamersTable}/>
      <ModalDownloadReport showModal={showModalDownloadReport} visible={modalDownloadReport} data={reportData}/>
      <Sidebar showModal={showModalDownloadReport} visible={sidebar} showVisible={showSidebar} />
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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default Wsbk;