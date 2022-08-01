import { HomeOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Description from './Description';
import './index.scss';
import ProductOverview from './Overview';
import ProductPolicy from './Policy';
import Evaluation
  from "../../containers/ProductDetailPage/Evaluation";

function ProductDetail(props) {
  const products = props;
  const { id, name, detail, price, image, category, discounts, imageList, quantity, description } = products.products;
  console.log(JSON.stringify(name)+"----------------")
  // rendering...
  return (
    <div className="Product-Detail-View container m-t-20">
      <Row gutter={[16, 32]}>
        {/* Hiển thị đường dẫn trang */}
        <Col span={24} className="d-flex page-position">
          <Link to="/">
            <HomeOutlined className="p-12 icon-home font-size-16px bg-white" />
          </Link>
          <span className="r-arrow p-lr-8 font-weight-500">{`>`}</span>
          <span className="pro-name p-8 font-weight-500 bg-white">{name}</span>
        </Col>

        {/* Thông tin cơ bản của sản phẩm */}
        <Col span={24} md={18}>
          <ProductOverview products={products} />
        </Col>

        {/* Chính sách */}
        <Col span={24} md={6}>
          <ProductPolicy />
        </Col>

        {/* Mô tả chi tiết sản phẩm */}
        <Col span={24}>
          <Description
            specification={detail}
            desc={description}
          />
        </Col>

        {/* Nhận xét của khách hàng */}
        <Col span={24} id="evaluation">
          <Evaluation productId={id} />
        </Col>

      {/*  /!* danh sách sản phẩm tương tự *!/*/}
      {/*  <Col span={24}>*/}
      {/*    <RelatedProduct*/}
      {/*      title="Sản phẩm tương tự"*/}
      {/*      type={type}*/}
      {/*      brand={brand}*/}
      {/*      id={_id}*/}
      {/*    />*/}
      {/*  </Col>*/}
      </Row>
    </div>
  );
}

ProductDetail.propTypes = {
  products: PropTypes.object,
};

export default ProductDetail;
