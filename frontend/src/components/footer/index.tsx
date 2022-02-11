import React, { CSSProperties } from "react";
import { Space } from "antd";
import { TwitterOutlined, LinkedinOutlined } from "@ant-design/icons";

export const Footer: React.FC = () => {
    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
    };
    return (
        <div
            style={{
                backgroundColor: "#282c34",
                color: "#fff",
                textAlign: "center",
                paddingTop: 20,
                paddingBottom: 20,
                position: "relative",
                bottom: 0,
                width: "100%",
            }}
        >
            <Space direction="vertical" size="large">
                <a
                    href="https://www.pratilipi.com/"
                    target="_blank"
                    style={iconStyle}
                >
                    <img
                        src="https://www.pratilipi.com/favicon.ico"
                        alt="Pratilipi Icon"
                        height={100}
                        width={100}
                    />
                </a>
                <Space align="center" size="middle">
                    <a
                        href="https://twitter.com/TeamPratilipi"
                        target="_blank"
                        style={iconStyle}
                    >
                        <TwitterOutlined data-test="icon" />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/pratilipi/"
                        target="_blank"
                        style={iconStyle}
                    >
                        <LinkedinOutlined data-test="icon" />
                    </a>
                </Space>
            </Space>
        </div>
    );
};
