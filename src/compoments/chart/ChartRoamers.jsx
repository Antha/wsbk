import React, {useState} from 'react';
import { AreaChart, Legend, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  
const ChartRoamers = ({data}) => {
  const inputLabels = [
    
    {databar: "VLR", key: "VLR", color: "#02B075", colorid: "url(#color2)", yAxisId:"left"},
    {databar: "TOTAL_USER", key: "ROAMERS", color: "#F94C48", colorid: "url(#color1)", yAxisId:"right"},
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

  const handleLegendMouseEnter = (e) => {
    if (!barProps[e.dataKey]) {
      setBarProps({ ...barProps, hover: e.dataKey });
    }
  };

  const handleLegendMouseLeave = (e) => {
    setBarProps({ ...barProps, hover: null });
  };

  const selectBar = (e) => {
    setBarProps({
      ...barProps,
      [e.dataKey]: !barProps[e.dataKey],
      hover: null
    });
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 0,
          right: 20,
          left: -20,
          bottom: -4
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#888" />
        <XAxis interval={50} dataKey="RESULTTIME" style={{fontSize: '9px'}} tick={{ fill: '#f7ffff' }} />
        <YAxis yAxisId="left" orientation="left" style={{fontSize: '10px'}} tick={{ fill: '#f7ffff'}}/>
        <YAxis yAxisId="right" domain={[null, 80000]} orientation="right" style={{fontSize: '10px'}} tick={{ fill: '#f7ffff'}}/>
        <Tooltip formatter={(number)=>dataFormater(number)} />
        <defs>
        <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F94C48" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#F94C48" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#02B075" stopOpacity={0.9}/>
            <stop offset="95%" stopColor="#02B075" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Legend wrapperStyle={{left: 5}} layout="horizontal" align="left" verticalAlign="bottom" height={30}
          onClick={selectBar}
          onMouseOver={handleLegendMouseEnter}
          onMouseOut={handleLegendMouseLeave}
        />
        {inputLabels.map((label, index) => (
        <Area yAxisId={label.yAxisId} hide={barProps[label.databar] === true} key={index} name={label.key} type="monotone" dataKey={label.databar} stroke={label.color} fill={label.colorid} fillOpacity={Number(barProps.hover === label.databar || !barProps.hover ? 1 : 0.25)} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

const dataFormater = (number) => {
  var numberfx = parseFloat(number);
  if(number > 1000000000){
    return ((numberfx/1000000000).toFixed(1)).toString() + 'B';
  }else if(number > 1000000){
    return ((numberfx/1000000).toFixed(1)).toString() + 'M';
  }else if(number > 1000){
    return ((numberfx/1000).toFixed(1)).toString() + 'K';
  }else{
    return numberfx.toFixed(1).toString();
  }
}
  
export default ChartRoamers;
  