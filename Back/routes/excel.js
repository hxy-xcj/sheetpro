var express = require('express');
var IndexModel = require("../model/indexModel")
const multer = require('multer')
const XLSX = require('xlsx');
const path = require('path')
const fs = require('fs')

var router = express.Router();
const upload = multer({ dest: 'public/uploads/Temp/' })






// router.get('/test',(req,res)=>{
//     console.log('testing')
// })
//  上传文件的接口
// 输入的是文件，输出的是文件在后端本地存储的地址 
router.post('/upload', upload.single("excelFile"), async function (req, res) {
    try {
        let { params, headers } = req.body; // 获取前端传来的参数
        let filters = JSON.parse(params);
        headers = JSON.parse(headers)

        console.log(req.file)
        // 1. 读取Excel文件
        const workbook = XLSX.readFile(req.file.path);
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 2. 转换为JSON并处理数据
        let data = XLSX.utils.sheet_to_json(worksheet);
        let newdata = []

        // 3. 数据筛选（根据前端参数）
        if (filters.length > 0) {
            filters.forEach(({ column, operator, value }) => {
                value = String(value)
                switch (operator) {
                    case 'c':
                        data = data.filter(row => String(row[column]).includes(value)); break;
                    case 'nc':
                        data = data.filter(row => !String(row[column]).includes(value)); break;
                    case 'eq':
                        data = data.filter(row => String(row[column]) === value); break;
                }
            })
        }

        // 4. 表头重组
        console.log(headers)
        const customData = data.map(row => {
            const newRow = {};
            headers.forEach(header => {newRow[header] = row[header] || null});
            return newRow;
        });

        // 5. 生成新Excel
        const newWorkbook = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.json_to_sheet(customData);
        XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "ProcessedData");

        // 6. 返回文件
        const outputPath = path.join(__dirname, '../public/result/processed.xlsx');        
        XLSX.writeFile(newWorkbook, outputPath);

        res.download(outputPath, 'processed_data.xlsx', () => {
            // 清理临时文件
            const uploadDir = path.join(__dirname, '../public/uploads', 'Temp');
            console.log(uploadDir)
            const originalFilePath = path.join(uploadDir, req.file.filename);
            fs.unlinkSync(originalFilePath);
        });
        console.log("33")
        res.send({ ok: 1, url:"http://localhost:8000/result/processed.xlsx" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
