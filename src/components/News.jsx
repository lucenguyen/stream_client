import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowRight, FaNewspaper } from "react-icons/fa";
import { toast } from "react-toastify";
import ChannelListAPI from "../../src/api/ChannelListAPI";

const News = () => {
    const [newsData, setNewsData] = useState([]);
    const [visibleNewsCount, setVisibleNewsCount] = useState(5);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await ChannelListAPI.getNews();
                if (response && response.data && Array.isArray(response.data)) {
                    setNewsData(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    toast.error("Unexpected data format from API.");
                    setNewsData([]);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                toast.error("Failed to load news. Please try again.");
            }
        };

        fetchNews();
    }, []);

    const loadMoreNews = () => {
        setVisibleNewsCount(prevCount => prevCount + 5);
    };

    const truncateDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + "...";
        }
        return description;
    };

    return (
        <Container className="news-container my-4">
            <Row>
                <Col>
                    <h4 className="news-title mb-3">NEWS</h4>
                    <div className="news-list">
                        {newsData.length > 0 ? (
                            newsData.slice(0, visibleNewsCount).map((item, index) => (
                                <Card key={index} className="news-card border-0 mb-2 pb-2">
                                    <Card.Link
                                        href={item.links?.web?.href || "#"}
                                        className="news-link text-dark"
                                    >
                                        <FaNewspaper className="me-2" />
                                        {item.headline}
                                    </Card.Link>

                                    {item.description && (
                                        <Card.Text className="news-description">
                                            {truncateDescription(item.description)}
                                            {item.description.length > 100 && (
                                                <span>
                                                    <a
                                                        href={item.links?.web?.href || "#"}
                                                        className="text-decoration-none text-primary"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Read More
                                                    </a>
                                                </span>
                                            )}
                                        </Card.Text>
                                    )}
                                </Card>
                            ))
                        ) : (
                            <p>Loading news...</p>
                        )}
                    </div>
                    {visibleNewsCount < newsData.length && (
                        <div className="load-more-btn mt-3 text-center">
                            <Button
                                variant="link"
                                onClick={loadMoreNews}
                                className="text-decoration-none text-dark d-flex align-items-center justify-content-center"
                            >
                                More News
                                <FaArrowRight className="ms-2" />
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default News;
