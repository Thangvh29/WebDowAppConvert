import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/style/sections/Section5.css';
const Section5 = () => {
  return (
    <section id="section5" className="py-5 bg-light position-relative">
  <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
  <Container className="text-center position-relative">
    <h2 className="mb-4">Donate</h2>
    <p className="lead mb-4">Ủng hộ tác giả qua mã QR bên dưới ❤️</p>
    <img src="../../src/assets/qr.png" alt="QR Code" className="img-fluid" style={{ maxWidth: '200px' }} />
  </Container>
</section>
  );
};

export default Section5;