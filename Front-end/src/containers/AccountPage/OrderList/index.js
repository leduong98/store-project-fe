import { Button, Spin, Table, Tooltip } from 'antd';
import orderApi from 'apis/orderApi';
import helpers from 'helpers';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const user = useSelector((state) => state.user);

  // các cột cho bảng danh sách đơn hàng
  const orderColumns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (orderDate) => orderDate,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'orders',
      key: 'orders',
      render: (orderProd) =>
      {
        const ar = []
          orderProd.forEach((e) => {
            ar.push(e.product.name)
          })
        return ar.join(", ")
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => {
        return helpers.formatProductPrice(value);
      },
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'status',
      key: 'status',
      render: (orderStatus) => helpers.convertOrderStatus(orderStatus),
    },
  ];
  // fn: hiển thị danh sách đơn hàng
  function showOrderList(list) {
    return list && list.length === 0 ? (
      <h3 className="m-t-16 t-center" style={{ color: '#888' }}>
        Hiện tại bạn chưa có đơn hàng nào
      </h3>
    ) : (
      <Table
        columns={orderColumns}
        dataSource={list}
        pagination={{
          pageSize: 4,
          showSizeChanger: false,
          position: ['bottomRight'],
        }}
      />
    );
  }

  // event: Lấy danh sách
  useEffect(() => {
    async function getOrderList() {
      try {
        setIsLoading(true);
        const response = await orderApi.getOrderList();
        if (response) {
          const data = response.data;
          console.log(data,"vao day")
          setOrderList(
            data.map((item, index) => {
              console.log(item, "item")
              return { ...item, key: index };
            }),
          );
          setIsLoading(false);
        }
      } catch (error) {
          setIsLoading(false);
          setOrderList([]);
      }
    }
    if (user) getOrderList();
    return () => {};
  }, [user]);

  console.log(orderList, "orederLisst")

  // rendering ...
  return (
    <>
      {isLoading ? (
        <div className="t-center m-tb-48">
          <Spin tip="Đang tải danh sách đơn hàng của bạn ..." size="large" />
        </div>
      ) : (
        showOrderList(orderList)
      )}
    </>
  );
}

export default OrderList;
