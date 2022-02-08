import { LikeFilled } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';
import { useRouter } from 'next/router';
import Content from './[cid]';
import { useEffect, useState } from 'react';
import Loader from '@components/loader';
import { topContents } from "../../src/backend/content/contents"
import { useQuery } from 'react-query';

const { Meta } = Card;

interface Content {
    _id: string;
    title: string;
    story: string;
    likes: number;
}

const Contents: React.FC = () => {
    const Router = useRouter();
    const { data, isLoading, isError, error } = useQuery<Content[], any>("topCentent", async () => await fetch("http://localhost:5002/api/topcontents").then(data => data.json()))

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>iledfa</div>
    }

    // unable to understand it never seen this befroe
    const handleContentRoute = (id: string) => {
        Router.push({
            pathname: '/contents/[cid]',
            query: { cid: id },
        })

    }

    return (
        <div>
            {isError && (
                <h1
                    style={{ textAlign: 'center', color: "red", fontSize: 32 }}
                >
                    {error?.error}
                </h1>
            )}
            <Row style={{ flex: 1 }} justify="center" align='middle'>
                {data?.map((content) => (
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