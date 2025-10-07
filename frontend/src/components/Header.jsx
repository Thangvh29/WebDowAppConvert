import React from 'react';
import { Link } from 'react-scroll';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../assets/style/components/Header.css'
import iconapp from '../assets/img/capybara.png';
const Header = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>
          <img src={iconapp} alt="Logo" width="100" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="section1" smooth={true} duration={500} className="nav-link">Giới thiệu</Link>
            <Link to="section3" smooth={true} duration={500} className="nav-link">Hướng dẫn</Link>
            <Link to="section4" smooth={true} duration={500} className="nav-link">Đánh giá</Link>
            <Link to="section5" smooth={true} duration={500} className="nav-link">Donate</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
<Nav className="ms-auto">
  {['section1', 'section3', 'section4', 'section5'].map((section, index) => (
    <Link
      key={index}
      to={section}
      smooth={true}
      duration={500}
      className="nav-link"
      activeClass="active"
      spy={true}
    >
      {section === 'section1' ? 'Giới thiệu' : section === 'section3' ? 'Hướng dẫn' : section === 'section4' ? 'Đánh giá' : 'Donate'}
    </Link>
  ))}
</Nav>

export default Header;