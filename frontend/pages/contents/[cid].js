import { BackwardFilled, LikeOutlined } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import { useRouter } from "next/router";
import { Header } from "@components/header";
import { Button } from "@components/button";
import { getContent } from "../../src/backend/content/contents";
import { update } from "../../src/backend/user/users";
import { useEffect, useState } from "react";
import moment from "moment";
const { Meta } = Card;

const gridStyle = {
    width: "100%",
};

const ContentLayout = () => {
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
            <Header />
            {isBackendError && (
                <h1 style={{ textAlign: "center", color: "red", fontSize: 32 }}>
                    {isBackendError}
                </h1>
            )}
            <div style={{ paddingTop: "20px" }}>
                <Button
                    type="primary"
                    size="large"
                    style={{ position: "fixed", left: 0, top: 80 }}
                    onClick={() => Router.push("/dashboard")}
                >
                    <BackwardFilled key="backwardFilled" />
                </Button>
                <Row style={{ flex: 1 }} justify="center">
                    <Col md={10} xs={20}>
                        <Card
                            style={{ height: "80%" }}
                            cover={
                                <img
                                    alt="example"
                                    style={{ objectFit: "cover" }}
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />
                            }
                            actions={[
                                <LikeOutlined
                                    key="likeOutlined"
                                    onClick={() => updateLikes(content?._id)}
                                />,
                                <p>{content?.likes}</p>,
                            ]}
                        >
                            <Card.Grid style={gridStyle}>
                                <Meta
                                    title={content?.title}
                                    description={content?.story}
                                />
                                <p
                                    style={{
                                        marginTop: 8,
                                        marginBottom: 0,
                                    }}
                                >
                                    {moment(content?.createdAt).fromNow()}
                                </p>
                            </Card.Grid>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const Content = () => {
    const Router = useRouter();
    return <ContentLayout />;
};

export default Content;
