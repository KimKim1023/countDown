import { Col, Image, Row } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { interval } from "rxjs";
import "./style.css"

const downing = function* (num) {
    while (num >= -1) {
        num--;
        yield num;
    }
};

const ShowTime = ({ inputTime, newYear, image }) => {
    const [nowTime, setNowTime] = useState({
        date: moment().format("YYYY/MM/DD"),
        time: moment().format("kk:mm:ss")
    });
    const [showImage, setShowImage] = useState(null)
    const [showCoutDown, setShowCountDown] = useState(16);
    const iterator = downing(16);


    useEffect(() => {
        if (showCoutDown => 0) {
            const subscription = interval(1000).subscribe(() => {
                showNowTime();
            });

            return () => {
                subscription.unsubscribe();
            }
        }
    }, [inputTime, newYear]);

    useEffect(() => {
        onPreview();
    }, [image])

    const showNowTime = () => {
        if (inputTime) {
            const result = moment(inputTime).diff(moment(), "seconds")
            console.log(result, moment().format("kk:mm:ss"))
            if (1 <= result && result <= 15) {
                setShowCountDown(iterator.next().value);
                const date = moment().format("YYYY/MM/DD")
                const time = moment().format("kk:mm:ss")
                setNowTime({ date: date, time: time })
                return;
            } else if (result === 0) {
                setShowCountDown(0)
                setNowTime({
                    date: moment().format("YYYY/MM/DD"),
                    time: moment(inputTime).format("kk:mm:ss")
                })
                return;
            } else if (result < 0) {
                return;
            }
            const date = moment().format("YYYY/MM/DD")
            const time = moment().format("kk:mm:ss")
            setNowTime({ date: date, time: time })

        } else if (newYear) {
            const newyear = new Date().getFullYear();
            const result = moment({ year: newyear + 1, month: 0, date: 1 }).diff(moment(), "seconds")
            console.log(result, moment().format("kk:mm:ss"))
            if (1 <= result && result <= 15) {
                setShowCountDown(iterator.next().value);
                const date = moment().format("YYYY/MM/DD")
                const time = moment().format("kk:mm:ss")
                setNowTime({ date: date, time: time })
                return;
            } else if (result === 0) {
                setShowCountDown(0)
                setNowTime({
                    date: moment(inputTime).format("YYYY/MM/DD"),
                    time: moment(inputTime).format("kk:mm:ss")
                })
                return;
            } else if (result < 0) {
                return;
            }
            const date = moment().format("YYYY/MM/DD")
            const time = moment().format("kk:mm:ss")
            setNowTime({ date: date, time: time })
        } else {
            const date = moment().format("YYYY/MM/DD")
            const time = moment().format("kk:mm:ss")
            setNowTime({ date: date, time: time })
        }

    };

    const onPreview = async () => {
        if (!image) return;
        let src = null;
        src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
        });
        setShowImage(src);
    };


    return <>
        {showCoutDown !== 0 ?
            <>
                <Row justify="center" className="count_down">
                    <Col />
                    <Col>
                        <div style={{ fontSize: "10em", textAlign: "center" }}>{nowTime.date}</div>
                        <div style={{ fontSize: "30em", textAlign: "center" }}>{nowTime.time}</div>
                    </Col>
                    <Col />
                </Row>
                {(1 <= showCoutDown && showCoutDown <= 15) && (
                    <>
                        <div className="count_down back_ground_opacity"></div>
                        <div className="count_down count_down_sub">
                            {showCoutDown}
                        </div>
                    </>
                )}
            </>
            : <>
                <div className="count_down">
                    <img src={showImage} alt="メイン写真" title="メイン写真" />
                </div>
            </>}
    </>;
};

export default ShowTime;