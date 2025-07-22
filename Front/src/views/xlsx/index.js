import { useState, useReducer } from 'react'
import axios from 'axios'
import {
  Button,
  message,
  Steps,
  theme
} from 'antd';

import { retrieveInitState, RetrieveReducer, RetrieveContext } from './index.context';


import './xlsx.css';
import ExcelUpload from './ExcelUpload';
import SetHeader from './SetHeader';
import SetParam from './SetParam';


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
      <div className="button-box">
        {current > 0 && (
          <Button style={{ marginRight: '10px' }} onClick={() => prev()}>
            返回上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button style={{ marginRight: '10px' }} type="primary" onClick={() => { next()}}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => {

            // 把headers从对象变为数组
            let headers=[]
            state.headers.forEach(item => {headers.push(item.columns)}) 

            const formData = new FormData();
            formData.append("excelFile", state.excelFile)
            formData.append("headers", JSON.stringify(headers))
            formData.append("params", JSON.stringify(state.params))


            axios.post('http://localhost:8000/excel/upload',formData,{
              headers:{
                'Content-Type': 'multipart/form-data',
              }
            }).then(res=>{window.open(res.data.url)})

            message.success('Processing complete!')

          }}>
            完成并下载EXCEL文件
          </Button>
        )}
      </div>
    </div>
  </RetrieveContext.Provider>
}