import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/style/components/Footer.css';
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 position-relative">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-2">© 2025 Tên Ứng Dụng. All rights reserved.</p>
            <div className="d-flex justify-content-center gap-3">
              <a href="/privacy" className="text-white">Chính sách bảo mật</a>
              <a href="/terms" className="text-white">Điều khoản dịch vụ</a>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-2">
                <a href="https://facebook.com" className="text-white"><i className="fab fa-facebook-f"></i>Facebook</a>
                <a href="https://twitter.com" className="text-white"><i className="fab fa-twitter"></i>Twitter</a>
            </div>
          </Col>
        </Row>
        
      </Container>
    </footer>
  );
};

export default Footer;