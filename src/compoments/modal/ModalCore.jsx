import React from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';

const ModalCore = ({showModal, visible, detailCore, data, loadingData, error, valCore}) => {
  if(valCore == 'ALL'){
    var filterednames = detailCore;
  }else{
    var filterednames = detailCore.filter(function(obj) {
      return (obj.Kategori === valCore);
    });
  }
const columns = [
  { title: 'Kategori', dataIndex: 'Kategori', key: 'Kategori'},
  { title: 'NE', dataIndex: 'NE', key: 'NE' },
  { title: 'Value', dataIndex: 'Value', key: 'Value' },
  { title: 'Last Update', dataIndex: 'DATETIME', key: 'DATETIME', render: ((time) => { return moment(time).format('YYYY-MM-DD HH:mm')}) },
];
  
  return (
    <Modal title="" width="60%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>Detail CORE</div>
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
            <Table columns={columns} size={"small"} dataSource={filterednames} pagination={true}/>
            {/* <div style={{fontSize: '10px', color: '#bbb', fontStyle: 'italic', marginTop: '4px'}}>{`* Last Update : ${lastUpdate} `}</div> */}
          </div>

          : ''
        }
      </div>
    </Modal>
  );
}

const timeFormat = (number) => {
  const d = new Date(number);
  var b = d.toISOString().substring(0, 10);
  var c = d.toISOString().substring(11, 12);

  c = c.length === 1 ? `0${c}` : c;
  return `${b} ${c}`;
}

export default ModalCore;
