import { LikeFilled } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import Content from './[cid]';
import { useEffect, useState } from 'react';
import Loader from '@components/loader';
import { topContents } from "../../src/backend/content/contents"

const { Meta } = Card;

interface Content {
    _id: string;
    title: string;
    story: string;
    likes: number;
}

const Contents: React.FC = () => {
    const Router = useRouter();
    const Route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string>();
    const [isBackendError, setIsBackendError] = useState<any>();
    const [contents, setContents] = useState<Content[]>([]);
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            Route.push("/login");
        }
        else {
            setIsBackendError(false)
            setIsLoggedIn(userId);
            topContents()
                .then((data) => {
                    if (!data || data.length === 0) {
                        setIsBackendError("No Contents found");
                    }
                    else if (data?.error) {
                        setIsBackendError(data?.error)
                    }
                    else {
                        setContents(data);
                    }
                })
        }
    }, [])

    if (!isLoggedIn) {
        return <Loader />
    }

    const handleContentRoute: React.FC<string> = (id: string) => {
        Router.push({
            pathname: '/contents/[cid]',
            query: { cid: id },
        })
        return (
            <Content />
        )
    }

    return (
        <div>
            {isBackendError && (
                <h1
                    style={{ textAlign: 'center', color: "red", fontSize: 32 }}
                >
                    {isBackendError}
                </h1>
            )}
            <Row style={{ flex: 1 }} justify="center" align='middle'>
                {(contents ?? []).map((content) => (
                    <Col key={content._id}>
                        <Card
                            hoverable
                            onClick={() => handleContentRoute(content._id)}
                            style={{ width: 240, margin: '10px' }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            actions={[
                                <LikeFilled key="likeFilled" />,
                            ]}
                        >
                            <Meta title={content.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Contents;