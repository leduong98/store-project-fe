import commentApi from 'apis/commentApi';
import React, { useEffect, useState } from 'react';
import EvaluationView
  from "../../../components/ProductDetail/Evaluation";

function Evaluation(props) {
  const { productId } = props;
  const [cmtList, setCmtList] = useState([]);

  useEffect(() => {
    let isSubscribe = true;
    async function getCommentList() {
      try {
        const response = await commentApi.getCommentList(productId);
        if (response && isSubscribe) {
          setCmtList(response.data);
        }
      } catch (error) {}
    }
    getCommentList();

    return () => (isSubscribe = false);
  }, [props]);

  // rendering...
  return (
    <EvaluationView productId={productId}  cmtList={cmtList} />
  );
}

Evaluation.defaultProps = {};

export default Evaluation;
