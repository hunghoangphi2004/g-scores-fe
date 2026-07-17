import "./MainLayout.scss";
import React, { useState } from 'react';
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;


function MainLayout() {

    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleClickCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const handleClickItem = (e) => {
        navigate(e.key)
    }

    const items = [
        {
            key: '/',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/search-scores',
            icon: <SearchOutlined />,
            label: 'Search Scores',
        },
        {
            key: "/reports",
            icon: <BarChartOutlined />,
            label: "Reports",
        },
    ]

    return (
        <Layout className="main-layout">
            <Sider
                className="main-layout__sider"
                trigger={null}
                collapsible
                collapsed={collapsed}>
                <div
                    className="main-layout__logo"
                >
                    {collapsed ? "G": "G-Scores"}
                </div>
                <Menu
                    className="main-layout__menu"
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    onClick={handleClickItem}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header className="main-layout__header">
                    <Button
                        className="main-layout__toggle"
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={handleClickCollapsed}
                    />
                </Header>
                <Content className="main-layout__content"
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;