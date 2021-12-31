import { Form } from "antd";
import React, { useState } from "react";
import SettingModal from "./SettingModal";
import ShowTime from "./ShowTime";

const MainCountDown = () => {
    const [visible, setVisible] = useState({
        status: true,
        time: null,
        newYear: null,
        image: null,
    });
    const [form] = Form.useForm();


    const onShowTimeSettingForm = () => {
        setVisible({ status: true, time: null, newYear: null, image: null });
    };

    const onSubmitTimeSettingForm = () => {
        form.validateFields()
            .then((val) => {
                console.log(val)
                setVisible({
                    status: false,
                    time: val.time ? val.time._d.getTime() : null,
                    newYear: val.newYear,
                    image: val.image ?val.image[0].originFileObj : null,
                });
            }).catch(info => {
                console.log('Validate Failed:', info);
            });
    }

    return <>
        <ShowTime inputTime={visible.time} newYear={visible.newYear} image={visible.image} />
        <SettingModal form={form} visible={visible.status} onSubmit={onSubmitTimeSettingForm} />
    </>;
};

export default MainCountDown;