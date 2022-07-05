import { Col, Input, InputNumber, Modal, Row, Typography } from "antd";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect } from 'react';
import adminApi from "../../../apis/adminApi";
const { Title, Text } = Typography;

const ProductForm = (props) => {

    const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            position: 0
        }
    })

    useEffect(() => {
        reset(props.value)
    }, [props.value])
    const onSubmit = async data => {
        data = {...data, 'json_type': 'category'}
        if (props.action === 'insert') {
            await adminApi.insertCategory(data)
        } else {
            await adminApi.updateCategory(data)
        }
        props.cancel()
        props.getList()
    }

    return (
        <Modal title={(props.action === 'insert' ? 'Thêm ' : 'Cập nhật ') + 'Category'}
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
                <Title level={5}>Vị trí: </Title>
                    <Controller
                        name="position"
                        control={control}
                        rules={{ required: true, min: 1, max: 100 }}
                        render={({ field }) => <InputNumber {...field} />}
                    />
                    {errors?.position ?.type === 'required' && <p><Text type='danger'>Vị trí không được bỏ trống</Text></p>}
                    {errors?.position ?.type === 'min' && <p><Text type='danger'>Vị trí phải lớn hơn hoặc bằng 1</Text></p>}
                    {errors?.position ?.type === 'max' && <p><Text type='danger'>Vị trí phải nhỏ hơn hoặc bằng 100</Text></p>}
                </Col>
            </Row>



        </Modal>)
}

export default ProductForm;
