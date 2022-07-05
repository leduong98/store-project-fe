import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Row, Spin, Table } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';


function ProductList() {
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('insert');
  const [item, setItem] =useState(null);
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
      title: 'Tên',
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      width: '40%'
    },
    {
      title: 'Vị trí',
      key: 'position',
      align: 'center',
      dataIndex: 'position',
      width: '20%'
    },
    {
      title: 'Action',
      align: 'center',
      render: (_v, records) => (
        <Row style={{display: 'flex', justifyContent: 'center'}}>
          <Button type='primary' icon={<EditOutlined />} onClick={() => onClickOpenModal("update", records)}> Sửa</Button>
          &nbsp;
          &nbsp;
          <Popconfirm
            title="Bạn có chắc muốn xoá ?"
            placement="left"
            cancelText="Huỷ bỏ"
            okText="Xoá"
            onConfirm={() => onDelCategory(records.id)}>
            <Button danger icon={<DeleteOutlined />}>Xoá</Button>
          </Popconfirm>
        </Row>
  
      ),
    },
  ];

  const onDelCategory = async (id) => {
    try {
      const response = await adminApi.deleteCategory(id);
      if (response && response.status === 200) {
        message.success('Xoá categoty thành công');
        getCategoryList()
      }
    } catch (error) {
      message.error('Xoá categoty thất bại');
    }
  };

  async function getCategoryList() {
    try {
      setIsLoading(true);
      const response = await adminApi.getCategoryList();
      if (response) {
        const { data } = response.data;
        setDataColumn([...data]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoryList();
  }, []);

  console.log(dataColumn)

  const onClickOpenModal = (action, item = null) => {
    console.log(item)
    setAction(action);
    setItem(item);
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
            <Button type="primary" icon={<PlusOutlined />} onClick={() => onClickOpenModal("insert")}>
              Thêm
            </Button>
          </Row>
          <ProductForm value={item} visible={visible} cancel={(e) => setVisible(false)} action={action}  getList={() => getCategoryList()}/>
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

export default ProductList;
