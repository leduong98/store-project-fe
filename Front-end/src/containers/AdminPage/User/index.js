import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Popconfirm, Row, Spin, Table } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useMemo, useState } from 'react';
import { TransactionStatusUser } from '../../../constants/extend_constant';
import UserDetail from '../User/UserDetail';


function UserList() {
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
      dataIndex: 'full_name',
      width: '20%'
    },
    {
      title: 'Email',
      key: 'email',
      align: 'center',
      dataIndex: 'email',
      filterSearch: true,
      filterMode: 'menu',
      onFilter: (value, record) => record.user_email.includes(value),
      width: '30%'
    },
    {
      title: 'Số điện thoại',
      key: 'phone',
      align: 'center',
      dataIndex: 'phone',
      filterSearch: true,
      filterMode: 'menu',
      onFilter: (value, record) => record.phone.includes(value),
      width: '20%'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      filters: [
        {
          text: TransactionStatusUser['ACTIVE'],
          value: 'ACTIVE',
        },
        {
          text: TransactionStatusUser['NOT_ACTIVE'],
          value: 'NOT ACTIVE',
        }
      ],
      defaultFilteredValue:  ['ACTIVE'],
        onFilter: (value, record) => {
          return record.status && record.status.indexOf(value) === 0
        },
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

  const onClickOpenModal = (action, item = null) => {
    setAction(action);
    setItem(item);
    setVisible(true);
  }

  async function getUserList() {
    try {
      setIsLoading(true);
      const response = await adminApi.getUserList();
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
    getUserList();
  }, []);

  return (
    <>
      {isLoading && action !== 'view'  ? (
        <Spin className="trans-center" tip="Đang lấy danh sách ..." />
      ) : (
        <div style={{ padding: '10px 10px 10px 10px' }}>
          <Input style={{width: '300px'}} value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder="Nhập tên, email hoặc số điện thoại"/>
          <br></br>
          <br></br>
          <UserDetail value={item} visible={visible} onCancel={e => setVisible(false)}/>
          <Table
            columns={columns}
            dataSource={dataColumn.filter(ele => searchValue.trim() === '' || (ele.phone && ele.phone.includes(searchValue)) || (ele.full_name && ele.full_name.includes(searchValue)) || (ele.email && ele.email.includes(searchValue)))}
            pagination={{ showLessItems: true, position: ['bottomCenter'], pageSize: 10, current: page }}
          />
        </div>
      )}
    </>
  );
}

export default UserList;
