import React from 'react';
import { Modal, Table } from 'antd';

const ModalTopApps = ({showModal, visible, detailTopApps, data, loadingData, error}) => {
  
const columns = [
  { title: 'APPS', dataIndex: 'app_name', key: 'app_name' },
  { title: 'TOTAL (MB)', dataIndex: 'TOTAL', key: 'TOTAL' },
  { title: 'TOTAL USER', dataIndex: 'TOTAL_USER', key: 'TOTAL_USER' },
  { title: 'TIME', dataIndex: 'TIME', key: 'TIME'},
];
  
  return (
    <Modal title="" width="60%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>Detail TOP APPS</div>
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
            <Table columns={columns} size={"small"} dataSource={detailTopApps} pagination={true}/>
            {/* <div style={{fontSize: '10px', color: '#bbb', fontStyle: 'italic', marginTop: '4px'}}>{`* Last Update : ${lastUpdate} `}</div> */}
          </div>

          : ''
        }
      </div>
    </Modal>
  );
}


export default ModalTopApps;
