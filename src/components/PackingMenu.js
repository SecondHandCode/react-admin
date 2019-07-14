import React from 'react'
import {Menu, Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import routeConfig from '../routes/config'
import {connect} from 'react-redux'
import {addLabelPage} from '../actions/index'
import {PropTypes} from "prop-types";
const SubMenu = Menu.SubMenu;

const renderMenuItem = (item, parent, self) => (
    <Menu.Item key={item.url} onClick={self.toLink.bind(self, item, parent)}>
            {item.iconType && <Icon type={item.iconType}/>}
            {item.title}
    </Menu.Item>
)
const renderSubMenu = (itemParent, self) => (
    <SubMenu
        key={itemParent.url}
        title={
            <span>
                {itemParent.iconType && <Icon type={itemParent.iconType}/>}
                <span>
                    {itemParent.title}
                </span>
             </span>
        }
    >
        {itemParent.childrenList.map(item => renderMenuItem(item, itemParent, self))}
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
    toLink = (item, parent) => {
        this.setState({
            current:item.url
        });
        this.props.dispatch(addLabelPage(item));
        this.props.history.replace(item.url);
        // Main 主体函数 中的函数
        this.props.onMenuToLink();
    }

    render() {
        return (
            <Menu theme="dark" selectedKeys={[this.state.current]} openKeys={this.state.openKeys}
                  onOpenChange={this.openChange}
                  mode="inline">
                {routeConfig.menus.map((menu) => (
                    menu.childrenList ? renderSubMenu(menu, this) : renderMenuItem(menu, undefined, this)
                    )
                )
                }
            </Menu>
        )
    }
}
// 传入props 左侧栏点击 追加label页 溢出情况下 往左边移动
PackingMenu.propTypes = {
    onMenuToLink: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        count: state
    }
}
export default connect(mapStateToProps)(withRouter(PackingMenu))
