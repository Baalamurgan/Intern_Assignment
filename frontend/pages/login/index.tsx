import React, { useState, useEffect } from "react";
import { Form, Input, Button, Typography, Row, Divider, Col, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { signup } from "../../src/backend/user/users";

const { Title } = Typography;

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const [isBackendError, setIsBackendError] = useState<any>();
    const [success, setSuccess] = useState<any>();
    const Router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string>();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            Router.push("/dashboard");
            setIsLoggedIn(userId);
        }
    }, []);

    if (isLoggedIn) {
        return <Spin size="large" />;
    }
    const onFinish = (values: any) => {
        setIsBackendError(false);
        setSuccess(false);
        signup({ userId: values.email, password: values.password }).then(
            (data) => {
                if (!data) {
                    setIsBackendError("Error! Please try again");
                } else if (data && data?.error) {
                    setIsBackendError(data?.error);
                } else {
                    localStorage.setItem("userId", data?._id);
                    localStorage.setItem("userName", data?.userId);
                    setSuccess("Logging in");
                    setTimeout(() => {
                        setIsLoggedIn(data?.userId);
                        Router.push("/dashboard");
                    }, 1500);
                }
            },
        );
    };

    return (
        <div>
            <Row justify="center">
                <Title level={1}>Signup</Title>
            </Row>
            <Row justify="center">
                {isBackendError && (
                    <Title level={1} type="danger">
                        {isBackendError}
                    </Title>
                )}
                {success && (
                    <Title level={1} type="success">
                        {success}...
                    </Title>
                )}
                <Divider orientation="center">
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ minHeight: "38vw" }}
                        onFinish={onFinish}
                    >
                        <Row justify="center" align="middle" gutter={32}>
                            <Col>
                                <Form.Item
                                    name="email"
                                    style={{ width: "80vw" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your email!",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={
                                            <UserOutlined className="site-form-item-icon" />
                                        }
                                        placeholder="Email"
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item
                                    name="password"
                                    style={{ width: "80vw" }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your password!",
                                        },
                                    ]}
                                >
                                    <Input
                                        width={1}
                                        prefix={
                                            <LockOutlined className="site-form-item-icon" />
                                        }
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Form.Item shouldUpdate>
                                    {() => (
                                        <Button
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                !!form
                                                    .getFieldsError()
                                                    .filter(
                                                        ({ errors }) =>
                                                            errors.length,
                                                    ).length
                                            }
                                        >
                                            Signup
                                        </Button>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Divider>
            </Row>
        </div>
    );
};

export default Login;
