import {Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useState} from "react";
import ChannelListAPI from "../api/ChannelListAPI";
import {redirect, useNavigate} from "react-router-dom";

function AddStream() {
    const [name, setName] = useState("");
    const [group, setGroup] = useState("");
    const [logo, setLogo] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const addStream = async (event) => {
        event.preventDefault();
        const newStream = {
            "name": name,
            "group": group,
            "logoUrl": logo,
            "streamUrl": url,
        }

        const response = await ChannelListAPI.addChannel(newStream);
        console.log(response)
        if (response.data === true) {
            console.log("run here")
            navigate("/")
        }
    }
    return (
        <div className="d-flex justify-content-center">
            <Card className="m-4" style={{'width': '70vw'}}>
                <Form className="m-5" onSubmit={addStream}>
                    <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm="2">Name</FormLabel>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                placeholder="Name stream"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm="2">Group</FormLabel>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                placeholder="Group"
                                value={group}
                                onChange={(e) => setGroup(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="mb-3">
                        <FormLabel column sm="2">Logo</FormLabel>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                placeholder="logo Url"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup as={Row} className="mb-lg-5">
                        <FormLabel column sm="2">Stream link</FormLabel>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                placeholder="stream Url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Form.Group as={Row}>
                        <Col sm={{span: 6, offset: 6}}>
                            <Button type="submit">Add Stream</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Card>
        </div>
    )
}

export default AddStream;