import React from "react";
import { Layout } from "antd";
import "./SideBar.css";
import { OrderedListOutlined } from '@ant-design/icons';
const SideBar = ({ showModal, visible, showVisible }) => {
    return (
        <Layout.Sider
            className="sidebar"
            breakpoint={"lg"}
            theme="dark"
            // collapsedWidth={0}
            trigger={visible}
            collapsed={visible}
            style={{left: visible ? "-350px" : "0px"}}
        >
            <div className="close-sidebar"onClick={() => showVisible()}>X</div>
            <div style={{display:"flex", alignItems: 'center', borderBottom: '1px solid #fff', margin: '0px 10px', paddingBottom: '10px'}}>
                {/* <div style={{margin: '15px 15px 15px 0px'}}>
                    <img height="68px" src="/royal-wedding/images/top-royal.png" alt="Royal Wedding"/>
                </div> */}
                <div>
                    <div style={{color: '#fff',fontSize: '30px', fontWeight: '700', marginTop: '3px', letterSpacing: '1px'}}>EMPEROR</div>
                    <span style={{ display: 'block', marginTop: '-4px', fontSize: '14px', marginBottom: '4px', color:"#fff", marginRight:"60px"}}>Event Monitoring Platform Provided For Area 3 - WSBK 2023</span>
                </div>
            </div>
            <ul>
                <li>
                    <a onClick={()=>showModal()} href="#" rel="noreferrer"><OrderedListOutlined style={{marginRight:"10px"}}/> Download Report</a>
                </li>
            </ul>
        </Layout.Sider>
        );
};
export default SideBar;