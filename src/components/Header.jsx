import {Container, Nav, Navbar} from "react-bootstrap";

function Header(){
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/stream_client/#">Sport Live</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/stream_client/#">Home</Nav.Link>
                            <Nav.Link href="/stream_client/#">About Us</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="/stream_client/#">Dark memes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;