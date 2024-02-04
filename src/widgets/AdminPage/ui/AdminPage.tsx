import { BlockOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps } from 'antd';
import { Key, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useNavigate } from 'react-router-dom';
import { api } from 'shared/api/api';
import { RoutePath } from 'shared/config/router';

interface AdminPageProps {
  children?: ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}



export const AdminPage = ({ children }: AdminPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  const handleLogout = () => {
    localStorage.clear();
    dispatch(api.util.resetApiState());
    navigate(RoutePath.main);
  }

  const items: MenuProps['items'] = [
    getItem(<NavLink to={'/admin'}>Участники</NavLink>, 'users', <UserOutlined />),
    getItem(<NavLink to={'/admin/faqs'}>Вопросы</NavLink>, 'faqs', <QuestionCircleOutlined />),
    getItem(<NavLink to={'/admin/shifts'} >Смены</NavLink>, 'shifts', <BlockOutlined />),
    getItem(<Button onClick={handleLogout}>Выйти</Button>, 'logout')
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && <Layout.Sider theme='light' style={{ paddingBlock: 40 }}>
        <Menu
          theme='light'
          items={items}
          mode='inline'
        />
      </Layout.Sider>}
      {isMobile && <Layout.Header style={{ backgroundColor: 'white' }}>
        <Menu
          theme='light'
          items={items}
          mode='horizontal'
        />
        {/* <Button onClick={handleLogout}>Выйти</Button> */}
      </Layout.Header>}
      <Layout.Content style={{ padding: 40, width: '100%' }}>
        {children}
      </Layout.Content>
    </Layout>
  )
}