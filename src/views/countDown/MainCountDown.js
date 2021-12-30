import { Button } from "antd";
import React, { useState } from "react";
import SettingModal from "./SettingModal";

const MainCountDown = () => {
    const [visible, setVisible] = useState({
        status : false,
        time: null,
        description: null,
    });

    const onShowTimeSettingForm = () => {
        setVisible({status: true, time: null, description: null});
    };

    const onSubmitTimeSettingForm = () =>{
        setVisible({status: false, time: null, description: null});
    }

    return <>
    <Button onClick={onShowTimeSettingForm}>show</Button>
    <SettingModal visible={visible.status} onSubmit={onSubmitTimeSettingForm}  />
    </>;
};

export default MainCountDown;