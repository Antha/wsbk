import React from 'react';
import { Modal } from 'antd';

const ModalDetailLampPole = ({data, visible, showModal}) => {
  return (
    <Modal title="" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>DETAIL LAMP POLE</div>
       { data.map((datakey) => { return(
        <div style={{display: 'flex'}}>
          <div style={{width: '30%'}}>{datakey.key}</div>
          <div style={{width: '70%'}}>: {datakey.value}</div>
        </div>
        )
         })
        }
    </Modal>
  );
}

export default ModalDetailLampPole;