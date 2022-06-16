import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss'

const menu = [
  {
    key: 0,
    to: '/filter?t=0',
    title: 'Camera Trong Nhà',
  },
  {
    key: 1,
    to: '/filter?t=1',
    title: 'Camera Mini',
  },
  {
    key: 4,
    to: '/filter?t=4',
    title: 'Camera Ngoài Trời',
  },
  {
    key: 9,
    to: '/filter?t=9',
    title: 'Camera 360',
  },
  {
    key: 2,
    to: '/filter?t=2',
    title: 'Camera Dùng Pin',
  },
];

function MenuFilter() {

  function renderFilterMenu(list) {
    return (
      list &&
      list.map((item, index) => {
        return (
          <div
            key={index}
            className="w-100 p-lr-8 p-tb-4  Filter-menu-item">
            <Link to={item.to} className="d-flex align-i-center">
              <span className="title">{item.title}</span>
            </Link>
          </div>
        );
      })
    );
  }

  return (
    <div className="bor-rad-8 Filter-menu p-tb-4">{renderFilterMenu(menu)}</div>
  );
}

MenuFilter.propTypes = {
  onShow: PropTypes.func,
};

export default MenuFilter;
