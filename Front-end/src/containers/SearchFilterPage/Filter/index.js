import { Button, Pagination, Spin, Tag } from 'antd';
import productApi from 'apis/productApi';
import ResultSearch from 'components/ResultSearch';
import helpers from 'helpers';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.scss';

// fn: main
function FilterResult() {
  // get query param
  const search = useLocation().search;
  const query = helpers.queryString(search);
  // keyword search
  let keyword = query.find((item) => item.hasOwnProperty('catId'));
  let keywordValue = '';
  if (keyword !== undefined)
    keywordValue = decodeURI(keyword.catId.replace(/[+]/gi, ' '));
  // const queryList = queryStrList.filter((item) => {
  //   //  type
  //   if (Object.keys(item)[0] === 't') {
  //     if (isNaN(parseInt(item.t))) type = 0;
  //     else type = parseInt(item.t);
  //     return false;
  //   }
  //   return true;
  // });
  // const { dOption, pOption } = analysisQueryList(queryList);
  // state pagination
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // fn: filter function
  async function getFilterProducts(currentPage, isSubscribe) {
    try {
      setIsLoading(true);
      const productList = await productApi.getSearchProducts(
        null,
        currentPage,
        12,
        keywordValue
      );
      if (productList && isSubscribe) {
        const { data, metadata } = productList.data;
        setList(data);
        setTotal(metadata.total);
        setIsLoading(false);
      }
    } catch (error) {
      setTotal(0);
      setIsLoading(false);
      setList([]);
    }
  }

  // event: Lấy dữ liệu tìm kiếm
  useEffect(() => {
    let isSubscribe = true;
    setIsLoading(true);
    if (page !== 0) setPage(0);
    getFilterProducts(0, isSubscribe);
    // clean up
    return () => {
      isSubscribe = false;
    };
  }, [search]);

  // event: Lấy dữ liệu tìm kiếm khi đổi trang
  useEffect(() => {
    let isSubscribe = true;
    getFilterProducts(page, isSubscribe);
    // clean up
    return () => {
      isSubscribe = false;
    };
  }, [page]);

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      {/* Carousel */}
      {/* Số  kết quả tìm kiếm */}
      {!isLoading && (
        <h2 className="font-size-24px m-b-12">
          Tìm được <b>{total}</b> sản phẩm
        </h2>
      )}

      {/* loading */}
      {isLoading ? (
        <Spin
          className="trans-center"
          tip="Đang tìm kiếm sản phẩm phù hợp ..."
          size="large"
        />
      ) : (
        <>

          {/* Kết quả lọc, tìm kiếm */}
          <ResultSearch initList={list} />

          {/* pagination */}
          {total > 0 && (
            <Pagination
              className="m-tb-16 t-center"
              total={total}
              current={page}
              showSizeChanger={false}
              pageSize={12}
              onChange={(p) => setPage(p-1)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default FilterResult;
