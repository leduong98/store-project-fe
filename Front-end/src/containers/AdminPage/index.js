import {
  ContactsOutlined,
  DashboardOutlined,
  HomeOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  TransactionOutlined,
  SlidersOutlined,
  ImportOutlined,
} from '@ant-design/icons';
import {
  Button,
  Menu,
  message
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import SubMenu from 'antd/lib/menu/SubMenu';
import defaultAvt from 'assets/imgs/default-avt.png';
import logoUrl from 'assets/imgs/logo.png';
import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import './index.scss';
const TransactionList = React.lazy(() => import('./TransactionList'));
const ProductList = React.lazy(() => import('./ProductList'));
const CategoryList = React.lazy(() => import('./CategoryList'));
const SlideList = React.lazy(() => import('./SlideList'));
const UserList = React.lazy(() => import('./User'));
const ImportProductList = React.lazy(() => import('./ImportProductList'));
import {
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import constants
  from "../../constants";
import cartReducer
  from "../../reducers/carts";

const mainColor = '#141428';
const menuList = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    children: [],
  },
  {
    key: 'category',
    title: 'Category',
    icon: <MenuOutlined />,
    children: [],
  },
  {
    key: 'product',
    title: 'Products',
    icon: <ShoppingCartOutlined />,
    children: [],
  },
  {
    key: 'transaction',
    title: 'Transactions',
    icon: <TransactionOutlined />,
    children: [],
  },
  {
    key: 'user',
    title: 'Users',
    icon: <ContactsOutlined />,
    children: [],
  },
  {
    key: 'slide',
    title: 'Slide',
    icon: <SlidersOutlined/>,
    children: [],
  },
  {
    key: 'import',
    title: 'Import',
    icon: <ImportOutlined />,
    children: [],
  },
];

function AdminPage(props) {
  const history = useHistory();
  const match = props.match;
  const user = useSelector((state) => state.user);
  const [keyMenu, setKeyMenu] = useState('d');
  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href.split('/');
    if (url[url.length -1] === ''|| url[url.length -1] === 'admin') {
      setKeyMenu('dashboard');
    } else {
      setKeyMenu(url[url.length -1])
    }
  }, [])
  // fn: Xử lý khi chọn item
  const handleSelected = (e) => {
    const { key } = e;
    setKeyMenu(key);
    history.push('/admin/' + key)
  };

  // fn: Show Title Selected
  const showTitleSelected = (key) => {
    let result = 'Dashboard';
    menuList.forEach((item) => {
      if (item.key === key) result = item.title;
      item.children.forEach((child) => {
        if (child.key === key) result = `${item.title} > ${child.title}`;
      });
    });
    return result;
  };

  // fn: render menu
  const renderMenuItem = () => {
    // return MenuItem if children = null
    return menuList.map((item, index) => {
      const { key, title, icon, children } = item;
      if (children.length === 0)
        return (
          <Menu.Item className="menu-item" key={key} icon={icon}>
            <span className="menu-item-title">{title}</span>
          </Menu.Item>
        );
      // else render SubMenu
      return (
        <SubMenu className="menu-item" key={key} icon={icon} title={title}>
          {children.map((child, index) => (
            <Menu.Item className="menu-item" key={child.key} icon={child.icon}>
              <span className="menu-item-title">{child.title}</span>
            </Menu.Item>
          ))}
        </SubMenu>
      );
    });
  };

  // event: log out
  const onLogout = async () => {
    try {
      message.success('Đăng xuất thành công', 2);
      localStorage.removeItem(constants.ACCESS_TOKEN_KEY);
      localStorage.removeItem("isAuth")
      dispatch(cartReducer.resetCart());
    } catch (error) {
      message.error('Đăng xuất thất bại', 2);
    }
  };


  return (
    <div className="Admin-Page" style={{ backgroundColor: '#e5e5e5' }}>
        <>
          {/* header */}
          <div
            className="d-flex align-i-center"
            style={{ height: '72px', backgroundColor: mainColor }}>
            <div className="logo t-center" style={{ flexBasis: '200px' }}>
              <img width={100} height={48} src={logoUrl} />
            </div>
            <div className="flex-grow-1 d-flex align-i-center">
              <h2 className="t-color-primary flex-grow-1 p-l-44 main-title">
                <span>Admin Page &gt; </span>
                <span className="option-title">
                  {showTitleSelected(keyMenu)}
                </span>
              </h2>
              <a
                href="/"
                className="open-web p-r-24 t-color-primary font-weight-500 p-b-10">
                <HomeOutlined
                  className="icon font-size-28px t-color-primary m-r-10"
                  style={{ transform: 'translateY(3px)' }}
                />
                <span className="open-web-title">Open the website</span>
              </a>
              <div className="user-admin p-r-24 t-color-primary font-weight-500">
                <Avatar size={36} className="m-r-10" src={defaultAvt} />
                <span className="user-admin-title">{user?.full_name}</span>
              </div>
              <Link to='/login'>
                <Button onClick={onLogout} className="m-r-44" type="dashed">
                  Đăng xuất
                </Button>
              </Link>
            </div>
          </div>
          {/* main content */}
          <div className="d-flex">
            {/* menu dashboard */}
            <Menu
              className="menu p-t-24"
              theme="dark"
              onClick={handleSelected}
              style={{
                height: 'inherit',
                minHeight: '100vh',
                backgroundColor: mainColor,
                flexBasis: '200px',
              }}
              selectedKeys={keyMenu}
              mode="inline">
              {renderMenuItem()}
            </Menu>

            {/* main contents */}
            <div className="flex-grow-1">
              <Switch>
                <Route key={"category"} path={`${match.path}/category`} exact={true} component={CategoryList} />
                <Route key={"product"} path={`${match.path}/product`} exact={true} component={ProductList} />
                <Route key={"transaction"} path={`${match.path}/transaction`} exact={true} component={TransactionList} />
				        <Route key={"user"} path={`${match.path}/user`} exact={true} component={UserList} />
                <Route key={"slide"} path={`${match.path}/slide`} exact={true} component={SlideList} />
                <Route key={"import"} path={`${match.path}/import`} exact={true} component={ImportProductList} />
                <Route key={"dashboard"} path={""} exact={true} component={Dashboard} />
                <Route>
                  <Dashboard />
                </Route>
              </Switch>
            </div>
          </div>
        </>
    </div>
  );
}

export default AdminPage;
