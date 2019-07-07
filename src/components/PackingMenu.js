import React from 'react'
import {Menu, Icon} from 'antd';
import {withRouter} from 'react-router-dom'
import routeConfig from '../routes/config'
import {Link} from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const renderMenuItem = item => (
    <Menu.Item key={item.url}>
        <Link to={item.url}>
            {item.iconType && <Icon type={item.iconType}/>}
            {item.title}
        </Link>
    </Menu.Item>
)
const renderSubMenu = item => (
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
        {item.childrenList.map(item => renderMenuItem(item))}
    </SubMenu>
)

class PackingMenu extends React.Component {
    constructor(props) {
        super(props);
        props.history.listen((location) => {
            console.log(location)
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
        openKeys:''
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu theme="dark" selectedKeys={[this.state.current]}   onClick={this.handleClick} mode="inline">
                {routeConfig.menus.map((menu) => (
                        menu.childrenList ? renderSubMenu(menu) : renderMenuItem(menu)
                    )
                )
                }
            </Menu>
        )
    }
}

export default withRouter(PackingMenu)
