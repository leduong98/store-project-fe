import React, {
  useEffect,
  useState
} from 'react';
import {useSelector} from "react-redux";
import axiosClient
  from "../../apis/axiosClient";
import {useLocation} from "react-router-dom";
import helpers from 'helpers';


function PaymentSuccess (props){
  const user = useSelector((state) => state.user);
  console.log(JSON.stringify(user))
  const carts = useSelector((state) => state.carts);
  const search = useLocation().search;
  const query = helpers.queryString(search);
  const [isLoading, setLoading] = useState(true);
  console.log(query)
  console.log(carts)
  console.log(user)
  useEffect(() => {
      if (user.id && !carts.isEmpty) {
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
          setLoading(false);
          console.log('thanh toasn thanh cong')
        }).catch(err => console.log('thanh toasn tahajt bao'))
      }
  }, [user, carts])
  return (
    <>
      {isLoading && <div>aaaaaa</div>}
    </>
  )
}

export default PaymentSuccess;