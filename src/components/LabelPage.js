import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleLabelSelect, removeLabelPage, closeAllLabel, closeOtherLabel, CLOSE_ALL_LABEL} from '../actions/index'
import {Menu, Dropdown, Button} from 'antd';
import '../style/labelPage.scss'


const dropType = {
    closeAll: "closeALL",
    closeOther: "closeOther"
}

class LabelPage extends React.Component {
    closeLabel = (item,index, e) => {
        this.props.dispatch(removeLabelPage(index));
        // 如果被删除的 是选中的，那么删除之后就要页面跳转
        console.log(this.props.todos)
        if (item.select) {
            let url = '';
            for (let i = 0, len = this.props.todos.length; i < len; i++) {
                if (this.props.todos[i].select) {
                    url = this.props.todos[i].url
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

    render() {
        console.log(this)
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
                    <div className={"label-scroll-body"}>
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
