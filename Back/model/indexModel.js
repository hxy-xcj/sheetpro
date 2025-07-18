const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ExcelType = {
  path: String
}
// 创建user模型，限制这些字段的类型
const ExcelModel = mongoose.model("tempFile",new Schema(ExcelType))
module.exports = ExcelModel