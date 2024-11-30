import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const channels = useSelector(state => state.channels).channels;

    const groups = Array.from(new Set(channels.map(channel => channel.group)));

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Navbar
                collapseOnSelect
                expand="lg"
                className={darkMode ? "bg-dark text-white" : "bg-body-tertiary"}
                data-bs-theme={darkMode ? "dark" : "light"}
            >
                <Container>
                    <Navbar.Brand href="/" className="fs-2">Sexy68</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <NavDropdown title="Watch" id="watch-dropdown">
                                {groups.map((group) => (
                                    <NavDropdown.Item
                                        key={group}
                                        onClick={() => scrollToSection(`${group.replace(/\s+/g, '-').toLowerCase()}-section`)}
                                    >
                                        {group}
                                    </NavDropdown.Item>
                                ))}
                                <NavDropdown.Item onClick={() => scrollToSection('news-section')}>News</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => scrollToSection('featured-articles-section')}>Featured Articles</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/news">News</Nav.Link>
                            <Nav.Link href="/admin">Sign In</Nav.Link>
                            {/* Button Toggle Theme */}
                            <Button
                                onClick={toggleTheme}
                                variant={darkMode ? "outline-light" : "outline-dark"}
                                className="ms-3"
                            >
                                {darkMode ? "Light Mode" : "Dark Mode"}
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
