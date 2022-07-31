import { CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Col, Image, InputNumber, message, Rate, Row } from 'antd';
import ImgLoadFailed from 'assets/imgs/loading-img-failed.png';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cartActions from 'reducers/carts';
import './index.scss';
import {baseURL} from "../../../apis/axiosClient";

// // Hàm đếm số sản phẩm đó trong giỏ hàng
// function countItemInCart(productCode, carts) {
//   let count = 0;
//   if (carts) {
//     carts.forEach((item) => {
//       if (item.code === productCode) count += item.amount;
//     });
//   }
//   return count;
// }

function ProductOverview(props) {
  const { products } = props;
  console.log(products.products)
  const { id, name, detail, price, image, category, discounts, imageList, quantity, description } = products.products;
  const imageLists = imageList.split(",");
  const fullImage = [image, ...imageLists]
  const targetDiscount =  discounts ? discounts.find(ele => (new Date()).getTime() >= (new Date(ele.startDate)).getTime() && (new Date()).getTime() <= (new Date(ele.endDate)).getTime()) : null;

  // const rateTotal = rate.reduce((a, b) => a + b, 0);
  const priceAfter = price - (targetDiscount ? ((price * targetDiscount.discount) / 100) : 0);
  // const rateAvg = helpers.calStar(rate);

  const [numOfProduct, setNumberOfProduct] = useState(1);
  const [avtIndex, setAvtIndex] = useState(0);
  // const carts = useSelector((state) => state.carts);
  // const currentStock = quantity - countItemInCart(code, carts);

  const dispatch = useDispatch();

  // fn: hiên thị danh sách hình ảnh sp
  const showCatalogs = (catalog) => {
    return catalog.map((item, index) => (
      <Image
        key={index}
        src={baseURL+item}
        width={48}
        className={`catalog-item p-8 ${index === avtIndex ? 'active' : ''}`}
        onMouseEnter={() => setAvtIndex(index)}
      />
    ));
  };

  // fn: Thêm vào giỏ hàng
  const addCart = () => {
    let product = {
      // code,
      // name,
      // price,
      // amount: numOfProduct,
      // avt,
      // discount,
      // stock,
      // _id,
    };
    setNumberOfProduct(1);
    dispatch(cartActions.addToCart(product));
    message.success('Thêm vào giỏ hàng thành công');
  };

  // rendering ...
  return (
    <Row className="Product-Overview bg-white p-16">
       {/*Hình ảnh và thông số cơ bản sản phẩm */}
      <Col span={24} md={8}>
        <div
          style={{ height: 268 }}
          className="d-flex align-i-center justify-content-center ">
          <Image
            style={{ maxHeight: '100%' }}
            fallback={ImgLoadFailed}
            src={baseURL+fullImage[avtIndex]}
          />
        </div>
        <div className="d-flex w-100 bg-white p-b-16 p-t-8">
          {showCatalogs(fullImage)}
        </div>
      </Col>

      {/* Tên và thông tin cơ bản */}
      <Col span={24} md={16} className="p-l-16">
        {/* Tên sp */}
        <h2 className="font-size-24px ">
          {helpers.reduceProductName(name, 140)}
        </h2>

        {/* Đánh giá sản phẩm */}
        {/*<div className="p-tb-8">*/}
        {/*  <Rate disabled defaultValue={rateAvg} allowHalf />*/}
        {/*  <a href="#evaluation" className="m-l-8">*/}
        {/*    (Có {rateTotal} đánh giá)*/}
        {/*  </a>*/}
        {/*</div>*/}

        {/* Giá */}
        <h1 className="product-price font-weight-700 p-tb-8">
          {price === 0 ? 'Liên hệ' : helpers.formatProductPrice(price)}
        </h1>
        { targetDiscount !== undefined && price > 0 && (
          <>
            <h3 className="font-weight-700" style={{ color: '#333' }}>
              Bạn có 1 mã giảm giá {targetDiscount.discount}% cho sản phẩm này
            </h3>
            <div className="d-flex flex-direction-column m-t-8 m-b-16 p-tb-8 p-lr-16 discount">
              <span className="discount-price font-size-16px font-weight-700">
                Giá: {helpers.formatProductPrice(priceAfter)}
              </span>
              <span>
                Đã giảm thêm: {helpers.formatProductPrice(price - priceAfter)}
                &nbsp;
                <span className="discount-decr"></span>
              </span>
              <div className="discount-mark"></div>
              <CheckOutlined className="discount-mark-icon" />
            </div>
          </>

        )}
        <h3>
          Còn lại: {quantity} sản phẩm
        </h3>
        {/* Chọn số lượng */}
        <div className="p-t-12 option">
          {quantity === 0 ? (
            <h3 className="m-r-8 m-t-8 font-size-18px" style={{ color: 'red' }}>
              <i>Sản phẩm hiện đang hết hàng !</i>
            </h3>
          ) : (
            <>
              <h3 className="m-r-8 m-t-8 font-size-16px">Chọn số lượng: </h3>
              <InputNumber
                name="numOfProduct"
                size="middle"
                value={numOfProduct}
                min={1}
                max={quantity}
                onChange={(value) => setNumberOfProduct(value)}
              />
            </>
          )}
        </div>

        {/* Button*/}
        {price > 0 && quantity > 0 ? (
          <div className="btn-group p-tb-16 d-flex justify-content-around">
            <Button
              onClick={addCart}
              disabled={quantity ? false : true}
              size="large"
              className="m-r-16 w-100 btn-group-item"
              style={{ backgroundColor: '#3555c5' }}>
              THÊM GIỎ HÀNG
            </Button>
          </div>
        ) : (
          <Button
            size="large"
            className="m-tb-16 w-100 btn-group-item"
            style={{ backgroundColor: '#3555c5' }}>
            <a href="https://fb.com/" target="blank">
              <PhoneOutlined style={{ fontSize: 18 }} className="m-r-8" /> LIÊN
              HỆ
            </a>
          </Button>
        )}
      </Col>
    </Row>
  );
}

ProductOverview.propTypes = {
  products: PropTypes.object,
};

export default ProductOverview;
