import React, {useState} from "react";
import HeaderTitleCard from "../header/HeaderTitleCard";
import { Button, Modal, Row, Col } from 'antd';

const CardTicket = (dataValue) => {
  const selectTicketType = (dataValue, key) =>{
    let ticketCount = 0;
    if(dataValue.dataValue.length > 0){
      dataValue.dataValue.map((ticket) => {
        const ticketType = ticket.code;
        if (ticketType == key) {
          ticketCount = ticket.total;
        }
        return ticketCount;
      })
    }
    return ticketCount;
  }
  const ticketOpen = selectTicketType(dataValue, 'OPEN');
  const ticketOnprogress = selectTicketType(dataValue, 'ONPROGRESS');
  const ticketClosed = selectTicketType(dataValue, 'CLOSED');
  const ticketResolved = selectTicketType(dataValue, 'RESOLVED');
  const ticketTotalTicket = selectTicketType(dataValue, 'TOTALTICKET');
  
  return (
    <div className="dark-bg">
      <div className="div-ticket">
      <Row gutter={24}>
        <Col span={6}>
          <div className="padding-ticket text-center">
            <div className="title color-danger">
              OPEN
            </div>
            <div className="value color-danger">
              {ticketOpen.toString().length === 1 ? `0${ticketOpen}` : ticketOpen}
            </div>
          </div>
        </Col>
        <Col span={11}>
          <div className="padding-ticket text-center">
            <div className="title color-warning">
              ON PROGRESS
            </div>
            <div className="value color-warning">
              {ticketOnprogress.toString().length === 1 ? `0${ticketOnprogress}` : ticketOnprogress}
            </div>
          </div>
        </Col>
        <Col span={7}>
          <div className="padding-ticket text-center">
            <div className="title color-success">
              CLOSED
            </div>
            <div className="value color-success">
              {ticketClosed.toString().length === 1 ? `0${ticketClosed}` : ticketClosed}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <div className="padding-ticket text-center">
            <div className="title color-info">
              RESOLVED
            </div>
            <div className="value color-info">
              {ticketResolved.toString().length === 1 ? `0${ticketResolved}` : ticketResolved}
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="padding-ticket text-center">
            <div className="title color-white">
              TOTAL TICKET
            </div>
            <div className="value color-white">
              {ticketTotalTicket.toString().length === 1 ? `0${ticketTotalTicket}` : ticketTotalTicket} 
            </div>
          </div>
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default CardTicket;
