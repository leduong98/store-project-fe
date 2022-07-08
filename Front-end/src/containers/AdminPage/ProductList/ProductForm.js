import { Button, Col, Input, InputNumber, Modal, Row, Select, Typography, Upload } from "antd";
import { useForm, Controller } from "react-hook-form";
import React, { useEffect, useMemo, useState } from 'react';
import adminApi from "../../../apis/adminApi";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { baseURL } from "../../../apis/axiosClient";
import { useSelector } from 'react-redux';
import EditorComponent from "../Config/EditorComponent";
const { Title, Text } = Typography;

const ProductForm = (props) => {

    const categoryList = useSelector((state) => state.common?.categoryList);
    const [productDetailModel, setProductDetailModel] = useState([])
    const [productDetail, setProductDetail] = useState([])
    const [imageList, setImageList] = useState([])

    const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            image: '',
            category_id: null,
            imageList: '',
            quantity: 0,
            description: '',
            detail: ''
        }
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const resetValue = { ...props.value };
        if (props.value) {
            resetValue.category_id = props.value.category.id;
            setProductDetail(props.value.detail ? JSON.parse(props.value.detail) : []);
            handleChangeCategory(props.value.category.id)
            if (props.value.imageList) {
                setImageList(props.value.imageList.split(',').map(item => ({ status: 'done', name: item, url: item })));
            }
        }
        reset(resetValue)
    }, [props.value])
    const onSubmit = async data => {
        data = { ...data, 'json_type': 'product' }
        data.detail = JSON.stringify(productDetail);
        data.imageList = imageList.map(item => item.url).join(',');
        { debugger }
        if (props.action === 'insert') {
            await adminApi.insertProduct(data)
        } else {
            await adminApi.updateProduct(data)
        }
        props.cancel()
        props.getList()
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    const changeFile = async (e, field) => {
        const file = e.file;
        if (file.status === 'removed') {
            setImageList(e.fileList)
        } else {
            setLoading(true);
            try {
                const imageLink = await adminApi.uploadFile(file);
                setLoading(false);
                if ('image' === field) {
                    setValue('image', imageLink.data.link)
                } else {
                    setImageList([...imageList, { status: 'done', name: imageLink.data.name, url: imageLink.data.link }])
                }
            } catch (exception) {
                setLoading(false)
            }
        }
    }

    const handleChangeCategory = value => {
        const selectedCategory = categoryList.find(ele => ele.id === value)
        if (selectedCategory.product_detail && selectedCategory.product_detail !== '')
            setProductDetailModel(selectedCategory.product_detail.split(',').map(item => item.trim()))
    }

    const getValueProductDetail = value => {
        const selectDetail = productDetail.find(ele => ele.name === value);
        return selectDetail ? selectDetail.value : ''
    }

    const changeProductDetail = (event, name) => {
        let newArray;
        if (productDetail.some(ele => ele.name === name)) {
            newArray = productDetail.map(ele => ele.name === name ? { name: name, value: event.target.value } : ele);
        } else {
            newArray = [...productDetail, { name: name, value: event.target.value }]
        }

        setProductDetail(newArray)
    }

    const memoizedImageList = useMemo(() => (<Col span={24}>
        <Title level={5}>Danh sách ảnh: </Title>
        <Upload
            listType="picture-card"
            fileList={imageList.map(item => ({ ...item, url: baseURL + item.url }))}
            beforeUpload={() => false}
            // onPreview={handlePreview}
            onChange={e => changeFile(e, "image_list")}
        >
            {[].length >= 8 ? null : uploadButton}
        </Upload>
        {/* <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal> */}
    </Col>), [imageList]);

    const changeEditor = ele => {
        setValue('description', ele);
    }


    return (
        <Modal title={(props.action === 'insert' ? 'Thêm ' : 'Cập nhật ') + 'Sản Phẩm'}
            visible={props.visible} onOk={handleSubmit(onSubmit)} onCancel={props.cancel}
            width={1000}
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Title level={5}>Tên sản phẩm: </Title>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => <Input {...field}
                                />}
                            />
                            {errors?.name?.type === 'required' && <p><Text type='danger'>Tên không được bỏ trống</Text></p>}
                        </Col>
                        <Col span={24}>
                            <Title level={5}>Category: </Title>
                            <Controller
                                name="category_id"
                                control={control}
                                rules={{ required: true, min: 1, max: 100 }}
                                render={({ field }) => <Select onSelect={handleChangeCategory} style={{ width: '100%' }} {...field}>
                                    {
                                        (categoryList || []).map((item, index) => (<Select.Option value={item.id} key={index}>
                                            {item.name}
                                        </Select.Option>))
                                    }
                                </Select>}
                            />
                            {errors?.category_id?.type === 'required' && <p><Text type='danger'>category không được bỏ trống</Text></p>}
                        </Col>
                    </Row>

                </Col>
                <Col span={12}>
                    <Title level={5}>Ảnh: </Title>
                    <Controller
                        name="image"
                        control={control}
                        rules={{ required: true, min: 1, max: 100 }}
                        render={({ field }) => <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={e => changeFile(e, "image")}
                        >
                            {field.value ? <img src={baseURL + field.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>}
                    />
                    {errors?.image?.type === 'required' && <p><Text type='danger'>Ảnh không được bỏ trống</Text></p>}
                </Col>

                <Col span={12}>
                    <Title level={5}>Giá: </Title>
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: true, min: 1000 }}
                        render={({ field }) => <InputNumber style={{ width: '100%' }} {...field}
                        />}
                    />
                    {errors?.price?.type === 'required' && <p><Text type='danger'>Giá không được bỏ trống</Text></p>}
                    {errors?.price?.min === 'min' && <p><Text type='danger'>Giá phải lớn hơn hoặc bằng 1000</Text></p>}
                </Col>
                <Col span={12}>
                    <Title level={5}>Số lượng: </Title>
                    <Controller
                        name="quantity"
                        control={control}
                        rules={{ required: true, min: 1, max: 1000 }}
                        render={({ field }) => <InputNumber style={{ width: '100%' }} {...field} />}
                    />
                    {errors?.quantity?.type === 'required' && <p><Text type='danger'>Số lượng không được bỏ trống</Text></p>}
                    {errors?.quantity?.type === 'min' && <p><Text type='danger'>Vị trí phải lớn hơn hoặc bằng 1</Text></p>}
                    {errors?.quantity?.type === 'max' && <p><Text type='danger'>Vị trí phải nhỏ hơn hoặc bằng 1000</Text></p>}
                </Col>

                <Col span={24}>
                    <Title level={5}>Thông số kỹ thuật: </Title>
                    {
                        productDetailModel.map((item, index) => (
                            <Row gutter={20} style={{ marginBottom: '10px' }} key={index}>
                                <Col span={12}>
                                    <Input value={item} disabled={true} />
                                </Col>
                                <Col span={12}>
                                    <Input value={getValueProductDetail(item)} onChange={ele => changeProductDetail(ele, item)} placeholder="Giá trị" />
                                </Col>
                            </Row>
                        ))
                    }
                </Col>

                <Col span={24}>
                    <Title level={5}>Mô tả: </Title>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true, min: 1, max: 1000 }}
                        render={({ field }) => <EditorComponent data={field.value} changeEditor={changeEditor} height={"480px"} />}
                    />
                    {errors?.description?.type === 'required' && <p><Text type='danger'>Số lượng không được bỏ trống</Text></p>}
                </Col>
                {memoizedImageList}

            </Row>



        </Modal >)
}

export default ProductForm;
