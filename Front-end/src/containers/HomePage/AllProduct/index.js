import { Col, Pagination, Row, Spin } from 'antd';
import productApi from 'apis/productApi';
import ProductView from 'components/ProductView';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {baseURL} from "../../../apis/axiosClient";

function AllProduct() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // lấy sản phẩm
  useEffect(() => {
    let isSubscribe = true;
    setIsLoading(true);
    async function getAllProducts() {
      try {
        const response = await productApi.getAllProducts(page-1, 8);
        if (response && isSubscribe) {
          const { data, metadata } = response.data;
          setList(data);
          setTotal(metadata.total);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }

    getAllProducts();

    return () => (isSubscribe = false);
  }, [page]);

  // fn: Hiển thị sản phẩm
  const showProducts = (list) => {
    list = list ? list : [];
    return list.map((product, index) => {
      const { image, name, price, discount, quantity, id } = product;
      return (
        <Col key={index} span={24} sm={12} lg={8} xl={6}>
          <Link to={`/product/${id}`}>
            <ProductView
              className="m-auto"
              name={name}
              price={price}
              stock={quantity}
              avtUrl={baseURL + image}
              discount={discount}
              height={400}
            />
          </Link>
        </Col>
      );
    });
  };

  return (
    <Row className="p-16" style={{ minHeight: 400 }} gutter={[16, 16]}>
      <Col span={24}>
        <h2 className="font-weight-700">Tất cả sản phẩm</h2>
        <div className="underline-title"></div>
      </Col>
      {isLoading ? (
        <Spin
          className="trans-center"
          tip="Đang tải sản phẩm ..."
          size="large"
        />
      ) : (
        <>
          {showProducts(list)}
          <Col span={24}>
            <Pagination
              className="t-center"
              current={page}
              pageSize={8}
              total={total}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </Col>
        </>
      )}
    </Row>
  );
}

export default AllProduct;
