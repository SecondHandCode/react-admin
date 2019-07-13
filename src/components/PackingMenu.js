import React from 'react'
import {Menu, Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import routeConfig from '../routes/config'
import {connect} from 'react-redux'
import {addLabelPage} from '../actions/index'
const SubMenu = Menu.SubMenu;

const renderMenuItem = (item,self) => (
    <Menu.Item key={item.url} onClick={self.toLink.bind(self,item)}>
            {item.iconType && <Icon type={item.iconType}/>}
            {item.title}
    </Menu.Item>
)
const renderSubMenu = (item,self) => (
    <SubMenu
        key={item.url}
        title={
            <span>
                {item.iconType && <Icon type={item.iconType}/>}
                <span>
                    {item.title}
                </span>
             </span>
        }
    >
        {item.childrenList.map(item => renderMenuItem(item,self))}
    </SubMenu>
)

class PackingMenu extends React.Component {
    constructor(props) {
        super(props);
        // 路由监听
        props.history.listen((location) => {
            this.setState({
                current:location.pathname
            })
        })
    }
    componentWillMount  () {
        // 项目开始的时候 监听 当前路由
        this.setState({
            current:this.props.location.pathname
        })
    }

    state = {
        current: '/main/home',
        openKeys: []
    }
    openChange = (e) => {
        // 设置值展开一个
        this.setState({
            openKeys: e.length > 1 ? [e[e.length - 1]] : e
        })
    }
    toLink = (item) => {
        this.setState({
            current:item.url
        });
        this.props.dispatch(addLabelPage(item));
        this.props.history.replace(item.url);
    }

    render() {
        return (
            <Menu theme="dark" selectedKeys={[this.state.current]} openKeys={this.state.openKeys}
                  onOpenChange={this.openChange}
                  mode="inline">
                {routeConfig.menus.map((menu) => (
                        menu.childrenList ? renderSubMenu(menu,this) : renderMenuItem(menu,this)
                    )
                )
                }
            </Menu>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state
    }
}
export default connect(mapStateToProps)(withRouter(PackingMenu))
