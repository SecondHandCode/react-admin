import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleLabelSelect, removeLabelPage} from '../actions/index'
import '../style/labelPage.scss'

const replace = (todos, history) => {
    debugger
    let url = '';
    for (let i = 0, len = todos.length; i < len; i++) {
        if (todos[i].select) {
            url = todos[i].url
        }
    }
    if(url){
        history.replace(url)
    }
}

class LabelPage extends React.Component {
    closeLabel = (item,index, e) => {
        this.props.dispatch(removeLabelPage(index));
        // 如果被删除的 是选中的，那么删除之后就要页面跳转
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
        this.props.dispatch(toggleLabelSelect(index))
    }

    render() {
        // 缓存 labelPage
        localStorage.labelPage = JSON.stringify(this.props.todos)
        return (
            <div className={"label-pages"}>
                <div className={"label-scroll-con"}>
                    <div className={"label-scroll-body"}>
                        {this.props.todos.map((item, index) => {
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

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todoLabelPage
    }
}
export default connect(mapStateToProps)(withRouter(LabelPage))
