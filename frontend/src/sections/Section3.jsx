import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/style/sections/Section3.css';
const Section3 = () => {
  return (
    <section id="section3" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Hướng Dẫn Sử Dụng</h2>
        <Row className="g-4">
  {[
    { img: '/assets/step1.png', alt: 'Step 1', title: 'Bước 1: Cài đặt', text: 'Tải và cài đặt ứng dụng từ nút tải ở trên.' },
    { img: '/assets/step1.png', alt: 'Step 2', title: 'Bước 2: Khởi chạy ứng dụng', text: 'Sau khi cài đặt thành công hãy mở lên' },
    { img: '/assets/step1.png', alt: 'Step 3', title: 'Bước 3: Sử dụng', text: 'Mọi hướng dẫn đã có trong App' }
  ].map((step, index) => (
    <Col md={4} key={index} style={{ '--i': index }}>
      <img src={step.img} alt={step.alt} className="img-fluid mb-2" />
      <h5>{step.title}</h5>
      <p>{step.text}</p>
    </Col>
  ))}
</Row>
      </Container>
    </section>
  );
};

export default Section3;