import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Image, message, Popconfirm, Row, Spin, Table, Switch } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';
import SlideForm from './SlideForm';
import { baseURL } from '../../../apis/axiosClient';

function SlideList() {
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('insert');
  const [item, setItem] = useState(null);
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
      title: 'Link',
      key: 'image',
      align: 'center',
      dataIndex: 'link',
      render: (v, record) => (<Image
        width={100}
        src={baseURL + record.link}
      />),
      width: '20%'
    },

    {
      title: 'Trạng thái',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      render: (v, record) => <Switch checked={v} onChange={() => onChangeStatusSlide(record.id)}/>,
      width: '10%'
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
            onConfirm={() => onDelSlide(records.id)}>
            <Button danger icon={<DeleteOutlined />}>Xoá</Button>
          </Popconfirm>
        </Row>
      ),
    },
  ];

  const onDelSlide = async (id) => {
    try {
      const response = await adminApi.deleteSlide(id);
      if (response && response.status === 200) {
        message.success('Xoá slide thành công');
        getSlideList();
      }
    } catch (error) {
      message.error('Xoá slide thất bại');
    }
  };

  const onChangeStatusSlide = async (id) => {
    try{
      const response = await adminApi.changeStatusSlide(id);
      if (response && response.status === 200) {
            message.success('Thay đổi trạng thái thành công');
            setDataColumn(dataColumn.map(ele => ele.id === id ? {...ele, status: !ele.status} : ele))
          }
    }catch (error){

    }
  }

  async function getSlideList() {
    try {
      setIsLoading(true);
      const response = await adminApi.getSlideList();
      if (response) {
        const { data } = response.data;
        setDataColumn([...data]);
        setIsLoading(false);
      }
    } catch(error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSlideList();
  }, []);

  const onClickOpenModal = (action, item = null) => {
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
          <SlideForm value={item} visible={visible} cancel={(e) => setVisible(false)} action={action}  getList={() => getSlideList()}/>
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

export default SlideList;
