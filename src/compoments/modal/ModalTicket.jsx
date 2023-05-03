import React, {useEffect, useState} from "react";
import { Modal, Table } from 'antd';
import axios from "axios";
import ModalDetailTicket from "./ModalDetailTicket";

const ModalTicket = ({showModal, visible, error, loadingData, detailTicket}) => {
const [modalDetailTicket, setModalDetailTicket] = useState(false);
const [modalDetailTicketData, setModalDetailTicketData] = useState({});
const showDetailTicket = (ticket_number) => {
  if(Object.keys(modalDetailTicketData).length !== 0){
    setModalDetailTicket(false);
    setModalDetailTicketData({});
  }else{
    setModalDetailTicket(true);

    axios('http://10.54.36.55:9007/dashboard-g20/api/ineom/detail?ticket_number='+ticket_number.ticketId,{
      method: 'GET',
      headers: {
          'key': `bf931496409d570ca09cc0d30446b325`,
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.data.error){
        setModalDetailTicketData(res.data.data);
        setModalDetailTicket(true);
      }else{
        setModalDetailTicket(false);
        setModalDetailTicketData({});
      }
    })
    .catch(function(error){
      setModalDetailTicket(false);
    })
  }
}

const columns = [
  { title: 'Ticket ID', width: 80, dataIndex: 'ticketId', key: 'ticketId', fixed: 'left'},
  { title: 'Ticket Number', dataIndex: 'ticketNumber', key: 'ticketNumber', fixed: 'left' },
  { title: 'Created Time', dataIndex: 'createdTime', key: 'createdTime' },
  { title: 'User Creator Name', dataIndex: 'userCreatorName', key: 'userCreatorName' },
  { title: 'User Assignee Full Name', dataIndex: 'userAssigneeFullName', key: 'userAssigneeFullName' },
  { title: 'User Phone', dataIndex: 'userPhone', key: 'userPhone' },
  { title: 'Type Name', dataIndex: 'typeName', key: 'typeName' },
  { title: 'Title', dataIndex: 'title', key: 'title' },
  { title: 'Domain', dataIndex: 'domain', key: 'domain' },
  { title: 'Incident Type', dataIndex: 'incidentType', key: 'incidentType' },
  { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate' },
  { title: 'Occurrence Time', dataIndex: 'occuredTime', key: 'occuredTime' },
  { title: 'TicketAge', dataIndex: 'ticketAge', key: 'ticketAge' },
  { title: 'Nossa Number', dataIndex: 'nossaNumber', key: 'nossaNumber' },
  { title: 'Severity Code', dataIndex: 'severityCode', key: 'severityCode' },
  { title: 'SiteId', dataIndex: 'siteId', key: 'siteId' },
  { title: 'siteName', dataIndex: 'siteName', key: 'siteName' },
  { title: 'alarmCategory1Code', dataIndex: 'alarmCategory1Code', key: 'alarmCategory1Code' },
  { title: 'alarmCategory2Code', dataIndex: 'alarmCategory2Code', key: 'alarmCategory2Code' },
  { title: 'alarmCategory3Code', dataIndex: 'alarmCategory3Code', key: 'alarmCategory3Code' },
  { title: 'SiteName', dataIndex: 'siteName', key: 'siteName' },
  {
    title: 'Action',
    key: 'ticket_number',
    dataIndex: 'ticket_number',
    render: (text, ticket_number) => (
     <button onClick={()=>showDetailTicket(ticket_number)} style={{background: "red", borderRadius: "4px", border: "0px", paddingBottom:"3px", cursor: "pointer"}}>
       {"Detail"}
     </button>
    ),
  },
];
  return (
    <Modal title="" width="90%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>{`LIST TICKET`}</div>
      <div>
        {
          loadingData ? 
          <div style={{fontSize: '12px', color: '#bbb', fontStyle: 'italic', textAlign: 'center', marginTop: '4px'}}>
            Loading...
          </div>
          :''
        }
        {
          !loadingData && error ? 
          <div style={{fontSize: '12px', color: 'red', fontStyle: 'italic', textAlign: 'center', marginTop: '4px'}}>
            Error fetch data api, plase try again
          </div> 
          : ''
        }
        {
          !loadingData && !error ? 
          <div>
            <Table columns={columns} size={"small"} dataSource={detailTicket} scroll={{ x: 2000, y: 300 }} pagination={true}/>
            <div style={{fontSize: '10px', color: '#bbb', fontStyle: 'italic', marginTop: '4px'}}>* Scroll Right to show more detail</div>
          </div>
          : ''
        }
      </div>
      <ModalDetailTicket showModal={showDetailTicket} visible={modalDetailTicket} dataAppend={modalDetailTicketData}/>
    </Modal>
  );
}
export default ModalTicket;
