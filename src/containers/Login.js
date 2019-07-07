import React from 'react'
import '../style/login.scss'
import { Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

class Login extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
                                <Button type="primary" htmlType="submit" className="login-form-button">
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
export default  WrappedNormalLoginForm
