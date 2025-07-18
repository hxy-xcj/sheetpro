import React, { useState } from 'react'
import {
  Form,
  Select,
  Row,
  Col,
  Space,
  Input,
  Button,
  Radio
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useRetrieveContext } from './index.context';

// 处理表单提交

const template_data = [
  {
    id: 0,
    label: '无',
    params: []
  },
  {
    id: 1,
    label: 'hxy处理xxx数据',
    params: [
      { column: "MEMBERID", operator: "c", value: 'bb' }]
  }
]
export default function SetParam() {
  const [form] = Form.useForm();
  const {
    columns,
    template_id,
    params,
    setState
  } = useRetrieveContext();

  const onFinish = (values) => {
  console.log('筛选条件:', values);
  setState({params: values.filters})
};

  return <div className="upload-box">
    <p className="upload-title">选择已有模块</p>
    <div>
      <Radio.Group
        size="large"
        style={{ marginLeft: '30px' }}
        onChange={(e) => {
          let id = e.target.value
          setState({ template_id: id, params: template_data[id].params })
          console.log(template_data[id].params)
          form.setFieldValue('filters', template_data[id].params)
        }}
        value={template_id}
      >
        {
          template_data.map(({ id, label }) => {
            return <Radio.Button value={id} >{label}</Radio.Button>
          }
          )}

      </Radio.Group>
      {/* </div> */}
    </div>
    {columns.length > 0 && (
      <Form
        form={form}
        name="filter"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ filters: params }}
        onFieldsChange={(value) => {
          console.log(value)
          setState({ params: value.filters })
        }}
      >
        <Form.Item
          name="filters"
          label={
            <>
              <span className="upload-title mt">筛选条件</span>
              
            </>}
        >
          <Form.List name="filters" className='ml'>
            {(fields, { add, remove }) => (
              <Row gutter={16} style={{ marginLeft: '20px' }}> {/* 设置列间距 */}
                {fields.map(({ key, name, fieldKey }) => (
                  <Col key={key} span={12}> {/* 每组条件占 12/24 = 50% 宽度 */}
                    <Space
                      direction="horizontal"
                      style={{ width: '100%' }}
                      align="start"
                    >
                      {/* 列选择器 - 占比 30% */}
                      <Form.Item
                        {...fieldKey}
                        name={[name, 'column']}
                        style={{ flex: '0 0 30%' }}
                        rules={[{ required: true, message: '请选择列' }]}
                      >
                        <Select
                          placeholder="选 择 列 名"
                          options={columns.map((col) => ({ label: col, value: col }))}
                        />
                      </Form.Item>

                      {/* 操作符选择器 - 占比 20% */}
                      <Form.Item
                        {...fieldKey}
                        name={[name, 'operator']}
                        style={{ flex: '0 0 20%' }}
                        rules={[{ required: true, message: '请选择操作符' }]}
                      >
                        <Select
                          placeholder="操作符"
                          options={[
                            { value: "c", label: "包含" },
                            { value: "notContains", label: "不包含" },
                            { value: "=", label: "等于" },
                            { value: ">", label: "大于" },
                            { value: "<", label: "小于" },
                          ]}
                        />
                      </Form.Item>

                      {/* 值输入框 - 占比 40% */}
                      <Form.Item
                        {...fieldKey}
                        name={[name, 'value']}
                        style={{ flex: '0 0 40%' }}
                        rules={[{ required: true, message: '请输入值' }]}
                      >
                        <Input placeholder="内容" />
                      </Form.Item>

                      {/* 删除按钮 - 占比 10% */}
                      <Form.Item style={{ flex: '0 0 10%', paddingLeft: 8 }}>
                        <Button icon={<MinusOutlined />} onClick={() => remove(name)} />
                      </Form.Item>
                    </Space>
                  </Col>
                ))}

                {/* 添加按钮始终占满一行 */}
                <Col span={24} style={{ marginTop: 8 }}>
                  <Button color="cyan"  variant="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    添加筛选条件
                  </Button>
                  {/* style={{marginTop:'20px'}} type="dashed"*/}
                  <Button variant="text" type="link" htmlType="submit">
                    点击此处保存配置
                    </Button>
                </Col>
              </Row>
            )}

          </Form.List>
        </Form.Item>

      </Form>
    )}

  </div>
}