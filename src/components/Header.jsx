import { Button, Container, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa"; // Import icon

function Header() {
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const channels = useSelector((state) => state.channels).channels;

    const groups = Array.from(new Set(channels.map((channel) => channel.group)));

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className={`${
                darkMode ? "bg-dark text-white" : "bg-body-tertiary"
            }`}
            data-bs-theme={darkMode ? "dark" : "light"}
        >
            <Container>
                <Navbar.Brand
                    href="/"
                    className={`fs-2 ${darkMode ? "text-white" : "text-dark"}`}
                >
                    USA Sport Live
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a
                                href="/"
                                className={`nav-link ${darkMode ? "text-white" : "text-dark"}`}
                            >
                                <i className="fa fa-home" aria-hidden="true"></i> Home
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <NavDropdown
                                title={
                                    <>
                                        <i className="fa fa-television" aria-hidden="true"></i> Watch
                                    </>
                                }
                                id="watch-dropdown"
                                className={darkMode ? "text-white" : "text-dark"}
                            >
                                {groups.map((group) => (
                                    <NavDropdown.Item
                                        key={group}
                                        onClick={() =>
                                            scrollToSection(
                                                `${group
                                                    .replace(/\s+/g, "-")
                                                    .toLowerCase()}-section`
                                            )
                                        }
                                    >
                                        {group}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/news"
                                className={`nav-link ${darkMode ? "text-white" : "text-dark"}`}
                            >
                                <i className="fa fa-newspaper-o" aria-hidden="true"></i> News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                href="/login"
                                className={`nav-link ${darkMode ? "text-white" : "text-dark"}`}
                            >
                                <i className="fa fa-user" aria-hidden="true"></i> Sign In
                            </a>
                        </li>
                        <li className="nav-item pt-1">
                            <Button
                                onClick={toggleTheme}
                                className={`ms-3 p-0 bg-transparent border-0 ${
                                    darkMode ? "text-white" : "text-dark"
                                }`}
                            >
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
