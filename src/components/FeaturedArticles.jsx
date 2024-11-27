import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FeaturedArticles = () => {
    const [featuredArticles, setFeaturedArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const fakeData = [
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/1",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/2",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/3",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/4",
                },
                {
                    imageUrl: "https://via.placeholder.com/1920x1080",
                    title: "Ways to Watch",
                    description: "Your personalized view of the NFL schedule.",
                    link: "/article/5",
                },
            ];
            setTimeout(() => {
                setFeaturedArticles(fakeData);
            }, 1000);
        };
        fetchData();
    }, []);

    const handleCardClick = (link) => {
        navigate(link);
    };

    return (
        <Container className="my-4">
            <Row>
                {featuredArticles.map((article, index) => (
                    <Col xs={12} md={12} key={index} className="mb-3">
                        <Card
                            onClick={() => handleCardClick(article.link)}
                            className="d-flex flex-row align-items-center border-0"
                            style={{
                                backgroundColor: "#f8f9fa",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <Card.Img
                                src={article.imageUrl} // Sử dụng imageUrl thay vì image
                                alt={article.title}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                                className="me-3"
                            />
                            <Card.Body>
                                <Card.Title className="mb-1" style={{ fontSize: "16px" }}>
                                    {article.title}
                                </Card.Title>
                                <Card.Text
                                    className="text-muted"
                                    style={{ fontSize: "14px", lineHeight: "1.5" }}
                                >
                                    {article.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedArticles;
