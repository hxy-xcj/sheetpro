var express = require('express');
var router = express.Router();
var IndexModel = require("../model/indexModel")
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/Temp/' })

//  上传文件的接口
// 输入的是文件，输出的是文件在后端本地存储的地址 
router.post('/upload', upload.single("excelFile"), async function (req, res) {
    // const { username, password, age } = req.body
    console.log(`/uploads/Temp/${req.file.filename}`)
    // 操作数据库
    IndexModel.create({
        path: `/uploads/Temp/${req.file.filename}`
    })
    res.send({ ok: 1, msg: "添加成功", filename: `/uploads/Temp/${req.file.filename}` })
});

module.exports = router;
