import { Avatar, Button, Comment, Rate } from 'antd';
import constants from 'constants/index';
import helpers from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function UserComment(props) {
  const { comment } = props;
  console.log(JSON.stringify(comment)+"comment")
  const {time , name , number_star, content} = comment;
  const isReduceCmt = content.length >= 200 ? true : false;
  const [isMore, setIsMore] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState(false);
  // rendering ...
  return (
    <>
      {/* đăng nhập để nhận xét */}
      {loginRedirect && <Redirect to="/login" />}

      {/* Comment */}
      <Comment
        author={<b className="font-size-14px">{name}</b>}
        avatar={
          <Avatar
            src={ constants.DEFAULT_USER_AVT}
            alt={name}
          />
        }
        content={
          <>
            {number_star !== -1 && (
              <>
                <Rate
                  defaultValue={number_star + 1}
                  disabled
                  style={{ fontSize: 14 }}
                />
                <h3>{helpers.convertRateToText(number_star)}</h3>
              </>
            )}

            <p className="t-justify">
              {isMore ? content : content.slice(0, 200)}
              {isReduceCmt && (
                <Button type="link" onClick={() => setIsMore(!isMore)}>
                  {isMore ? 'Thu gọn' : 'Xem thêm'}
                </Button>
              )}
            </p>
          </>
        }
        datetime={<span>{helpers.formatDate(time)}</span>}
      />
    </>
  );
}

UserComment.propTypes = {
  comment: PropTypes.object,
};

export default UserComment;
