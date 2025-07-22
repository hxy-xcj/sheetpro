import { Upload ,message} from 'antd';
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

  const parseExcel = async (file) => {
    try {
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(new Uint8Array(e.target.result));
        reader.onerror = (e) => reject(new Error('文件读取失败'));
        reader.readAsArrayBuffer(file);
      });

      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (json.length > 0) {
        const headers = json[0];
        await setState({
          columns: headers,
          headers: headers.map((item, index) => ({ key: index, columns: item })),
        });
      message.success('excel解析成功')
      }
    } catch (error) {
      message.error('excel解析失败')
      console.error(error);
    }
  };

    const handleFileChange = async({ fileList }) => {
    
    if (fileList.length > 0) {
      const file = fileList[0].originFileObj;
      await setState({excelFile:file});
      await parseExcel(file);
    } else {
      await setState({excelFile:null,columns:[]});
    }
    // setTimeout(()=>{},0)
    
  };

  return <>
      <Dragger
        accept=".xlsx,.xls"
        name="excelFile"
        multiple={false}
        beforeUpload={() => false}
        fileList={excelFile ? [excelFile] : []}
        onChange={handleFileChange }
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
  </>
}