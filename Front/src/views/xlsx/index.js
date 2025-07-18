import React, { useState, useReducer, useEffect, useCallback } from 'react'
import {
  Button,
  message,
  Steps,
  theme
} from 'antd';
import { retrieveInitState, RetrieveReducer, RetrieveContext } from './index.context';

import './xlsx.css';
import ExcelUpload from './ExcelUpload';
import SetParam from './SetParam'
import SetHeader from './SetHeader.js'


const steps = [
  {
    title: '文件上传',
    content: <ExcelUpload />,
  },
  {
    title: '配置筛选条件',
    content: <SetParam />,
  },
  {
    title: '输出表头设置',
    content: <SetHeader/>,
  },
];


export default function XlsxConduct(props) {

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [state, dispatch] = useReducer(RetrieveReducer, retrieveInitState);
  function setState(config) {
    dispatch({
      type: 'setState',
      ...config,
    });
  }
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map(item => ({ key: item.title, title: item.title }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };


  return <RetrieveContext.Provider value={{ ...state, dispatch, setState }}>
    <div className="outside-box">
      <Steps className="step" current={current} items={items} />
      {steps[current].content}
      {/* <div style={contentStyle}>{steps[current].content}</div> */}
      <div className="button-box">
        {current > 0 && (
          <Button style={{ marginRight: '10px' }} onClick={() => prev()}>
            返回上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { next(); console.log(state) }}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            完成
          </Button>
        )}
      </div>
    </div>
  </RetrieveContext.Provider>
}