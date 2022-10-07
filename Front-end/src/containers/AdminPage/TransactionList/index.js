import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Popconfirm, Row, Spin, Table } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useMemo, useState } from 'react';
import { TransactionStatus } from '../../../constants/extend_constant';
import ViewTranssaction from './ViewTransaction';


function TransactionList() {
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('insert');
  const [item, setItem] =useState(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tài khoản',
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      width: '20%',
      render: (e, record) => record.user.full_name
    },
    {
      title: 'Email',
      key: 'email',
      align: 'center',
      dataIndex: 'user_email',
      filterSearch: true,
      filterMode: 'menu',
      onFilter: (value, record) => record.user_email.includes(value),
      width: '30%'
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      align: 'center',
      dataIndex: 'user_phone',
      filterSearch: true,
      filterMode: 'menu',
      onFilter: (value, record) => record.user_phone.includes(value),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      filters: [
        {
          text: TransactionStatus['WAIT_FOR_APPROVE'],
          value: 'WAIT_FOR_APPROVE',
        },
        {
          text: TransactionStatus['APPROVED'],
          value: 'APPROVED',
        },
        {
          text: TransactionStatus['SUCCESSFUL'],
          value: 'SUCCESSFUL',
        },
        {
          text: TransactionStatus['CANCEL'],
          value: 'CANCEL',
        }
      ],
      defaultFilteredValue : ['WAIT_FOR_APPROVE', 'APPROVED',"SUCCESSFUL","CANCEL"],
      onFilter: (value, record) => {
        return record.status && record.status.indexOf(value) === 0
      },
      render: (v, record) => TransactionStatus[record.status],
      width: '10%'
    },
    {
      title: 'Action',
      align: 'center',
      render: (_v, records) => (
        <Row style={{display: 'flex', justifyContent: 'center'}}>
          <Button type='primary' icon={<EyeOutlined />} onClick={() => onClickOpenModal("view", records)}> Xem chi tiết</Button>
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
      const response = await adminApi.getAllTransaction();
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
    getCategoryList();
  }, []);

  const onClickOpenModal = (action, item = null) => {
    console.log(item)
    setAction(action);
    setItem(item?.id);
    setVisible(true);
  }

  const handleChangeTable = event => {
    setPage(event.current)
  }

  const memoForm = useMemo(() => <ViewTranssaction value={item} visible={visible} cancel={(e) => setVisible(false)} action={action}  getList={() => getCategoryList()}/>, [visible, item])

  return (
    <>
      {isLoading && action !== 'view'  ? (
        <Spin className="trans-center" tip="Đang lấy danh sách ..." />
      ) : (
        <div style={{ padding: '10px 10px 10px 10px' }}>
          <Input style={{width: '300px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Nhập tên, email hoặc số điện thoại"/>
          <br></br>
          <br></br>
          {memoForm}
          <Table
            columns={columns}
            dataSource={dataColumn.filter(ele => searchValue.trim() === '' || (ele.user_phone && ele.user_phone.includes(searchValue)) || (ele.user.full_name && ele.user.full_name.includes(searchValue)) || (ele.user_email && ele.user_email.includes(searchValue)))}
            onChange={handleChangeTable}
            pagination={{ showLessItems: true, position: ['bottomCenter'], pageSize: 10, current: page }}
          />
        </div>
      )}
    </>
  );
}

export default TransactionList;
