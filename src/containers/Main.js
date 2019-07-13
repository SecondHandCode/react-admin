import React from 'react'
import {Layout, Breadcrumb, Icon} from 'antd';
import cookies from 'react-cookies'
import {createHashHistory} from 'history';
// 左侧栏
import PackingMenu from '../components/PackingMenu'
// 标签页
import LabelPage from '../components/LabelPage'

const {Header, Content, Footer, Sider} = Layout;

const history = createHashHistory();
class Main extends React.Component {
    state = {
        collapsed: false,
    };

    componentWillMount() {
        if (!cookies.load("user")) {
            history.push("/login")
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <Layout style={{minHeight: '100vh'}} id={'components-layout-demo-custom-trigger'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo"/>
                    <PackingMenu/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <LabelPage></LabelPage>
                    <Content style={{margin: '0 16px'}}>
                        {/*当前页面标记栏*/}
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Main
