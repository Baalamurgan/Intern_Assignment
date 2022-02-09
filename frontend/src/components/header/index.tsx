import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { PoweroffOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
    const Router = useRouter();

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        Router.replace("/login");
    };

    return (
        <div
            style={{
                backgroundColor: "#20232a",
                textAlign: "center",
                width: "100%",
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
        >
            <h1
                data-test="main-heading"
                style={{ color: "#fff", fontSize: 46, marginBottom: 0 }}
            >
                Pratilipi
            </h1>
            <div style={{ position: "fixed", right: 0, top: 15 }}>
                <Button
                    type="primary"
                    size="large"
                    icon={<PoweroffOutlined />}
                    onClick={() => logout()}
                />
            </div>
        </div>
    );
};
