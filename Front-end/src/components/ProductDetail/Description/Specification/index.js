import PropTypes from 'prop-types';
import React from 'react';
import './index.scss';
import { Space, Table, Tag } from 'antd';

const columns = [
  {
    title: 'Thuộc tính',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Giá Trị',
    dataIndex: 'value',
    key: 'value',
  }
];

// rendering ...
function Specification(props) {
  const { data } = props;
  return (
    <div>
      <Table dataSource={JSON.parse(data)} columns={columns} pagination={false}/>
    </div>
  );
}

Specification.propTypes = {
  data: PropTypes.object,
};

export default Specification;
