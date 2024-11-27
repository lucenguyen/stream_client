import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function Header() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/" className="fs-2">Sexy68</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Watch" id="watch-dropdown">
                                <NavDropdown.Item onClick={() => scrollToSection('channel-list-section')}>NHL Hockey</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => scrollToSection('channel-list-section')}>NBA Basketball</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => scrollToSection('channel-list-section')}>NFL Football</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => scrollToSection('news-section')}>News</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => scrollToSection('featured-articles-section')}>Featured Articles</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/news">News</Nav.Link>
                            <Nav.Link href="/admin">Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
export default Header;
