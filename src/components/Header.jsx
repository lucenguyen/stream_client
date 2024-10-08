import {Button, Container, Nav, Navbar} from "react-bootstrap";

function Header(){
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/" className="fs-2">Sexy68</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            {/* <Nav.Link href="stream_client/">About Us</Nav.Link> */}
                        </Nav>
                        <Nav>
                            <Button variant="dark" className="btn btn-outline-light me-2">Contact Us</Button>
                            <Button variant="success" className="btn btn-success me-2">Join Our Discord</Button>
                            <Button variant="primary" className="btn btn-primary">Subscribe Now</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;