import React from 'react'
import {Layout, Breadcrumb, Icon} from 'antd';
import cookies from 'react-cookies'
import {createHashHistory} from 'history';
// 左侧栏
import PackingMenu from '../components/PackingMenu'
// 标签页
import LabelPage from '../components/LabelPage'
import '../style/main.scss'
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
    /**
     * 左侧栏页面跳转 调整滚动条
     */
    onMenuToLink = ()=>{
        this._labelPageChild.mainToLink();
    }
    onLabelPageRef = (ref) => {
        this._labelPageChild = ref
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
                    <PackingMenu onMenuToLink={this.onMenuToLink}/>
                </Sider>
                <Layout className={"single-page-main"}>
                    {/*head 栏*/}
                    <div className={"head-fixed"}>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>
                        <LabelPage onRef={this.onLabelPageRef}></LabelPage>
                        {/*当前页面标记栏*/}
                        <Breadcrumb style={{margin: '10px'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/*内容展示*/}
                    <div className={"single-page"}>
                        <Content className={"single-page-content"}>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                Bill is a cat.
                            </div>
                        </Content>
                    </div>
                    <Footer style={{textAlign: 'center'}}>
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Main
