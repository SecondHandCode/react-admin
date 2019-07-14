import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
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
 * 滚动时 调用的方法
 * @param event dom
 * @param rollingDistance  可滚动距离
 * @param direction  滚动方向 up || down
 * @param axis 滚动轴向  x || y
 * @param eachDistance  每次滚动距离
 */
const scrollFn = (event, {rollingDistance, direction = "up", axis = "x", eachDistance = 120}) => {
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
/**
 *  非滚动事件的触发的  滚动条调整
 * @param event
 * @param rollingDistance
 * @param axis
 */
const rollingDistanceVerification = (event, {
    rollingDistance = 0,
    axis = "x"
}) => {
    let scrollX = event.style.left ? Number(event.style.left.replace("px", "")) : 0,
        scrollY = event.style.top ? Number(event.style.top.replace("px", "")) : 0;
    if (axis === "x") {
        if (scrollX !== 0 && Math.abs(scrollX) > rollingDistance) {
            scrollX = -rollingDistance;
        }
        if (scrollX > 0) {
            scrollX = 0;
        }
        event.style.left = `${scrollX}px`;
    } else if (axis === "y") {
        if (scrollY !== 0 && Math.abs(scrollY) > rollingDistance) {
            scrollY = -rollingDistance;
        }
        scrollY = scrollY > 0 ? scrollY : 0;
        event.style.top = `${scrollY}px`;
    }
}
class LabelPage extends React.Component {
    /**
     * 关闭标签
     * @param item
     * @param index
     * @param e
     */
    closeLabel = (item, index, e) => {
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
        this.rollingAdjustment();
    }
    /**
     * 点击标签
     * @param item
     * @param index
     */
    toLink = (item, index) => {
        this.props.history.replace(item.url);
        this.props.dispatch(toggleLabelSelect(index));
    }
    /**
     * 下拉操作标签
     * @param type
     */
    dropClick = (type) => {
        // 关闭所有 或者关闭 其他归为
        this.refs.scrollLabel.style.left = "0px"
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
    /**
     * 标签滚动监听
     * @param e
     */
    handleScrollX = (e) => {
        const {scrollLabelParent, scrollLabel} = this.refs;
        // 滚动方向获取
        const scrollDirection = rollingDirection(e.nativeEvent);
        if (scrollDirection) {
            if ((scrollLabel.clientWidth - (scrollLabelParent.clientWidth - 120)) > 0) {
                scrollFn(scrollLabel, {
                    rollingDistance: scrollLabel.clientWidth - (scrollLabelParent.clientWidth - 120),
                    direction: scrollDirection
                });
            }
        }
    }
    /**
     * 滚动调整，非 滚动事件触发的调整
     */
    rollingAdjustment = () => {
        // 滚动
        const {scrollLabelParent, scrollLabel} = this.refs;
        console.log(1)
        setTimeout(() => {
            rollingDistanceVerification(scrollLabel, {
                rollingDistance: scrollLabel.clientWidth - (scrollLabelParent.clientWidth - 120)
            });
        }, 0)
    };
    /**
     * Main 主体触发事件
     */
    mainToLink = () => {
        const {scrollLabelParent, scrollLabel} = this.refs;
        setTimeout(() => {
            // 大于0 赋值
            const disparity = scrollLabel.clientWidth - (scrollLabelParent.clientWidth - 120);
            if (disparity > 0) {
                scrollLabel.style.left = `${-disparity}px`;
            }
        });
    }

    componentDidMount() {
        this.props.onRef(this)
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
                <div className={"label-scroll-con"} ref={"scrollLabelParent"}>
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

// 传入props 左侧栏点击 追加label页 溢出情况下 往左边移动
LabelPage.propTypes = {
    onRef: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        labelPage: state.todoLabelPage
    }
}
export default connect(mapStateToProps)(withRouter(LabelPage))
