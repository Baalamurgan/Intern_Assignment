import { LikeFilled } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import data from "@public/posts.json"
import { useRouter } from 'next/router';
import Post from './[pid]';
import { useEffect, useState } from 'react';
import Loader from '@components/loader';

const { Meta } = Card;

const Posts: React.FC = () => {
    const Router = useRouter();
    const Route = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<string>();
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            Route.push("/login");
        }
        else {
            setIsLoggedIn(userId);
        }
    }, [])

    if (!isLoggedIn) {
        return <Loader />
    }
    const handlePostRoute: React.FC<string> = (id: string) => {
        Router.push({
            pathname: '/posts/[pid]',
            query: { pid: id },
        })
        return (
            <Post />
        )
    }

    return (
        <div>
            <Row style={{ flex: 1 }} justify="center" align='middle'>
                {(data?.posts ?? []).map((post) => (
                    <Col key={post.id}>
                        <Card
                            hoverable
                            style={{ width: 240, margin: '10px' }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            actions={[
                                <LikeFilled key="likeFilled"
                                    onClick={() => handlePostRoute(post.id)}
                                />,
                            ]}
                        >
                            <Meta title={post.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Posts;