import React, { useState } from 'react';

import { Button, Layout, Menu, theme } from 'antd';
import {
   Award,
   ClipboardList,
   FolderOpen,
   Package,
   PanelLeftClose,
   PanelLeftOpen,
   Stethoscope,
} from 'lucide-react';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const menuItems = [
   {
      key: '/product',
      icon: <Package />,
      label: <Link to='/product'>Product</Link>,
   },
   {
      key: '/category',
      icon: <FolderOpen />,
      label: <Link to='/category'>Category</Link>,
   },
   {
      key: '/order',
      icon: <ClipboardList />,
      label: <Link to='/order'>Order</Link>,
   },
   {
      key: '/specialty',
      icon: <Award />,
      label: <Link to='/specialty'>Specialty</Link>,
   },
   {
      key: '/doctors',
      icon: <Stethoscope />,
      label: <Link to='/doctors'>Doctors</Link>,
   },
];

type Props = {
   children?: React.ReactNode;
};
export default function MainLayout({ children }: Props) {
   const [collapsed, setCollapsed] = useState(false);
   const location = useLocation();

   const {
      token: { colorBgContainer },
   } = theme.useToken();

   return (
      <>
         <ScrollRestoration />

         <Layout style={{ height: '100vh' }}>
            <Sider
               trigger={null}
               collapsible
               collapsed={collapsed}
               style={{
                  paddingInline: 5,
                  paddingBlock: 5,
               }}
            >
               <div className='demo-logo-vertical' />
               <Menu
                  theme='dark'
                  mode='inline'
                  selectedKeys={[location.pathname]}
                  items={menuItems}
                  style={{
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               />
            </Sider>
            <Layout>
               <Header style={{ padding: 0, background: colorBgContainer }}>
                  <Button
                     type='text'
                     icon={collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                     onClick={() => setCollapsed(!collapsed)}
                     style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                     }}
                  />
               </Header>
               <Content
                  style={{
                     maxHeight: 700,
                  }}
               >
                  {children ?? <Outlet />}
               </Content>
            </Layout>
         </Layout>
      </>
   );
}
