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
import {useLocation} from "react-router-dom";
//////////
// const user = useSelector((state) => state.user);
// console.log(JSON.stringify(user))
// const carts = useSelector((state) => state.carts);
// const search = useLocation().search;
// const query = helpers.queryString(search);
// const [isLoading, setLoading] = useState(true);
// console.log(query)
// console.log(carts)
// console.log(user)
// useEffect(() => {
//   if (user.id && !carts.isEmpty) {
//     const data = {
//       email: user?.email,
//       phone: user?.phone,
//       address: user?.address,
//       payment: 'ONLINE',
//       payment_info: 'Thanh toán đơn hàng',
//       json_type: 'transaction',
//       paymentId: query[0].paymentId,
//       payerId: query[2].PayerID,
//       orders: carts.map(ele => ({
//         quantity: ele.amount,
//         product_id: ele.id,
//         discount_id:  ele.discounts && ele.discounts.length > 0 ? ele.discounts[0].id : null
//       }))
//     }
//     axiosClient.post('/order', data).then(res => {
//       setLoading(false);
//       console.log('thanh toasn thanh cong')
//     }).catch(err => console.log('thanh toasn tahajt bao'))
//   }
// }, [user, carts])
////////////

function PaymentSuccess (props){
  const user = useSelector((state) => state.user);
  const carts = useSelector((state) => state.carts);
  const search = useLocation().search;
  const query = helpers.queryString(search);
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
          paymentId: query[0].paymentId,
          payerId: query[2].PayerID,
          orders: carts.map(ele => ({
            quantity: ele.amount,
            product_id: ele.id,
            discount_id:  ele.discounts && ele.discounts.length > 0 ? ele.discounts[0].id : null
          }))
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