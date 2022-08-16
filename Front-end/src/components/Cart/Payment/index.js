import { Button } from 'antd';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React from 'react';
import axiosClient
  from "../../../apis/axiosClient";


function CartPayment(props) {
  const { carts, transportFee } = props;
  // giá tạm tính
  const tempPrice = carts.reduce(
    (a, b) => a + ((b.price) * b.amount),
    0,
  );

  const countDiscount = (a, b) => {
      let dis = b.discounts ? b.discounts.find(ele => (new Date()).getTime() >=
        (new Date(ele.startDate)).getTime() && (new Date()).getTime() <= (new Date(ele.endDate)).getTime()) : null
      return a + ((b.price * (dis ? dis.discount : 0)) / 100) * b.amount
  }

  // tổng khuyến mãi
  const totalDiscount = carts.reduce(
    countDiscount,
    0
  );

  // giá thật
  const price = tempPrice - totalDiscount + transportFee
  const pricePaypal = (price/23000).toFixed(2)

  const handlePayment = async () => {
    const data = await axiosClient.post("/payment/checkout?sum=" + pricePaypal);
    window.location.href = data.data.redirect_url;
  }

  // rendering ...
  return (
    <div className="Payment bg-white p-16">
      <h2 className="m-b-8">Tiến hành thanh toán</h2>
      <div className="d-flex justify-content-between m-b-6">
        <span className="font-size-16px" style={{ color: '#aaa' }}>
          Tạm tính
        </span>
        <b>{helpers.formatProductPrice(tempPrice)}</b>
      </div>
      <div className="d-flex justify-content-between m-b-6">
        <span className="font-size-16px" style={{ color: '#aaa' }}>
          Phí vận chuyển
        </span>
        <b>{helpers.formatProductPrice(transportFee)}</b>
      </div>
      <div className="d-flex justify-content-between m-b-6">
        <span className="font-size-16px" style={{ color: '#aaa' }}>
          Giảm giá
        </span>
        <b>{helpers.formatProductPrice(totalDiscount)}</b>
      </div>
      <div className="d-flex justify-content-between">
        <span className="font-size-16px" style={{ color: '#aaa' }}>
          Thành tiền
        </span>
        <b style={{ color: 'red', fontSize: 20 }}>
          {helpers.formatProductPrice(price)}
        </b>
      </div>
      <div className="t-end">
        <span
          style={{ color: '#aaa', fontSize: 16 }}>~ {pricePaypal} USD</span>
      </div>

        {/*<Link to={constants.ROUTES.PAYMENT}>*/}
          <Button
            onClick={() => handlePayment()}
            className="m-t-16 d-block m-lr-auto w-100"
            type="primary"
            size="large"
            style={{ backgroundColor: '#3555c5', color: '#fff' }}>
            THANH TOÁN
          </Button>
        {/*</Link>*/}
    </div>
  );
}

CartPayment.defaultProps = {
  carts: [],
  isCheckout: false, // cờ kiểm tra có phải ở trang checkout để lập đơn hàng hay k
  transportFee: 0,
  isLoading: false,
};

CartPayment.propTypes = {
  carts: PropTypes.array,
  isCheckout: PropTypes.bool,
  transportFee: PropTypes.number,
  onCheckout: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default CartPayment;
