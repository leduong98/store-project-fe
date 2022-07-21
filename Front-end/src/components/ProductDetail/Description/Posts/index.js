import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';

function Posts(props) {
  const { content } = props;

  return (
    <>
      {content == null ? (
        <h3 className="m-t-16">Thông tin đang được cập nhật</h3>
      ) : (
        <div>
          <br></br>
          {ReactHtmlParser(content)}`
        </div>)}
    </>
  );
}

Posts.propTypes = {
  content: PropTypes.object,
};

export default Posts;
