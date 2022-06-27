import { Col, Row } from 'antd';
import React from 'react';
import './index.scss';

// fn: hiển thị danh sách thương hiệu
function showBrandList(list) {
  return list.map((item, index) => (
    <Col span={12} md={6} key={index}>
      <div className="brand-item t-center">
        <a href={item.link} target="blank">
          <img className="bor-rad-8" width="100%" src={item.src} alt="Photo" />
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
    link: 'https://www.dahuasecurity.com/',
    src:
      'https://digione.vn/upload/source/camera-wifi-khong-day-yoosee-3-rau-hd1080-20m-xoay-36o-digione/camera-wifi-yoosee-3-rau-1080p-digione-22.jpg',
    title: 'Dahuase',
    desc: 'Nhãn hiệu camera lớn'
  },
  {
    link: 'https://camerayoosee.com/',
    src:
      'https://camerayoosee.vn/wp-content/uploads/2020/12/yosee-999-rw-720p.jpg',
    title: 'Yoosee',
    desc: 'Nhãn hiệu camera lớn'
  },
  {
    link: 'https://miviet.com/camera-xiaomi-chinh-hang/',
    src:
      'https://miviet.com/wp-content/uploads/2022/03/miviet.com-camera-ip-giam-sat-imilab-c20-hd-1080p-imilab-c20.webp',
    title: 'Xiaomi',
    desc: 'Nhãn hiệu camera lớn'
  },
  {
    link: 'https://ezviz.vn/danh-muc-san-pham/camera-an-ninh/camera-wifi-trong-nha',
    src:
      'https://digione.vn/upload/source/camera-ip-wifi-ezviz-cs-c1c-b-1080p-h265-digione/camera-ip-wifi-ezviz-cs-c1c1-b-1080p-digione-27.jpg',
    title: 'Ezviz',
    desc: 'Nhãn hiệu camera lớn'
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
