import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ChannelListAPI from '../../src/api/ChannelListAPI';
import { toast } from 'react-toastify';

const NewsPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [visibleNewsCount, setVisibleNewsCount] = useState(6);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await ChannelListAPI.getNews();
                if (response && response.data && Array.isArray(response.data)) {
                    const processedData = response.data.map(item => ({
                        ...item,
                        imageUrl: item.images && item.images[0] ? item.images[0].url : '/path/to/default-image.jpg', // Dùng ảnh mặc định nếu không có ảnh
                    }));
                    setNewsData(processedData);
                } else {
                    console.error("Invalid API data:", response.data);
                    toast.error("Invalid data format.");
                    setNewsData([]);
                }
            } catch (error) {
                console.error("Error when retrieving information:", error);
                toast.error("Unable to download news. Please try again.");
            }
        };

        fetchNews();
    }, []);

    const truncateDescription = (description, maxLength = 100) => {
        if (description && description.length > maxLength) {
            return (
                <>
                    {description.substring(0, maxLength)}...
                    <a
                        href="#"
                        className="text-primary"
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => e.preventDefault()}
                    >
                        Read More
                    </a>
                </>
            );
        }
        return description || '';
    };

    const loadMoreNews = () => {
        setVisibleNewsCount((prevCount) => prevCount + 6);
    };

    return (
        <Container className="news-page-container my-4">
            <h1>News Page</h1>
            <Row>
                {newsData.length > 0 ? (
                    newsData.slice(0, visibleNewsCount).map((item, index) => (
                        <Col key={index} sm={12} md={4} className="mb-4">
                            <Card
                                className="news-card"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    if (item.links?.web?.href) {
                                        window.open(item.links.web.href, '_blank');
                                    }
                                }}
                            >
                                <Card.Img
                                    variant="top"
                                    src={item.imageUrl}
                                    alt={item.headline}
                                />
                                <Card.Body>
                                    <Card.Title>{item.headline}</Card.Title>
                                    <Card.Text>{truncateDescription(item.description, 100)}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Row>
            {visibleNewsCount < newsData.length && (
                <div className="text-center mt-4">
                    <Button onClick={loadMoreNews} variant="primary">
                        See More
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default NewsPage;
