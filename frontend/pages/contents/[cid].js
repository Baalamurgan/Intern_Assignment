import { BackwardFilled, LikeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Image, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { getContent } from "../../src/backend/content/contents";
import { update } from "../../src/backend/user/users";
import { useEffect, useState } from "react";
import moment from "moment";

const { Meta } = Card;
const { Title } = Typography;

const gridStyle = {
    width: "100%",
};

const backButtonStyle = {
    position: "fixed",
    left: 0,
    top: 80,
};

const dateStyle = {
    marginTop: "8px",
    marginBottom: "0",
};

const Content = () => {
    const Router = useRouter();
    const { cid } = Router.query;
    const [content, setContent] = useState();
    const [isBackendError, setIsBackendError] = useState();
    const updateLikes = (id) => {
        const userId = localStorage.getItem("userId");
        setIsBackendError(false);
        if (userId) {
            update({ contentId: id }).then((data) => {
                if (!data) {
                    setIsBackendError("Content not found");
                    setTimeout(() => {
                        Router.push("/dashboard");
                    }, 2000);
                } else if (data?.error) {
                    setIsBackendError(data?.error);
                } else {
                    loadContent();
                }
            });
        } else {
            setIsBackendError("Please Login to like");
        }
    };

    const loadContent = () => {
        setIsBackendError(false);
        getContent({ id: cid }).then((data) => {
            if (!data) {
                setIsBackendError("Content not found");
                setTimeout(() => {
                    Router.push("/dashboard");
                }, 2000);
            } else if (data?.error) {
                setIsBackendError(data.error);
            } else {
                setContent(data);
            }
        });
    };

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <div>
            <Row justify="center" align="middle">
                <Divider orientation="center">
                    {isBackendError && (
                        <Title level={1} type="danger">
                            {isBackendError}
                        </Title>
                    )}
                </Divider>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        style={backButtonStyle}
                        onClick={() => Router.push("/dashboard")}
                    >
                        <BackwardFilled key="backwardFilled" />
                    </Button>
                    <Row justify="center">
                        <Col md={10} xs={20}>
                            <Card
                                cover={
                                    <Image
                                        style={{ objectFit: "cover" }}
                                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                    />
                                }
                                actions={[
                                    <LikeOutlined
                                        key="likeOutlined"
                                        onClick={() =>
                                            updateLikes(content?._id)
                                        }
                                    />,
                                    <Title level={5} strong={true}>
                                        {content?.likes}
                                    </Title>,
                                ]}
                            >
                                <Card.Grid style={gridStyle}>
                                    <Meta
                                        title={content?.title}
                                        description={content?.story}
                                    />
                                    <Title
                                        level={5}
                                        mark={true}
                                        style={dateStyle}
                                    >
                                        {moment(content?.createdAt).fromNow()}
                                    </Title>
                                </Card.Grid>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Row>
        </div>
    );
};

export default Content;
