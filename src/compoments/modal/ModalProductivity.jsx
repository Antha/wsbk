import {React, useState} from 'react';
import { Button, Modal, Row, Col, Tabs, Table } from 'antd';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Surface, Symbols } from 'recharts';
import axios from "axios";

const ModalProductivity = ({visible, showModal, error, loadingData, toptraffic, worsttraffic, toppayload, worstpayload, toptrafficsite, worsttrafficsite, toppayloadsite, worstpayloadsite, dataChartTraffic, dataChartPayload}) => {
  
  const [page, setPage] = useState(1);
  const { TabPane } = Tabs;
  const inputLabels = [
    {databar: "men_house", key: "RUMAH MEMPELAI PRIA", color: "#F94C48", colorid: "url(#color1)"},
    {databar: "supporting_venue", key: "SUPPORTING VENUE", color: "#02B075", colorid: "url(#color4)"},
    {databar: "main_venue", key: "MAIN VENUE", color: "#8D5B9E", colorid: "url(#color3)"},
    {databar: "woman_house", key: "RUMAH MEMPELAI WANITA", color: "#e67e22", colorid: "url(#color6)"}
  ]

  const inputLabels2 = [
    {databar: "men_house", key: "RUMAH MEMPELAI PRIA", color: "#F94C48", colorid: "url(#color5)"},
    {databar: "supporting_venue", key: "SUPPORTING VENUE", color: "#02B075", colorid: "url(#color8)"},
    {databar: "main_venue", key: "MAIN VENUE", color: "#8D5B9E", colorid: "url(#color7)"},
    {databar: "woman_house", key: "RUMAH MEMPELAI WANITA", color: "#e67e22", colorid: "url(#color6)"}
  ]

  const [barProps, setBarProps] = useState(
    inputLabels.reduce(
      (a, { databar }) => {
        a[databar] = false;
        return a;
      },
      { hover: null }
    )
  );

  const [barPropsP, setBarPropsP] = useState(
    inputLabels2.reduce(
      (a, { databar }) => {
        a[databar] = false;
        return a;
      },
      { hover: null }
    )
  );

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseEnter2 = (e) => {
    if (!barPropsP[e.dataKey]) {
      setBarPropsP({ ...barPropsP, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setBarProps({ ...barProps, hover: null });
  };

  const handleLegendMouseLeave2 = (e) => {
    setBarPropsP({ ...barPropsP, hover: null });
  };

  const selectBar = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null
    });
  };

  const selectBar2 = (e) => {
    setBarPropsP({
      ...barPropsP,
      [e.dataKey]: !barPropsP[e.dataKey],
      hover: null
    });
  };

  const columnTraffic = [
    { title: '#', width: 50, dataIndex: 'number', key: 'number', fixed: 'left'},
    { title: 'CATEGORY', width: 120, dataIndex: 'POI_CATEGORY', key: 'POI_CATEGORY', fixed: 'left'},
    { title: 'POI', width: 280, dataIndex: 'POI_NAME', key: 'POI_NAME', fixed: 'left'},
    { title: 'Growth (%)', dataIndex: 'GROWTH_TRAFFIC', key: 'GROWTH_TRAFFIC',
      render(text, record) {
        if(text){
          return {
            props: {
              style: { color: parseInt(text) < 0 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }
     },
    { title: 'Actual (Erl)', dataIndex: 'P1', key: 'P1',
      render(text, record) {
        if(text){
         return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
    { title: 'Baseline (Erl)', dataIndex: 'P2', key: 'P2',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
  ];

  const columnPayload = [
    { title: '#', width: 50, dataIndex: 'number', key: 'number', fixed: 'left'},
    { title: 'CATEGORY', width: 120, dataIndex: 'POI_CATEGORY', key: 'POI_CATEGORY', fixed: 'left'},
    { title: 'POI', width: 280, dataIndex: 'POI_NAME', key: 'POI_NAME', fixed: 'left'},
    { title: 'Growth (%)', dataIndex: 'GROWTH_PAYLOAD', key: 'GROWTH_PAYLOAD',
      render(text, record) {
        if(text){
          return {
            props: {
              style: { color: parseInt(text) < 0 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }
    },
    { title: 'Actual (GB)', dataIndex: 'P1', key: 'P1',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
    { title: 'Baseline (GB)', dataIndex: 'P2', key: 'P2',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>;
        }
      }
    },
  ];

  const columnTrafficSite = [
    { title: '#', width: 50, dataIndex: 'number', key: 'number', fixed: 'left'},
    { title: 'SITE ID', width: 100, dataIndex: 'SITEID', key: 'SITEID', fixed: 'left'},
    { title: 'SITE NAME', width: 400, dataIndex: 'SITENAME', key: 'SITENAME'},
    { title: 'Growth (%)', dataIndex: 'GROWTH_TRAFFIC', key: 'GROWTH_TRAFFIC',
      render(text, record) {
        if(text){
          return {
            props: {
              style: { color: parseInt(text) < 0 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }
     },
    { title: 'Actual (Erl)', dataIndex: 'P1', key: 'P1',
      render(text, record) {
        if(text){
         return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
    { title: 'Baseline (Erl)', dataIndex: 'P2', key: 'P2',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
  ];

  const columnPayloadSite = [
    { title: '#', width: 50, dataIndex: 'number', key: 'number', fixed: 'left'},
    { title: 'SITE ID', width: 100, dataIndex: 'SITEID', key: 'SITEID', fixed: 'left'},
    { title: 'SITE NAME', width: 400, dataIndex: 'SITENAME', key: 'SITENAME'},
    { title: 'Growth (%)', dataIndex: 'GROWTH_PAYLOAD', key: 'GROWTH_PAYLOAD',
      render(text, record) {
        if(text){
          return {
            props: {
              style: { color: parseInt(text) < 0 ? "#FF0000" : "#00FF00" }
            },
            children: <div>{text.toFixed(2)}</div>
          };
        }
      }
    },
    { title: 'Actual (GB)', dataIndex: 'P1', key: 'P1',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>
        }
      }
    },
    { title: 'Baseline (GB)', dataIndex: 'P2', key: 'P2',
      render(text, record) {
        if(text){
          return <div>{numberformat(text.toFixed(2))}</div>;
        }
      }
    },
  ];

  return (
    <Modal title="" width="100%" footer={null} visible={visible} onCancel={showModal} bodyStyle={{backgroundColor: '#051a2d', color:'white'}}>
      <div style={{textAlign: 'center', fontSize: '14px', fontWeight: '600', marginBottom: '10px'}}>PRODUCTIVITY</div>
      <br/>
      <Row gutter={24}>
        <Col span={12}>
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '10px'}}>Traffic POI</div>
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart width={730} height={500} data={dataChartTraffic}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
              <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F94C48" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F94C48" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e67e22" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e67e22" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8D5B9E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8D5B9E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#02B075" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#02B075" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis height={120} dataKey="mydate" angle={-90} dx={0} dy={45}/>
              <YAxis tickFormatter={(number)=>dataFormater(number, 'traffic')}/>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(number)=>dataFormater(number, 'traffic')} />
              <Legend verticalAlign="top" height={30}
                onClick={selectBar}
                onMouseOver={handleLegendMouseEnter}
                onMouseOut={handleLegendMouseLeave}
              />
              {inputLabels.map((label, index) => (
              <Area key={index} hide={barProps[label.databar] === true} name={label.key} type="monotone" dataKey={label.databar} stroke={label.color} fillOpacity={Number(barProps.hover === label.databar || !barProps.hover ? 1 : 0.25)} fill={label.colorid} />
              ))}
            </AreaChart>
            </ResponsiveContainer>
        </Col>
        <Col span={12}>
          <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '10px'}}>Payload POI</div>
         <ResponsiveContainer width="100%" height={500}>
            <AreaChart width={730} height={500} data={dataChartPayload}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="color5" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F94C48" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F94C48" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color8" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#02B075" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#02B075" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color7" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8D5B9E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8D5B9E" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color6" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e67e22" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#e67e22" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis height={120} dataKey="mydate" angle={-90} dx={0} dy={45}/>
              <YAxis tickFormatter={(number)=>dataFormater(number, 'payload')} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={(number)=>dataFormater(number, 'payload')} />
              <Legend verticalAlign="top" height={30}
                onClick={selectBar2}
                onMouseOver={handleLegendMouseEnter2}
                onMouseOut={handleLegendMouseLeave2}
              />
              {inputLabels2.map((label, index) => (
              <Area key={index} hide={barPropsP[label.databar] === true} name={label.key} type="monotone" dataKey={label.databar} stroke={label.color} fillOpacity={Number(barPropsP.hover === label.databar || !barPropsP.hover ? 1 : 0.25)} fill={label.colorid} />
              ))}
            </AreaChart>
            </ResponsiveContainer>
        </Col>
      </Row>
      <br/>
      <Row gutter={24}>
        <Col span={12}>
          <div className="card-container" style={{ borderRadius: "5px"}}>
            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '10px'}}>
              Growth Traffic
            </div>
            <Tabs type="card">
              <TabPane tab="POI" key="01">
                <Tabs type="card" className="poiTabPane">
                  <TabPane tab="TOP 10" key="1">
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
                        <Table columns={columnTraffic} size={"small"} dataSource={toptraffic} scroll={{ x: 600 }} pagination={false}/>
                      </div>
                    : ''
                    }
                  </TabPane>
                  <TabPane tab="WORST 10" key="2">
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
                        <Table columns={columnTraffic} size={"small"} dataSource={worsttraffic} scroll={{ x: 600 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="SITE" key="02">
                <Tabs type="card" className="poiTabPane">
                  <TabPane tab="TOP 10" key="11">
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
                        <Table columns={columnTrafficSite} size={"small"} dataSource={toptrafficsite} scroll={{ x: 800 }} pagination={false}/>
                      </div>
                    : ''
                    }
                  </TabPane>
                  <TabPane tab="WORST 10" key="21">
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
                        <Table columns={columnTrafficSite} size={"small"} dataSource={worsttrafficsite} scroll={{ x: 800 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <Col span={12}>
          <div className="card-container" style={{ borderRadius: "5px"}}>
            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: '600', marginBottom: '10px'}}>Growth Payload</div>
            <Tabs type="card" className="titleTabPane">
              <TabPane tab="POI" key="03">
                <Tabs type="card" className="poiTabPane">
                  <TabPane tab="TOP 10" key="3">
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
                        <Table columns={columnPayload} size={"small"} dataSource={toppayload} scroll={{ x: 600 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                  <TabPane tab="WORST 10" key="4">
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
                        <Table columns={columnPayload} size={"small"} dataSource={worstpayload} scroll={{ x: 600 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                </Tabs>
              </TabPane>
              <TabPane tab="SITE" key="04">
                <Tabs type="card" className="poiTabPane">
                  <TabPane tab="TOP 10" key="31">
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
                        <Table columns={columnPayloadSite} size={"small"} dataSource={toppayloadsite} scroll={{ x: 800 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                  <TabPane tab="WORST 10" key="41">
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
                        <Table columns={columnPayloadSite} size={"small"} dataSource={worstpayloadsite} scroll={{ x: 800 }} pagination={false}/>
                      </div>
                      : ''
                    }
                  </TabPane>
                </Tabs>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

const dataFormater = (number, dataKey) => {
    var numberfx = parseFloat(number);
   
    if (dataKey === 'traffic') {
      if(number > 1000000000){
        return ((numberfx/1000000000).toFixed(2)).toString() + 'B';
      }else if(number > 1000000){
        return ((numberfx/1000000).toFixed(2)).toString() + 'M';
      }else if(number > 1000){
        return ((numberfx/1000).toFixed(2)).toString() + 'K';
      }else{
        return numberfx.toFixed(2).toString();
      }
    }
    
    if (dataKey === 'payload') {
      if(number > 1000000000){
        return numberfx;
      }else if(number > 1000000){
        return ((numberfx/1024/1024).toFixed(2)).toString() + 'TB';
      }else if(number > 1000){
        return ((numberfx/1024).toFixed(2)).toString() + 'MB';
      }else{
        return numberfx.toFixed(2).toString();
      }
    }
  }

const timeFormat = (number) => {
  const d = new Date(number);
  var b = d.toISOString().substring(0, 10);
  var c = d.toISOString().substring(11, 12);

  c = c.length === 1 ? `0${c}` : c;
  return `${b} ${c}`;
}

const numberformat = (number) => {
  var number_string = number.toString(),
  split       = number_string.split('.'),
  sisa        = split[0].length % 3,
  rupiah        = split[0].substr(0, sisa),
  ribuan        = split[0].substr(sisa).match(/\d{3}/gi);
 
  if(ribuan){
    var separator = sisa ? ',' : '';
    rupiah += separator + ribuan.join(',');
  }

  return rupiah + "." + split[1]; 
}

export default ModalProductivity;