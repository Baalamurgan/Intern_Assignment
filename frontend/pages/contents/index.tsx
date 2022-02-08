import { LikeFilled } from '@ant-design/icons';
import { Card, Col, Row, Spin } from 'antd';
import { useRouter } from 'next/router';
import Content from './[cid]';
import { useQuery } from 'react-query';
import axios from 'axios';
import Text from 'antd/lib/typography/Text';

const { Meta } = Card;

const cardStyle = {
    width: 240, margin: '10px'
}

interface Content {
    _id: string;
    title: string;
    story: string;
    likes: number;
}

const Contents: React.FC = () => {
    const Router = useRouter();
    const { data, isLoading, error } = useQuery<Content[], any>("topCentent", async () => await axios.get("http://localhost:5002/api/topcontents").then(data => data.data), {
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <Spin size="large" />
    }

    const handleContentRoute = (id: string) => {
        Router.push({
            pathname: '/contents/[cid]',
            query: { cid: id },
        })
    }

    return (
        <div>
            {true && (
                <Text type="danger">{error?.response?.data?.error}</Text>
            )}
            <Row justify="center" align='middle'>
                {data?.map((content: Content) => (
                    <Col key={content._id}>
                        <Card
                            hoverable
                            onClick={() => handleContentRoute(content._id)}
                            style={cardStyle}
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