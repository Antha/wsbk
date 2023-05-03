import React from 'react';
import { Modal, Table } from 'antd';

const ModalDetailAlarm = ({showModal, visible, detailALarm, data, loadingData, error, lastUpdate, status}) => {
  
  if(status == 'CRITICAL'){
    var scrollx = 2000;
    var columns = [
      { title: 'Venue', width: 120, dataIndex: 'VENUE', key: 'VENUE', fixed: 'left'},
      { title: 'SiteID', width: 120, dataIndex: 'SITE_ID', key: 'SITE_ID', fixed: 'left'},
      { title: 'Sitename', dataIndex: 'SITE_NAME', key: 'SITE_NAME', fixed: 'left'},
      { title: 'Kategori', dataIndex: 'CATEGORY', key: 'CATEGORY'},
      { title: 'AlarmName', dataIndex: 'AlarmName', key: 'AlarmName'},
      { title: 'SEVERITY', dataIndex: 'SEVERITY', key: 'SEVERITY'},
      { title: 'Status', dataIndex: 'Status', key: 'Status'},
      { title: 'type', dataIndex: 'type', key: 'type'},
      { title: 'Longitude', dataIndex: 'LONGITUDE', key: 'LONGITUDE'},
      { title: 'Latitude', dataIndex: 'LATITUDE', key: 'LATITUDE'},
      { title: 'Keterangan', dataIndex: 'VENUE', key: 'VENUE'},
      { title: 'OccurrenceTime', dataIndex: 'OccurrenceTime', key: 'OccurrenceTime'},
      { title: 'LASTUPDATE', dataIndex: 'LASTUPDATE', key: 'LASTUPDATE'},
    ];
  }else if(status == 'CAPACITY'){
    var scrollx = 3000;
    var columns = [
      { title: 'Venue', width: 120, dataIndex: 'VENUE', key: 'VENUE', fixed: 'left'},
      { title: 'SiteID', width: 120, dataIndex: 'SITE_ID', key: 'SITE_ID', fixed: 'left'},
      { title: 'Sitename', dataIndex: 'SITE_NAME', key: 'SITE_NAME', fixed: 'left'},
      { title: 'Kategori', dataIndex: 'CATEGORY', key: 'CATEGORY'},
      { title: '4g_DL_Resource_Block_Utilizing_Rate', dataIndex: '4g_DL_Resource_Block_Utilizing_Rate', key: '4g_DL_Resource_Block_Utilizing_Rate',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '4g_UL_Resource_Block_Utilizing_Rate', dataIndex: '4g_UL_Resource_Block_Utilizing_Rate', key: '4g_UL_Resource_Block_Utilizing_Rate',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '4g_MaxOfMax_Active_User', dataIndex: '4g_MaxOfMax_Active_User', key: '4g_MaxOfMax_Active_User',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 120 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '3g_Max_Power_Utilization_NonHS', dataIndex: '3g_Max_Power_Utilization_NonHS', key: '3g_Max_Power_Utilization_NonHS',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) >= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      // { title: '5g_PRB_Utilization_DL', dataIndex: '5g_PRB_Utilization_DL', key: '5g_PRB_Utilization_DL',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) >= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      // { title: '5g_PRB_Utilization_UL', dataIndex: '5g_PRB_Utilization_UL', key: '5g_PRB_Utilization_UL',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) >= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: '5g_RRC_User_Number', dataIndex: '5g_RRC_User_Number', key: '5g_RRC_User_Number',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 120 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: 'Longitude', dataIndex: 'LONGITUDE', key: 'LONGITUDE'},
      { title: 'Latitude', dataIndex: 'LATITUDE', key: 'LATITUDE'},
      { title: 'Keterangan', dataIndex: 'VENUE', key: 'VENUE'},
      { title: 'LASTUPDATE', dataIndex: 'LASTUPDATE', key: 'LASTUPDATE'},
    ];
  }else if(status == 'QUALITY'){
    var scrollx = 4000;
    var columns = [
      { title: 'Venue', width: 120, dataIndex: 'VENUE', key: 'VENUE', fixed: 'left'},
      { title: 'SiteID', width: 120, dataIndex: 'SITE_ID', key: 'SITE_ID', fixed: 'left'},
      { title: 'Sitename', dataIndex: 'SITE_NAME', key: 'SITE_NAME', fixed: 'left'},
      { title: 'Kategori', dataIndex: 'CATEGORY', key: 'CATEGORY'},
      { title: '2g_TCH_Blocking_Rate', dataIndex: '2g_TCH_Blocking_Rate', key: '2g_TCH_Blocking_Rate',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 5 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '2g_SDCCH_Blocking_Rate', dataIndex: '2g_SDCCH_Blocking_Rate', key: '2g_SDCCH_Blocking_Rate',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) >= 5 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: '2g_HOSR', dataIndex: '2g_HOSR', key: '2g_HOSR',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '2g_SDSR', dataIndex: '2g_SDSR', key: '2g_SDSR',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '2g_TDR', dataIndex: '2g_TDR', key: '2g_TDR',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) >= 5 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      // { title: '2g_CSSR', dataIndex: '2g_CSSR', key: '2g_CSSR',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 80 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: '3g_CSSR_CS', dataIndex: '3g_CSSR_CS', key: '3g_CSSR_CS',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '3g_CSSR_PS', dataIndex: '3g_CSSR_PS', key: '3g_CSSR_PS',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '3g_CSSR_HSDPA', dataIndex: '3g_CSSR_HSDPA', key: '3g_CSSR_HSDPA',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '3g_CSSR_HSUPA', dataIndex: '3g_CSSR_HSUPA', key: '3g_CSSR_HSUPA',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '3g_CCSR_CS', dataIndex: '3g_CCSR_CS', key: '3g_CCSR_CS',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      // { title: '3g_CCSR_PS', dataIndex: '3g_CCSR_PS', key: '3g_CCSR_PS',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 50 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: '4g_RRC_Setup_SR_Service', dataIndex: '4g_RRC_Setup_SR_Service', key: '4g_RRC_Setup_SR_Service',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      { title: '4g_ERAB_Setup_SR_All', dataIndex: '4g_ERAB_Setup_SR_All', key: '4g_ERAB_Setup_SR_All',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '4g_Call_Setup_SR', dataIndex: '4g_Call_Setup_SR', key: '4g_Call_Setup_SR',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: '4g_Service_Drop_Rate', dataIndex: '4g_Service_Drop_Rate', key: '4g_Service_Drop_Rate',
      render(text, record) {
        if(text !== null){
          return {
            props: {
              style: { color: parseInt(text) >= 5 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }},
      // { title: '5G_SN_Setup_Success_Rate', dataIndex: '5G_SN_Setup_Success_Rate', key: '5G_SN_Setup_Success_Rate',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      // { title: '5g_NR_Retainability', dataIndex: '5g_NR_Retainability', key: '5g_NR_Retainability',
      // render(text, record) {
      //   if(text !== null){
      //     return {
      //       props: {
      //         style: { color: parseInt(text) <= 90 ? "#FF0000" : "#00FF00" }
      //       },
      //       children: <div>{text.toFixed(2)}</div>
      //     };
      //   }
      // }},
      { title: 'Longitude', dataIndex: 'LONGITUDE', key: 'LONGITUDE'},
      { title: 'Latitude', dataIndex: 'LATITUDE', key: 'LATITUDE'},
      { title: 'Keterangan', dataIndex: 'VENUE', key: 'VENUE'},
      { title: 'LASTUPDATE', dataIndex: 'LASTUPDATE', key: 'LASTUPDATE'},
    ];
  }else{
    var scrollx = 1200;
    var columns = [
      { title: 'Venue', width: 120, dataIndex: 'VENUE', key: 'VENUE', fixed: 'left'},
      { title: 'SiteID', width: 120, dataIndex: 'SITE_ID', key: 'SITE_ID', fixed: 'left'},
      { title: 'Sitename', dataIndex: 'SITE_NAME', key: 'SITE_NAME', fixed: 'left'},
      { title: 'Kategori', dataIndex: 'CATEGORY', key: 'CATEGORY'},
      { title: 'Longitude', dataIndex: 'LONGITUDE', key: 'LONGITUDE'},
      { title: 'Latitude', dataIndex: 'LATITUDE', key: 'LATITUDE'},
      { title: 'Keterangan', dataIndex: 'VENUE', key: 'VENUE'},
    ];
  }
  
  return (
    <Modal title="" width="90%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>{`DETAIL ALARM ${data.poi} ${data.type}`}</div>
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
            <Table columns={columns} size={"small"} dataSource={detailALarm} scroll={{ x: scrollx }} pagination={true}/>
            {/* <div style={{fontSize: '10px', color: '#bbb', fontStyle: 'italic', marginTop: '4px'}}>{`* Last Update : ${lastUpdate} `}</div> */}
          </div>

          : ''
        }
      </div>
    </Modal>
  );
}


export default ModalDetailAlarm;
