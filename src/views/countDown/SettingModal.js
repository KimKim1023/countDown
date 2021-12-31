import { Button, Form, Input, Modal, Switch, TimePicker, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import React from "react";

const { TextArea } = Input;

const SettingModal = ({ visible, form, onSubmit }) => {

    const props = {
        beforeUpload: file => {
        //   if (file.type !== 'image') {
        //     message.error(`${file.name} is not a png file`);
        //   }
        //   return file.type === 'image' ? true : Upload.LIST_IGNORE;
        },
      };

      const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };


    return <Modal visible={visible} onOk={onSubmit} onCancel={onSubmit}>
        <Form form={form}>
            <Form.Item label="finish time" name={"time"}>
                <TimePicker />
            </Form.Item>
            <Form.Item label="new year" name={"newYear"} valuePropName="checked">
                <Switch />
            </Form.Item>
            <Form.Item name={"image"} valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload {...props} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Upload image only</Button>
                </Upload>
            </Form.Item>
        </Form>
    </Modal>
};

export default SettingModal;