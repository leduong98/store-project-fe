import productApi from 'apis/productApi';
import GlobalLoading from 'components/Loading/Global';
import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ProductDetail
  from "../../components/ProductDetail";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isNotFoundProduct, setIsNotFoundProduct] = useState(false);

  // lấy sản phẩm
  useEffect(() => {
    let isSubscribe = true;
    const getProduct = async (id) => {
      try {
        const result = await productApi.getProduct(id);
        if (result && isSubscribe) {
          const data  = result.data;
          console.log(JSON.stringify(data)+"data")
          setProduct(data);
        }
      } catch (error) {
        if (isSubscribe) setIsNotFoundProduct(true);
      }
    };
    getProduct(productId);
    if (isSubscribe) setProduct(null);

    return () => (isSubscribe = false);
  }, [productId]);

  return (
    <>
      {product ? (
        <ProductDetail products={product} />
      ) : (
        <GlobalLoading content="Đang tải sản phẩm ..." />
      )}
      {isNotFoundProduct && <Redirect to="/not-found" />}
    </>
  );
}

export default ProductDetailPage;
