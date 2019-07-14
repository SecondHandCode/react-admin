import React from 'react'
import {withRouter} from 'react-router-dom'
import rdom from 'react-dom'
import {connect} from 'react-redux'
import {toggleLabelSelect, removeLabelPage, closeAllLabel, closeOtherLabel, CLOSE_ALL_LABEL} from '../actions/index'
import {Menu, Dropdown, Button} from 'antd';
import '../style/labelPage.scss'

// 下拉选项状态
const dropType = {
    closeAll: "closeALL",
    closeOther: "closeOther"
}
/**
 * 获取 滚动方向
 * @param e
 * @returns {*}
 */
const rollingDirection = (e) => {
    if (e.wheelDelta) {
        if (e.wheelDelta > 0) {
            return "up";
        }
        if (e.wheelDelta < 0) {
            return "down"
        }
    } else if (e.detail) {
        if (e.detail > 0) {
            return "up";
        }
        if (e.detail < 0) {
            return "down"
        }
    }
    return null;
}
/**
 *
 * @param event dom
 * @param rollingDistance  可滚动距离
 * @param direction  滚动方向 up || down
 * @param axis 滚动轴向  x || y
 * @param eachDistance  每次滚动距离
 */
const scrollFn = (event, rollingDistance, direction = "up", axis = "x", eachDistance = 120) => {
    let scrollX = event.style.left ? Number(event.style.left.replace("px", "")) : 0,
        scrollY = event.style.top ? Number(event.style.top.replace("px", "")) : 0;
    rollingDistance = Math.abs(rollingDistance);
    if (direction === "up") {
        scrollX += eachDistance;
        scrollY += eachDistance;
        if (scrollX > 0) {
            scrollX = 0;
        }
        if (scrollY > 0) {
            scrollY = 0;
        }
        if (axis === "x") {
            event.style.left = `${scrollX}px`;
        } else if (axis === "y") {
            event.style.top = `${scrollY}px`;
        }
    } else if (direction === "down") {
        scrollX -= eachDistance;
        scrollY -= eachDistance;
        if (Math.abs(scrollX) > rollingDistance) {
            scrollX = -rollingDistance;
        }
        if (Math.abs(scrollY) > rollingDistance) {
            scrollY = -rollingDistance;
        }
        if (axis === "x") {
            event.style.left = `${scrollX}px`;
        } else if (axis === "y") {
            event.style.top = `${scrollY}px`;
        }
    }
}

class LabelPage extends React.Component {
    closeLabel = (item,index, e) => {
        this.props.dispatch(removeLabelPage(index));
        // 如果被删除的 是选中的，那么删除之后就要页面跳转
        if (item.select) {
            let url = '';
            for (let i = 0, len = this.props.labelPage.todos.length; i < len; i++) {
                if (this.props.labelPage.todos[i].select) {
                    url = this.props.labelPage.todos[i].url
                }
            }
            this.props.history.replace(url)
        }
        e.stopPropagation();
    }
    toLink = (item,index) => {
        this.props.history.replace(item.url);
        this.props.dispatch(toggleLabelSelect(index));
    }
    dropClick = (type) => {
        if (dropType.closeOther === type) {
            this.props.dispatch(closeOtherLabel());
        } else if (dropType.closeAll === type) {
            this.props.dispatch(closeAllLabel());
            // 异步跳转
            setTimeout(()=>{
                if (this.props.labelPage.type === CLOSE_ALL_LABEL) {
                    if (this.props.labelPage.todos.length > 0) {
                        this.props.history.replace(this.props.labelPage.todos[0].url);
                    }
                }
            },0)
        }
    }
    // 标签栏滚动X轴
    handleScrollX = (e) => {
        const parentDom = rdom.findDOMNode(this);
        // 滚动方向获取
        const scrollDirection = rollingDirection(e.nativeEvent);
        if (scrollDirection) {
            scrollFn(e.currentTarget, parentDom.clientWidth - 120 - e.currentTarget.clientWidth, scrollDirection)
        }
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <span  onClick={this.dropClick.bind(this, dropType.closeAll)}>关闭所有</span>
                </Menu.Item>
                <Menu.Item>
                    <span  onClick={this.dropClick.bind(this, dropType.closeOther)}>关闭其他</span>
                </Menu.Item>
            </Menu>
        );
        // 缓存 labelPage
        localStorage.labelPage = JSON.stringify(this.props.labelPage.todos)
        return (
            <div className={"label-pages"}>
                <div className={"label-scroll-con"}>
                    <div className={"label-scroll-body"} ref={"scrollLabel"} onWheel={(e) => this.handleScrollX(e)}>
                        {this.props.labelPage.todos.map((item, index) => {
                            return <div key={index} className={"label-dot"}
                                        onClick={this.toLink.bind(this,item, index)}>
                                <span className={"label-dot-inner"}/>
                                <span className={"label-dot-text"}
                                      style={{color: item.select ? "#1890ff" : "",}}>{item.title}</span>
                                {item.preventDeletion ?
                                    "" : <em
                                        className={"label-close"}
                                        onClick={(e) => this.closeLabel(item,index, e)}>×</em>}
                            </div>
                        })}
                    </div>
                    <div className={"label-drop-main"}>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <Button type="primary">标签选项</Button>
                        </Dropdown>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        labelPage: state.todoLabelPage
    }
}
export default connect(mapStateToProps)(withRouter(LabelPage))
