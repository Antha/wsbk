import React from 'react';
import { Modal } from 'antd';

const ModalDownloadReport = ({visible, showModal, data}) => {

  return (
    <Modal width="50%" title="" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <pre>{data ? data : ''}</pre>
    </Modal>
  );
}

export default ModalDownloadReport;