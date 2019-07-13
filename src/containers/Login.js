import React from 'react'
import '../style/login.scss'
import loginJson from '../data/login'
import cookies from 'react-cookies'
import {createHashHistory} from 'history';
import {Form, Icon, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {toggleLabelSelect} from '../actions/index'
const FormItem = Form.Item;
// has 路由跳转
const history = createHashHistory();

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        // 用户信息存在 直接进入页面
        if (cookies.load('user')) {
            history.push("/main/home")
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // 按钮loading
        this.setState((state) => (
            {
                loading: true
            }
        ))
            this.props.form.validateFields((err, values) => {
                // 恢复
                this.setState((state) => (
                    {
                        loading: false
                    }
                ))
                if (!err) {
                    if (values.userName === loginJson.userName && values.password === loginJson.password) {
                        cookies.save("user", loginJson)
                        message.success("登录成功！");
                        history.replace('/main/home');
                        // 默认选中第一个
                        this.props.dispatch(toggleLabelSelect(0))
                    } else {
                        message.error("账号密码错误");
                    }
                }
            });

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={'login-bg'}>
                <div className={'login-main '}>
                    <div className={'login-title'}>
                         用户登录
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入登录账号' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="登录账号" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入登录密码' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="登录密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className={'line-align-center'}>
                                <Button type="primary" loading={this.state.loading} htmlType="submit"
                                        className="login-form-button">
                                    登录
                                </Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(Login);
export default connect()(WrappedNormalLoginForm);
