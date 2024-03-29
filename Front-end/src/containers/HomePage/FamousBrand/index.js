import { Col, Row } from 'antd';
import React from 'react';
import './index.scss';

// fn: hiển thị danh sách thương hiệu
function showBrandList(list) {
  return list.map((item, index) => (
    <Col span={12} md={6} key={index}>
      <div className="brand-item t-center">
        <a href={item.link} target="blank">
          <img className="bor-rad-8" width="50%" src={item.src} alt="Photo" />
        </a>
        <h4 className="font-size-18px">{item.title}</h4>
        <span className="font-size-16px">{item.desc}</span>
      </div>
    </Col>
  ));
}

// danh sách thương hiệu
const list = [
  {
    link: 'https://www.apple.com/vn/',
    src:
      'https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2023/02/01/1111.png',
    title: 'Apple'
  },
  {
    link: 'https://www.samsung.com/vn/',
    src:
      'https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/02/09/image-removebg-preview-11.png',
    title: 'Samsung'
  },
  {
    link: 'https://www.mi.com/global',
    src:
      'https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2022/03/17/image-removebg-preview-5.png',
    title: 'Xiaomi'
  },
  {
    link: 'https://www.nokia.com/',
    src:
      'https://cdn.hoanghamobile.com/i/productlist/ts/Uploads/2021/06/21/image-removebg-preview-9.png',
    title: 'Nokia'
  },
];

// rendering ...
function FamousBrand() {
  return (
    <div className="p-16 Famous-Brand">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2 className="font-weight-700">Thương hiệu nổi bật</h2>
          <div className="underline-title"></div>
        </Col>
        {showBrandList(list)}
      </Row>
    </div>
  );
}

export default FamousBrand;
