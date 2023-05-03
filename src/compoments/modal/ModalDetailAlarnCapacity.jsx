import React from 'react';
import { Modal, Table } from 'antd';

const ModalDetailAlarmCapacity = ({showModal, visible, detailALarm, data, loadingData, error}) => {
  
const columns = [
  { title: 'Site ID', width: 80, dataIndex: 'siteid', key: 'siteid', fixed: 'left'},
  { title: 'Cell Name', dataIndex: 'cellname', key: 'cellname' },
  { title: 'NodeB Name', dataIndex: 'nodebname', key: 'nodebname' },
  { title: 'Resource Block Rete', dataIndex: 'resource_block_rete', key: 'resource_block_rete' },
  { title: 'Cluster', dataIndex: 'cluster', key: 'cluster' },
  { title: 'Poi Name', dataIndex: 'poi_name', key: 'poi_name' },
  { title: 'Poi Category', dataIndex: 'poi_category', key: 'poi_category' },
];
  
  let typeAlarm = data.alarmType
  if (data.alarmType === 'CAPACITY') {
    typeAlarm = `${typeAlarm} POI`;
  }
  return (
    <Modal title="" width="90%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>{`DETAIL ALARM ${typeAlarm} ${data.category} - ${data.severity}`}</div>
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
            <Table columns={columns} size={"small"} dataSource={detailALarm} scroll={{ x: 1200, y: 300 }} pagination={false}/>
          </div>
          : ''
        }
      </div>
    </Modal>
  );
}


export default ModalDetailAlarmCapacity;
