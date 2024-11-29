import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaArrowRight, FaNewspaper } from "react-icons/fa";

const News = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const fakeData = [
                { title: "Pelissero: 22 rising coaches to know ahead of the coming hiring cycle", link: "#" },
                { title: "Power Rankings: Seismic Sunday reshuffles NFL deck; Bills jump to No. 2", link: "#" },
                { title: "WR Adams not surprised by Douglas’ firing, doesn’t regret trade to Jets", link: "#" },
                { title: "Bucs’ Evans (hamstring) trending toward Sunday return vs. Giants", link: "#" },
                { title: "Eli Manning among six first-year eligible players named ’25 HOF semifinalists", link: "#" },
                { title: "Browns’ Garrett: Steelers’ Watt should ‘apologize’ for DPOY snub", link: "#" },
                { title: "Purdy (shoulder) limited; Kittle (hamstring) says he’ll play for SF vs. GB", link: "#" },
                { title: "Players of the Week: Bo knows offensive honors; Pack block party continues", link: "#" },
                { title: "Roundup: Eagles, Vikings QBs limited in practice; Cowboys DB out for year", link: "#" },
            ];
            setTimeout(() => {
                setNewsData(fakeData);
            }, 1000);
        };
        fetchData();
    }, []);

    return (
        <Container className="my-4" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
            <Row>
                <Col>
                    <h4 className="mb-3 news-title" style={{ textDecoration: "underline", fontStyle: "italic", fontWeight: "bold", fontSize: "15px" }}>
                        NEWS
                    </h4>
                    <div className="news-list">
                        {newsData.map((item, index) => (
                            <Card key={index} className="border-0 border-bottom mb-2 pb-2" style={{ background: "transparent" }}>
                                <Card.Link href={item.link} className="text-decoration-none text-dark">
                                    <FaNewspaper className="me-2" />
                                    {item.title}
                                </Card.Link>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-3 text-center">
                        <Button variant="link" href="#" className="text-decoration-none text-dark d-flex align-items-center justify-content-center">
                            More News
                            <FaArrowRight className="ms-2" />
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default News;
