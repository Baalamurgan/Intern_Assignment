import { BackwardFilled, LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useRouter } from "next/router";
import data from "@public/posts.json";
import { Header } from "@components/header";
import { Button } from "@components/button";
const { Meta } = Card;

const gridStyle = {
    width: "100%",
};

const PostContent = ({ pid }) => {
    const Router = useRouter();
    const updateLikes = (id) => {
        console.log(id);
    };

    return (
        <div>
            <Header />
            <div style={{ paddingTop: "80px" }}>
                <Button
                    type="primary"
                    size="large"
                    style={{ position: "fixed", left: 0, top: 80 }}
                    onClick={() => Router.push("/dashboard")}
                >
                    <BackwardFilled key="backwardFilled" />
                </Button>
                <Row style={{ flex: 1 }} justify="center">
                    {(data?.posts ?? []).map((post) => {
                        if (post.id === pid) {
                            return (
                                <Col md={10} xs={20} key={post.title}>
                                    <Card
                                        onClick={() => updateLikes(post.id)}
                                        style={{ height: "80%" }}
                                        cover={
                                            <img
                                                alt="example"
                                                style={{ objectFit: "cover" }}
                                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                            />
                                        }
                                        actions={[
                                            <LikeOutlined key="likeOutlined" />,
                                            <p>{post.likes}</p>,
                                        ]}
                                    >
                                        <Card.Grid style={gridStyle}>
                                            <Meta
                                                title={post.title}
                                                description={post.content}
                                            />
                                            <p
                                                style={{
                                                    marginTop: 8,
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {post.publishDate}
                                            </p>
                                        </Card.Grid>
                                    </Card>
                                </Col>
                            );
                        }
                    })}
                </Row>
            </div>
        </div>
    );
};

const Post = () => {
    const Router = useRouter();
    const { pid } = Router.query;
    return <PostContent pid={pid} />;
};

export default Post;
