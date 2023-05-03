import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  
const ChartProductivity = ({data, dataKey}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 4,
          right: 12,
          left: -10,
          bottom: -10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#888" />
        <XAxis interval={24} dataKey="RESULTTIME" style={{fontSize: '9px'}} tick={{ fill: '#f7ffff' }}/>
        <YAxis style={{fontSize: '10px'}} tick={{ fill: '#f7ffff'}} tickFormatter={(number)=>dataFormater(number, dataKey)}/>
        <Tooltip formatter={(number)=>dataFormater(number, dataKey)}/>
        <Area type='monotone' dataKey={dataKey} stroke="#1d1f20" fill="#7f7f7f" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const dataFormater = (number, dataKey) => {
  var numberfx = parseFloat(number);
 
  if (dataKey === 'TRAFFIC') {
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
  
  if (dataKey === 'PAYLOAD') {
    if(number > 1000000000){
      return numberfx;
    }else if(number > 1000000){
      return ((numberfx/1024/1024).toFixed(2)).toString() + 'TB';
    }else if(number > 1000){
      return ((numberfx/1024).toFixed(2)).toString() + 'GB';
    }else{
      return numberfx.toFixed(2).toString();
    }
  }
}
  
export default ChartProductivity;
  