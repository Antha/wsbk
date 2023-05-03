import React from 'react';
import { Modal } from 'antd';

const ModalDetailTower = ({data, visible, showModal, Sitename, Subinfo}) => {
  return (
    <Modal title="" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>DETAIL USER</div>
      <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}>Username</div>
        <div style={{width: '70%'}}>: {data.username}</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}>Name</div>
        <div style={{width: '70%'}}>: {data.name}</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}>Latitude</div>
        <div style={{width: '70%'}}>: {data.latitude}</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}>Longitude</div>
        <div style={{width: '70%'}}>: {data.longitude}</div>
      </div>
      <div style={{display: 'flex'}}>
        <div style={{width: '30%'}}>LastUpdate</div>
        <div style={{width: '70%'}}>: {data.lastUpdate}</div>
      </div>
    </Modal>
  );
}

export default ModalDetailTower;