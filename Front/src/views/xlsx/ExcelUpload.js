import { Upload, message } from 'antd';
import * as XLSX from 'xlsx';
import { InboxOutlined } from '@ant-design/icons';
import { useRetrieveContext } from './index.context';


const { Dragger } = Upload;




{/* 上传这边只能传一个，多了直接覆盖 */}
export default function ExcelUpload() {

  const {
    excelFile,
    setState
  } = useRetrieveContext();

  // 处理文件上传
  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      setState({excelFile:file});
      parseExcel(file);
    } else {
      setState({excelFile:null});
      setState({columns:[]});
    }
  };
  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 转换为 JSON 获取表头
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (json.length > 0) {
          const headers = json[0]; // 第一行是表头
          setState({columns:headers});
          message.success('Excel 文件解析成功');
        }
      } catch (error) {
        message.error('Excel 解析失败，请检查文件格式');
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };


  return <>
      <Dragger
        accept=".xlsx,.xls"
        name="excelFile"
        multiple={false}
        beforeUpload={() => false}
        fileList={excelFile ? [excelFile] : []}
        onChange={handleFileChange}
      >
        <div className="upload-content">
          <div className="upload-icon">
            <InboxOutlined />
          </div>
          <div className="upload-text">
            <p className="upload-title">拖放文件到这里或者点击上传</p>
            <p className="upload-subtitle">支持 .xlsx 和 .xls 格式</p>
          </div>
        <div className="upload-content"></div>
          {excelFile && (
            <div className="uploaded-file">
              <InboxOutlined className="file-icon" />
              <span className="file-name">{excelFile.name}</span>
            </div>
          )}
        </div>
       </Dragger> 
     {/* </div>  */}
  </>
}