import PropTypes from 'prop-types';
import React, {
  useEffect,
  useState
} from 'react';
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import './index.scss'
import productApi
  from "../../../apis/productApi";

function MenuFilter() {

  const [menu, setMenu] = useState();

  // lấy category
  useEffect(() => {
    let isSubscribe = true;
    async function getAllCategory() {
      try {
        const response = await productApi.getCategory();
        if (response && isSubscribe) {
          const res  = response.data;
          const menuList = []
          for (const d of res.data) {
            const a = {to: "/filter?catId="+d.name,
              title: d.name}
            menuList.push(a)
          }
          setMenu(menuList);
        }
      } catch (error) {
        console.log(false);
      }
    }
    getAllCategory().then(r => console.log(true));
    return () => (isSubscribe = false);
  },[]);

  function renderFilterMenu(list) {
    return (
      list &&
      list.map((item) => {
        return (
        <Menu>
          <Menu.Item key="mail">
              <Link to={item.to} className="d-flex align-i-center">
                  <span className="title">{item.title}</span>
              </Link>
          </Menu.Item>
        </Menu>
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
