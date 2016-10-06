import React, { Component } from 'react';
import { string, number, object, select } from 'react-formulate';
//
// const StyleInput = ({ onChange, value = {value: '0', unit: 'px'}, label }) => (
//   <label>
//     {label}
//     <input type="number" value={value.value} onChange={e => onChange({value: e.target.value, unit: value.unit})} />
//     <select value={value.unit} onChange={e => onChange({value: value.value, unit: e.target.value})}>
//       <option value="px">px</option>
//     </select>
//   </label>
// );


const StyleInput = ({ onChange, value = "0px", label }) => {
  const val = isNaN(parseFloat(value)) ? "" : parseFloat(value);
  const unit = value.replace(val, "");
  return (
    <label>
      {label}
      <div style={{display: 'flex'}}>
        <input type="number" value={val} onChange={e => onChange(e.target.value + unit)} />
        <select value={unit} onChange={e => onChange(val + e.target.value)}>
          <option value="px">px</option>
          <option value="em">em</option>
          <option value="%">%</option>
          <option value="vw">vw</option>
          <option value="vh">vh</option>
        </select>
      </div>
    </label>
  );
};

const LayoutForm = object({
  margin: ({onChange, value}) => <StyleInput value={value} onChange={onChange} label="Margin"/>,
  padding: ({onChange, value}) => <StyleInput value={value} onChange={onChange} label="Padding"/>,
  height: ({onChange, value}) => <StyleInput value={value} onChange={onChange} label="Height"/>,
  backgroundImage: string({label: 'Background Image'}),
  backgroundColor: string({label: 'Background Color'}),
  backgroundSize: string({label: 'Background Size'}),
  backgroundPosition: string({label: 'Background Position'}),
  backgroundRepeat: select(['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'initial', 'inherit'], {label: 'Background Repeat'}),
}, {label: 'Layout'});



export default LayoutForm;
