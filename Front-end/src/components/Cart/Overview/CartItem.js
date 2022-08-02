import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, InputNumber, Tooltip } from 'antd';
import helpers from 'helpers';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {baseURL} from "../../../apis/axiosClient";

function CartItem(props) {
  const {
    id,
    name,
    image,
    quantity,
    discounts,
    price,
    amount,
    index,
    onDelCartItem,
    onUpdateNumOfProd,
  } = props;
  console.log(JSON.stringify(discounts)+"dícoutttttttttttttttttt")
  return (
    <div className="d-flex bg-white p-12 bor-rad-4 justify-content-between">
      {/* sản phẩm */}
      <div className="d-flex flex-grow-1">
        <Avatar src={baseURL+image} alt="Photo" shape="square" size={64} />
        <div className="d-flex flex-direction-column p-10 ">
          <Link to={`/product/${id}`} className="font-size-16px">
            <Tooltip title={name}>
              {helpers.reduceProductName(name, 20)}
            </Tooltip>
          </Link>
        </div>
        <div className="d-flex flex-direction-column p-10">
          <span>Số lượng: {amount}</span>
        </div>
      </div>
      {/*  Thêm giảm sản phẩm */}
      <div style={{ display: 'flex', justifyContent :'space-between' }}>
        <div
          className="d-flex flex-direction-column align-i-end"
          style={{ flexBasis: 200 }}>
          <b className="font-size-18px" style={{ color: '#3555C5' }}>
            {helpers.formatProductPrice(price)}
          </b>
          <span style={{ textDecoration: 'line-through', color: '#aaa' }}>
                {helpers.formatProductPrice(price + (price * (discounts.length != 0 ? discounts[0].discount : 0)) / 100)}
              </span>
        </div>
        <div className="d-flex align-i-center" style={{ flexBasis: 128 , marginLeft : 25}}>
          <DeleteOutlined
            className="m-r-18 icon-del-item"
            onClick={() => onDelCartItem(index)}
          />
        </div>
      </div>

    </div>
  );
}

CartItem.defaultProps = {
  id: '',
  image: '',
  discounts: 0,
  name: '',
  price: 0,
  quantity: 0,
  amount: 1,
};


export default CartItem;
