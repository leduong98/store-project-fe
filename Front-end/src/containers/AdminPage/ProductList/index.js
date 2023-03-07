import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Spin,
  Table
} from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonReducers from 'reducers/common';
import { baseURL } from '../../../apis/axiosClient';
import DiscountList from './DiscountList';
import ProductForm from './ProductForm';


function ProductList() {
  const dispatch = useDispatch();
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('insert');
  const [item, setItem] =useState(null);
  const [page, setPage] = useState(1);
  const categoryList = useSelector((state) => state.common?.categoryList);
  const [visibleDiscount, setVisibleDicount] = useState(false);
  const [productId, setProductId] = useState(0)
  const [searchValue, setSearchValue] = useState('');
  const [total, setTotal] = useState(0)

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: '5%'
    },
    {
      title: 'Tên sản phẩm',
      key: 'name',
      align: 'left',
      dataIndex: 'name',
      width: '20%'
    },
    {
      title: 'Ảnh',
      key: 'image',
      align: 'center',
      dataIndex: 'image',
      width: '10%',
      render: (_v, records) => (<Image
        width={100}
        src={baseURL + records.image}
      />)
    },
    {
      title: 'Giá',
      key: 'price',
      align: 'center',
      dataIndex: 'price',
      width: '10%'
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      align: 'center',
      dataIndex: 'quantity',
      width: '8%'
    },
    {
      title: 'Category',
      key: 'category',
      align: 'center',
      dataIndex: 'category',
      width: '10%',
      render: (_v, records) => categoryList ? categoryList.find(ele => ele.id === records.category.id).name : ''
    },
    {
      title: 'Mã giảm giá',
      key: 'discount',
      align: 'center',
      dataIndex: 'discount',
      width: '20%',
      render: (_v, records) => (
        <Button type='link' onClick={() => openModalDiscount(records.id)}>Danh sách mã giảm giá</Button>
      )
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
      const response = await adminApi.deleteProduct(id);
      if (response && response.status === 200) {
        message.success('Xoá product thành công');
        getCategoryList()
      }
    } catch (error) {
      message.error('Xoá product thất bại');
    }
  };

  async function getCategoryList() {
    try {
      setIsLoading(true);
      const response = await adminApi.getAllProduct();
      if (response) {
        const { data , metadata} = response.data;
        setTotal(metadata.total)
        setDataColumn([...data]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategoryList();
    dispatch(commonReducers.getListCategory());
  }, []);

  console.log(dataColumn)

  const onClickOpenModal = (action, item = null) => {
    setAction(action);
    setItem(item);
    setVisible(true);
  }

  const openModalDiscount = (id) => {
    setVisibleDicount(true);
    setProductId(id)
  }

  const handleChangeTable = (event,a,b,{ currentDataSource }) => {
    setTotal(currentDataSource.length);
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
          <Modal title={'Danh sách mã giảm giá'}
            visible={visibleDiscount} onOk={ () => setVisibleDicount(false)} cancelButtonProps={{ style: { display: 'none' } }}  closable={false}
            width={1200}>
           <DiscountList productId={productId} />
          </Modal>
          <Input style={{width: '300px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Nhập tên sản phẩm..."/>
          <br></br>
          <br></br>
          <Table
            columns={columns}
            dataSource={dataColumn.filter(ele => searchValue.trim() === '' || (ele.name && ele.name.includes(searchValue)))}
            onChange={handleChangeTable}
            pagination={{ showLessItems: true, position: ['bottomCenter'], pageSize: 5, current: page }}
          />
          <span>Total: {total}</span>
        </div>
      )}
    </>
  );
}

export default ProductList;
