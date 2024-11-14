import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import {useState} from "react";
import LoginAPI from "../api/LoginAPI";
import {toast} from "react-toastify";
import {saveData, saveDataWithExpiry} from "../utils/LocalStorage";
import {useNavigate} from "react-router-dom";


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            "username": username,
            "password": password
        }
        try {
            const response = await LoginAPI.login(user);
            if (!response.data) {
                toast.error("Password is incorrect");
            } else {
                saveDataWithExpiry("user", {"username": username});
                navigate("/admin")
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;