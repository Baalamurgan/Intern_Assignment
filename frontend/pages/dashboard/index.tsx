import { Typography, Divider, Row, Spin } from 'antd';
import { useRouter } from "next/router";
import Posts from "pages/contents";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Dashboard: React.FC<any> = () => {
    const Route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<any>();
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const userName = localStorage.getItem("userName")
        if (!userId) {
            Route.push("/login");
        }
        else {
            setIsLoggedIn(userName);
        }
    }, [])

    if (!isLoggedIn) {
        return <Spin size="large" />
    }

    return (
        <>
            <Row justify='center' align='middle'>
                <Divider orientation='center'>
                    <Title level={2}  >
                        Dashboard
                    </Title>
                    <Title level={2} type="success">
                        Hello, {isLoggedIn}
                    </Title>
                </Divider>
                <Posts />
            </Row>
        </>
    );
};



export default Dashboard;