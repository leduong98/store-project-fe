import { Carousel } from 'antd';
import React, {useEffect, useState } from 'react';
import './index.scss';
import adminApi from 'apis/adminApi';
import {baseURL} from "../../../apis/axiosClient";


function SaleOff() {

  const [data, setDataColumn] = useState([]);

  async function getSlideList() {
    const response = await adminApi.getSlideList();
    if (response) {
      const { data } = response.data;
      console.log(data)
      setDataColumn(data.filter(ele => ele.status))
    }
}

useEffect(() => {
  getSlideList();
}, []);

  return (
    <Carousel className="Sale-Off" autoplay>
      {data.map((value, index) => (
        <img className="Sale-Off-img" src={baseURL + value.link} key={index} />
      ))}
    </Carousel>
  );
}

export default SaleOff;
