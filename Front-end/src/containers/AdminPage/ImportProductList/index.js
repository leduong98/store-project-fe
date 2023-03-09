import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Row, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ImportProductForm from './ImportProductForm';
import axiosClient
  from "../../../apis/axiosClient";

function ImportProductList() {
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      width: '40%'
    },
    {
      title: 'Số lượng',
      key: 'qty',
      align: 'center',
      dataIndex: 'qty',
      width: '20%'
    },
    {
      title: 'Giá nhâp',
      key: "price",
      dataIndex: 'price',
      align: 'center'
    },
  ];

  async function getImportList() {
    try {
      setIsLoading(true);
      const url = '/product-source/histories';
      const response = await axiosClient.get(url);
      if (response) {
        const data = response.data;
        const dataTo = data.map(e => {
          return {
            id: e.id,
            name: e.product.name,
            qty: e.productSource.quantity,
            price: e.productSource.price
          }
        })
        setDataColumn([...dataTo]);
        setIsLoading(false);
      }
    } catch(error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getImportList();
  }, []);

  const onClickOpenModal = () => {
    setVisible(true);
  }

  const handleChangeTable = event => {
    setPage(event.current)
  }

  return (
    <>
      {isLoading ? (
        <Spin className="trans-center" tip="Đang lấy danh sách ..." />
      ) : (
        <div style={{ padding: '10px 10px 10px 10px' }}>
          <Row style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => onClickOpenModal()}>
              Nhập hàng
            </Button>
          </Row>
          <ImportProductForm visible={visible} cancel={(e) => setVisible(false)} getList={() => getImportList()}/>
          <Table
            columns={columns}
            dataSource={dataColumn}
            onChange={handleChangeTable}
            pagination={{ showLessItems: true, position: ['bottomCenter'], pageSize: 5, current: page }}
          />
        </div>
      )}
    </>
  );
}

export default ImportProductList;
