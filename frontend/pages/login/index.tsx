import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Header } from '@components/header';
import { Footer } from '@components/footer';
import { Main } from '@components/main';
import useProvideAuth from 'src/auth/useUser';
import { useRouter } from 'next/router';
import Loader from '@components/loader';
import { signup } from "../../src/backend/user/users"

const Login: React.FC = () => {
    const [form] = Form.useForm();
    //TODO: check for backend validation error messages
    const [isBackendError, setIsBackendError] = useState<any>();
    const auth = useProvideAuth();
    const Router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string>();
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (userId) {
            Router.push("/dashboard");
            setIsLoggedIn(userId);
        }
    }, [])

    if (isLoggedIn) {
        return <Loader />
    }
    const onFinish = (values: any) => {
        setIsBackendError(false);
        signup({ userId: values.email, password: values.password })
            .then((data) => {
                if (data && data?.error) {
                    setIsBackendError(data?.error);
                    console.log(data?.error);
                }
                else {
                    localStorage.setItem("userId", data?._id);
                    localStorage.setItem("userName", data?.userId);
                    Router.push("/dashboard");
                    setIsLoggedIn(data?.userId)
                }
            })
    };

    return (
        <div>
            <Header />
            <Main />
            {isBackendError && (
                <h1
                    style={{ textAlign: 'center', color: "red", fontSize: 32 }}
                >
                    {isBackendError}
                </h1>
            )}
            <Form form={form} layout="vertical" style={{ textAlign: 'center', minHeight: '40vw', paddingTop: '90px', paddingBottom: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onFinish={onFinish}>
                <Form.Item
                    name="email"
                    style={{ width: '80vw' }}
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    style={{ width: '80vw' }}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        width={1}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            size='large'
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Signup
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <Footer />
        </div>
    );
};

export default Login