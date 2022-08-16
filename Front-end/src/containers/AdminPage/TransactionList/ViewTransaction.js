import { Button, Col, Input, InputNumber, Modal, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from 'react';
import adminApi from "../../../apis/adminApi";
import { TransactionStatus } from "../../../constants/extend_constant";
const { Text } = Typography;

const columns = [
    {
        title: 'Sản phẩm',
        key: 'product',
        align: 'center',
        dataIndex: 'product',
        width: '20%',
        render: (e, record) => record?.product?.name
    },
    {
        title: 'Mã giảm giá',
        key: 'discount',
        align: 'center',
        dataIndex: 'discount',
        width: '20%',
        render: (e, record) => record.discount ? record.dicount.discount : ''
    },
    {
        title: 'Số lượng',
        key: 'quantity',
        align: 'center',
        dataIndex: 'quantity',
        width: '30%'
    },
    {
        title: 'Giá',
        key: 'amount',
        align: 'center',
        dataIndex: 'amount',
        width: '20%'
    }
];

const ViewTranssaction = (props) => {

    const [item, setItem] = useState({})

    useEffect(() => {
        async function fetchMyAPI() {
            if (props.value) {
                const respone = await adminApi.getTransactionById(props.value);
                {debugger}
                setItem(respone.data)
            }
          }

          fetchMyAPI()


    }, [props.value])

    return (
        <Modal title={"Chi tiết giao dịch"}
            visible={props.visible} onOk={props.cancel}
            cancelButtonProps={{ style: { display: 'none' } }} closable={false}
            footer={[
                <Button key={"three_button"} type="primary" onClick={props.cancel}>Ok</Button>]}
            width={1000}
        >
            <Row gutter={[20, 10]}>
                <Col span={8}>
                    <Text level={5}>Khách hàng: </Text>
                    <Text strong>{item?.user?.full_name}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Email: </Text>
                    <Text strong>{item?.user_email}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Số điện thoại: </Text>
                    <Text strong>{item?.user_phone}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Trạng thái: </Text>
                    <Text strong>{item ? TransactionStatus[item.status] : ''}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Ngày đặt: </Text>
                    <Text strong>{item?.created_at}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Địa chỉ: </Text>
                    <Text strong>{item?.address}</Text>
                </Col>
                <Col span={8}>
                    <Text level={5}>Tổng tiền: </Text>
                    <Text strong>{item?.amount}</Text>
                </Col>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={item ? item.orders : []}
                        pagination={false}
                        bordered
                    />
                </Col>
            </Row>




        </Modal>)
}

export default ViewTranssaction;
