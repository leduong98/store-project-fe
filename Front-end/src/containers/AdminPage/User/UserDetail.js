import { Col, Modal, Row, Typography} from "antd";
import {Controller, useForm } from "react-hook-form";
import React, { useEffect } from 'react';
const { Title, Text } = Typography;

const UserDetail = (props) => {
    
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            id: null,
            full_name: '',
            email: '',
            address: '',
            birthday: '',
            status: 0,
            phone: ''
        }
    })

    useEffect(() => {
        const resetValue = { ...props.value };
        reset(resetValue)
    }, [props.value])

    return (
        <Modal title={"Xem Chi Tiết"}
            visible={props.visible} width={1000}
            footer={[]} onCancel={props.onCancel}>
            <Row>
                <Col span={3}>
                    <label>ID : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.id} </label>
                </Col>
                <Col span={3}>
                    <label>Full Name : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.full_name} </label>
                </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <label>Email : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.email} </label>
                </Col>
                <Col span={3}>
                    <label>Address : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.address} </label>
                </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <label>Birthday : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.birthday} </label>
                </Col>
                <Col span={3}>
                    <label>Status : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.status} </label>
                </Col>
            </Row>
            <Row>
                <Col span={3}>
                    <label>Phone : </label>
                </Col>
                <Col span={9}>
                    <label>{props.value?.phone} </label>
                </Col>
            </Row>
        </Modal>)
}

export default UserDetail;
