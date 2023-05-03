import {React, useState} from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from "axios";

const ModalAddTicket = ({visible, showModal, data}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input7, setInput7] = useState('');
  const [input8, setInput8] = useState('');
  const [input9, setInput9] = useState('');
  const [input10, setInput10] = useState('');
  const [input11, setInput11] = useState('');
  const [input12, setInput12] = useState('');
  const [input13, setInput13] = useState('');

  const submitTicket = () => {
    const data = {
      summary: input1,
      impact: input2,
      severity: input3,
      domain: input4,
      serviceImpact: input5,
      incidentType: "RETAIL",
      siteId: input7,
      networkCat1: input8,
      networkCat2: input9,
      networkCat3: input10,
      alarmCat1: input11,
      alarmCat2: input12,
      alarmCat3: input13,
    }

    axios('http://10.54.36.55:9007/dashboard-g20/api/ineom/create',{
      data: data,
      method: 'POST',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
       if(!res.data.error){
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
        setInput5('');
        setInput6('');
        setInput7('');
        setInput8('');
        setInput9('');
        setInput10('');
        setInput11('');
        setInput12('');
        setInput13('');
        alert(res.data.response);
        showModal(false);
       }else{
        alert(res.data.response)
       }
    })
    .catch(function(error){
      alert(error)
    })
  }

  const setNetworkCat1 = (e) => {
    setInput8(e.target.value)
    let dataAutoNetwok = {};
    if(e.target.value === 'RAN') {
      dataAutoNetwok = {
        netCat2: 'BTS',
        netCat3: 'FULLY'
      }
    }
    if(e.target.value === 'SOC') {
      dataAutoNetwok = {
        netCat2: 'KPIMONITORING',
        netCat3: 'OTHERS'
      }
    }
    if(e.target.value === 'RESOURCE') {
      dataAutoNetwok = {
        netCat2: 'EVENT',
        netCat3: 'EVENT'
      }
    }

    if(Object.keys(dataAutoNetwok).length > 0){
      setInput9(dataAutoNetwok.netCat2)
      setInput10(dataAutoNetwok.netCat3)
    }
  }

  const setAlarmCat1 = (e) => {
    setInput11(e.target.value)
    let dataAlarmCat = {};
    if(e.target.value === 'CAPACITY/OVERLOAD/EXCEED/FULL/REACHED') {
      dataAlarmCat = {
        alarmCat2: 'OTHER',
        alarmCat3: '-'
      }
    }
    if(e.target.value === 'SERVICE IMPACT AVAILABILITY') {
      dataAlarmCat = {
        alarmCat2: '2G 3G 4G 5G NODE DOWN',
        alarmCat3: '-'
      }
    }
    if(e.target.value === 'IMPACT SERVICE DEGRADATION') {
      dataAlarmCat = {
        alarmCat2: 'PERFORMANCE ALARMS',
        alarmCat3: '-'
      }
    }

    if(Object.keys(dataAlarmCat).length > 0){
      setInput12(dataAlarmCat.alarmCat2)
      setInput13(dataAlarmCat.alarmCat3)
    }
  }

  return (
    <Modal title="" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>Add Ticket</div>
       <form id="addticket">
          <input name="summary" placeholder="Summary" required="required" value={input1} onInput={e => setInput1(e.target.value)}/>
          <select name="impact" required="required" value={input2} onChange={e => setInput2(e.target.value)}>
            <option value="" hidden>Impact</option>
            <option value="1-EXTENSIVE">EXTENSIVE (HIGH)</option>
            {/*<option value="2-SIGNIFICANT">2-SIGNIFICANT</option>*/}
            {/*<option value="3-MODERATE">3-MODERATE</option>*/}
            <option value="4-MINOR">MINOR (LOW)</option>
          </select>
          <select name="severity" required="required" value={input3} onChange={e => setInput3(e.target.value)}>
            <option value="" hidden>Severity</option>
            <option value="LOW">LOW</option>
            <option value="MINOR">MINOR</option>
            <option value="MAJOR">MAJOR</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>
          <select name="domain" required="required" value={input4} onChange={e => setInput4(e.target.value)}>
            <option value="" hidden>Domain</option>
            <option value="RAN">RAN</option>
            <option value="CORE">CORE</option>
            <option value="TRANSPORT">TRANSPORT</option>
            <option value="DATACOM">DATACOM</option>
          </select>
          <input name="serviceImpact" placeholder="Service Impact" value={input5} required="required"  onInput={e => setInput5(e.target.value)}/>
          {/*<select name="incidentType" required="required" value={input6} onChange={e => setInput6(e.target.value)}>
            <option value="" hidden>Incident Type</option>
            <option value="MASSIVE">MASSIVE</option>
            <option value="RETAIL">RETAIL</option>
          </select>*/}
          <input name="siteId" placeholder="siteId" required="required" value={input7} onInput={e => setInput7(e.target.value)}/>

          <select name="networkCat1" required="required" value={input8} onChange={e => setNetworkCat1(e)}>
            <option value="" hidden>networkCat1</option>
            <option value="RAN">RAN</option>
            <option value="SOC">SOC</option>
            <option value="RESOURCE">RESOURCE</option>
          </select>
          {/* <input name="networkCat1" placeholder="networkCat1" required="required" value={input8} onInput={e => setInput8(e.target.value)}/> */}
          <input name="networkCat2" placeholder="networkCat2 (auto fill on selected networkCat1)" required="required" value={input9} disabled/>
          <input name="networkCat3" placeholder="networkCat3 (auto fill on selected networkCat1)" required="required" value={input10} disabled/>

          <select name="networkCat1" required="required" value={input11} onChange={e => setAlarmCat1(e)}>
            <option value="" hidden>alarmCat1</option>
            <option value="CAPACITY/OVERLOAD/EXCEED/FULL/REACHED">CAPACITY/OVERLOAD/EXCEED/FULL/REACHED</option>
            <option value="SERVICE IMPACT AVAILABILITY">SERVICE IMPACT AVAILABILITY</option>
            <option value="IMPACT SERVICE DEGRADATION">IMPACT SERVICE DEGRADATION</option>
          </select>
          {/* <input name="alarmCat1" placeholder="alarmCat1" required="required" value={input11} onInput={e => setInput11(e.target.value)}/> */}
          <input name="alarmCat2" placeholder="alarmCat2 (auto fill on selected alarmCat1)" required="required" value={input12} disabled/>
          <input name="alarmCat3" placeholder="alarmCat3 (auto fill on selected alarmCat1)" required="required" value={input13} disabled/>
          <button type="button" onClick={()=>submitTicket()}>Submit</button>
       </form>
    </Modal>
  );
}
export default ModalAddTicket;