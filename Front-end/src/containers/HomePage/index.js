import { BackTop, Col, Row } from 'antd';
import React from 'react';
import AllProduct from './AllProduct';
import FamousBrand from './FamousBrand';
import './index.scss';
import SaleOff from './SaleOff';
import MenuFilter
  from "../../components/Filter/MenuFilter";

function HomePage() {
  // kéo về đầu trang
  document.querySelector('body').scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  return (
    <div className="Home">
      {/* Carousel cho sale off */}
      <div className="pos-relative">
        <SaleOff />
      </div>

      <Row className="container">
        <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
          <MenuFilter />
        </Col>

        {/* Thương hiệu nổi bật */}
        <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
          <FamousBrand />
        </Col>


        {/* Tổng hợp sản phẩm */}
        <Col span={24} className="m-b-32 bg-white box-sha-home bor-rad-8">
          <AllProduct />
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
