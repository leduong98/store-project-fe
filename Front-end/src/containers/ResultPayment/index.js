import React, {
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from "react-redux";
import axiosClient
  from "../../apis/axiosClient";
import cartReducer
  from "../../reducers/carts";
import {
  Button,
  Result,
  Spin
} from "antd";
import constants
  from "../../constants";


function PaymentSuccess (props){
  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);
  const [isCheck, setCheck] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();


  // event: Xoá tất cả sản phẩm trong cart
  const onDelAllCarts = () => {
    dispatch(cartReducer.resetCart());
  };

  useEffect( ()  => {

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      if (user.id && !(carts.length == 0)) {
        const data = {
          email: user?.email,
          phone: user?.phone,
          address: user?.address,
          payment: 'ONLINE',
          payment_info: 'Thanh toán đơn hàng',
          json_type: 'transaction',
          orders: carts.map(function(ele){
              const a = ele.discounts ? ele.discounts.find(ele => (new Date()).getTime() >=
                (new Date(ele.startDate)).getTime() && (new Date()).getTime() <= (new Date(ele.endDate)).getTime()) : null
              const b = a ? a.discount.id : null
              return {
                quantity: ele.amount,
                product_id: ele.id,
                discount_id: b
              }
            }
           ,null)
        }
       axiosClient.post('/order', data).then(res => {
          setCheck(true);
         onDelAllCarts()
        }).catch()
      }
  }, [user,carts])

  const handleBackHome = () =>{
    window.location.href = constants.ROUTES.HOME
  }

  return (
    <>
      {
        isLoading ? (
            <Spin
              className="trans-center"
              tip="Vui Lòng Đợi ..."
              size="large"
            />
          ) :
        isCheck ? <Result
        status="success"
        title="Thanh Toán Thành Công!"
        extra={[
          <Button type="primary" key="console" onClick={handleBackHome}>
            Về Trang Chủ
          </Button>,
        ]}
      /> :  <Result
        status="warning"
        title="Thanh Toán Thất Bại!"
        extra={
          <Button type="primary" key="console" onClick={handleBackHome}>
            Về Trang Chủ
          </Button>
        }
      />}
    </>
  )
}

export default PaymentSuccess;