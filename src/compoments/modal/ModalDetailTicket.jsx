import React, {useEffect, useState} from "react";
import { Form, Input, Button, Modal, Table } from 'antd';

const ModalDetailTicket = ({showModal, visible, dataAppend}) => {
  const columns = [
    {
      title: 'Field',
      key: 'field',
      dataIndex: 'field',
    },
    {
      title: 'Value',
      key: 'value',
      dataIndex: 'value',
    },
  ];

  const data = [
    {
      field: "ticketId",
      value: dataAppend.ticketId,
    },
    {
      field: "ticketNumber",
      value: dataAppend.ticketNumber,
    },
    {
      field: "statusId",
      value: dataAppend.statusId,
    },
    {
      field: "createdTime",
      value: dataAppend.createdTime,
    },
    {
      field: "userCreatorId",
      value: dataAppend.userCreatorId,
    },
    {
      field: "userCreatorName",
      value: dataAppend.userCreatorName,
    },
    {
      field: "roleCreatorId",
      value: dataAppend.roleCreatorId,
    },
    {
      field: "roleCreatorName",
      value: dataAppend.roleCreatorName,
    },
    {
      field: "userAssigneeId",
      value: dataAppend.userAssigneeId,
    },
    {
      field: "userAssigneeName",
      value: dataAppend.userAssigneeName,
    },
    {
      field: "userAssigneeFullName",
      value: dataAppend.userAssigneeFullName,
    },
    {
      field: "userPhone",
      value: dataAppend.userPhone,
    },
    {
      field: "roleAssigneeId",
      value: dataAppend.roleAssigneeId,
    },
    {
      field: "roleAssigneeName",
      value: dataAppend.roleAssigneeName,
    },
    {
      field: "statusCode",
      value: dataAppend.statusCode,
    },
    {
      field: "statusName",
      value: dataAppend.statusName,
    },
    {
      field: "typeCode",
      value: dataAppend.typeCode,
    },
    {
      field: "typeName",
      value: dataAppend.typeName,
    },
    {
      field: "subtypeCode",
      value: dataAppend.subtypeCode,
    },
    {
      field: "subtypeName",
      value: dataAppend.subtypeName,
    },
    {
      field: "id",
      value: dataAppend.id,
    },
    {
      field: "title",
      value: dataAppend.title,
    },
    {
      field: "summary",
      value: dataAppend.summary,
    },
    {
      field: "domain",
      value: dataAppend.domain,
    },
    {
      field: "serviceImpact",
      value: dataAppend.serviceImpact,
    },
    {
      field: "incidentType",
      value: dataAppend.incidentType,
    },
    {
      field: "description",
      value: dataAppend.description,
    },
    {
      field: "transmission",
      value: dataAppend.transmission,
    },
    {
      field: "resolution",
      value: dataAppend.resolution,
    },
    {
      field: "linkName",
      value: dataAppend.linkName,
    },
    {
      field: "vendorName",
      value: dataAppend.vendorName,
    },
    {
      field: "createDate",
      value: dataAppend.createDate,
    },
    {
      field: "occuredTime",
      value: dataAppend.occuredTime,
    },
    {
      field: "clearedTime",
      value: dataAppend.clearedTime,
    },
    {
      field: "ticketAge",
      value: dataAppend.ticketAge,
    },
    {
      field: "l0Duration",
      value: dataAppend.l0Duration,
    },
    {
      field: "l0MaxDuration",
      value: dataAppend.l0MaxDuration,
    },
    {
      field: "l1Duration",
      value: dataAppend.l1Duration,
    },
    {
      field: "l1MaxDuration",
      value: dataAppend.l1MaxDuration,
    },
    {
      field: "l2Duration",
      value: dataAppend.l2Duration,
    },
    {
      field: "l2MaxDuration",
      value: dataAppend.l2MaxDuration,
    },
    {
      field: "l3Duration",
      value: dataAppend.l3Duration,
    },
    {
      field: "l3MaxDuration",
      value: dataAppend.l3MaxDuration,
    },
    {
      field: "slaDuration",
      value: dataAppend.slaDuration,
    },
    {
      field: "slaMaxDuration",
      value: dataAppend.slaMaxDuration,
    },
    {
      field: "currentState",
      value: dataAppend.currentState,
    },
    {
      field: "rootCause",
      value: dataAppend.rootCause,
    },
    {
      field: "action",
      value: dataAppend.action,
    },
    {
      field: "nossaNumber",
      value: dataAppend.nossaNumber,
    },
    {
      field: "nossaTicketStatus",
      value: dataAppend.nossaTicketStatus,
    },
    {
      field: "nossaSiteTotal",
      value: dataAppend.nossaSiteTotal,
    },
    {
      field: "nossaSiteDetail",
      value: dataAppend.nossaSiteDetail,
    },
    {
      field: "suspectProblem",
      value: dataAppend.suspectProblem,
    },
    {
      field: "latitude",
      value: dataAppend.latitude,
    },
    {
      field: "longitude",
      value: dataAppend.longitude,
    },
    {
      field: "siteclass",
      value: dataAppend.siteclass,
    },
    {
      field: "priorityCode",
      value: dataAppend.priorityCode,
    },
    {
      field: "priorityName",
      value: dataAppend.priorityName,
    },
    {
      field: "severityCode",
      value: dataAppend.severityCode,
    },
    {
      field: "severityName",
      value: dataAppend.severityName,
    },
    {
      field: "urgencyCode",
      value: dataAppend.urgencyCode,
    },
    {
      field: "urgencyName",
      value: dataAppend.urgencyName,
    },
    {
      field: "impactCode",
      value: dataAppend.impactCode,
    },
    {
      field: "impactName",
      value: dataAppend.impactName,
    },
    {
      field: "siteId",
      value: dataAppend.siteId,
    },
    {
      field: "siteName",
      value: dataAppend.siteName,
    },
    {
      field: "alarmCategory1Code",
      value: dataAppend.alarmCategory1Code,
    },
    {
      field: "alarmCategory1Name",
      value: dataAppend.alarmCategory1Name,
    },
    {
      field: "alarmCategory2Code",
      value: dataAppend.alarmCategory2Code,
    },
    {
      field: "alarmCategory2Name",
      value: dataAppend.alarmCategory2Name,
    },
    {
      field: "alarmCategory3Code",
      value: dataAppend.alarmCategory3Code,
    },
    {
      field: "alarmCategory3Name",
      value: dataAppend.alarmCategory3Name,
    },
    {
      field: "networkCategory1Code",
      value: dataAppend.networkCategory1Code,
    },
    {
      field: "networkCategory1Name",
      value: dataAppend.networkCategory1Name,
    },
    {
      field: "networkCategory2Code",
      value: dataAppend.networkCategory2Code,
    },
    {
      field: "networkCategory2Name",
      value: dataAppend.networkCategory2Name,
    },
    {
      field: "networkCategory3Code",
      value: dataAppend.networkCategory3Code,
    },
    {
      field: "networkCategory3Name",
      value: dataAppend.networkCategory3Name,
    },
    {
      field: "resolutionCategory1Code",
      value: dataAppend.resolutionCategory1Code,
    },
    {
      field: "resolutionCategory1Name",
      value: dataAppend.resolutionCategory1Name,
    },
    {
      field: "resolutionCategory2Code",
      value: dataAppend.resolutionCategory2Code,
    },
    {
      field: "resolutionCategory2Name",
      value: dataAppend.resolutionCategory2Name,
    },
    {
      field: "resolutionCategory3Code",
      value: dataAppend.resolutionCategory3Code,
    },
    {
      field: "resolutionCategory3Name",
      value: dataAppend.resolutionCategory3Name,
    },
    {
      field: "slaStatus",
      value: dataAppend.slaStatus,
    },
    {
      field: "l0Status",
      value: dataAppend.l0Status,
    },
    {
      field: "l1Status",
      value: dataAppend.l1Status,
    },
    {
      field: "l2Status",
      value: dataAppend.l2Status,
    },
    {
      field: "l3Status",
      value: dataAppend.l3Status,
    },
    {
      field: "ticketWorkOrderSummary",
      value: dataAppend.ticketWorkOrderSummary,
    },

  ];

  return (
    <Modal title="" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>{`TICKET DETAIL ${dataAppend.ticketId}`}</div>
      <Table columns={columns} size={"small"} dataSource={data} scroll={{ y: 420 }} pagination={false}/>
    </Modal>
  );
}
export default ModalDetailTicket;