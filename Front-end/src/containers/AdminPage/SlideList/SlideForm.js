import { Col, Input, InputNumber, Modal, Row, Typography, Upload } from "antd";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import adminApi from "../../../apis/adminApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { baseURL } from "../../../apis/axiosClient";
const { Title, Text } = Typography;

const SlideForm = (props) => {

    const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            link: '',
            status: true
        }
    })

    useEffect(() => {
        reset(props.value ? props.value : {
            name: '',
            link: '',
            status: true
        })
    }, [props.value])
    const onSubmit = async data => {
        data = {...data, 'json_type': 'slider'}
        if (props.action === 'insert') {
            await adminApi.insertSlide(data)
        }else {
            await adminApi.updateSlide(data)
        }
        props.cancel()
        props.getList()
    }

    const [loading, setLoading] = useState(false);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const changeFile = async (e) => {
        const file = e.file;
        setLoading(true);
        try {
            const imageLink = await adminApi.uploadFile(file);
            setValue('link', imageLink.data.link)
        } catch (exception) {
            setLoading(false)
        }
    }

    return (
        <Modal title={(props.action === 'insert' ? 'Thêm ' : 'Cập nhật ') + 'Slide'}
            visible={props.visible} onOk={handleSubmit(onSubmit)} onCancel={props.cancel}
            width={1000}
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Title level={5}>Tên: </Title>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Input {...field}
                        />}

                    />
                    {errors?.name ?.type === 'required' && <p><Text type='danger'>Tên không được bỏ trống</Text></p>}
                </Col>
                <Col span={12}>
                    <Title level={5}>Ảnh: </Title>
                    <Controller
                        name="link"
                        control={control}
                        rules={{ required: true, min: 1, max: 100 }}
                        render={({ field }) => <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={e => changeFile(e)}
                        >
                            {field.value ? <img src={baseURL + field.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>}
                    />
                    {errors?.image?.type === 'required' && <p><Text type='danger'>Ảnh không được bỏ trống</Text></p>}
                </Col>
            </Row>
        </Modal>)
}

export default SlideForm;
