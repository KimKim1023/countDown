import { Modal } from "antd";
import React from "react";

const SettingModal = ({visible, onSubmit}) => {

    return <Modal visible={visible} onSubmit={onSubmit} onCancel={onSubmit}>
        this is a modal view.
    </Modal>
};

export default SettingModal;