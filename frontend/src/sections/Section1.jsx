import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../assets/style/sections/Section1.css';
import iconapp from '../assets/img/capybara.webp';

const Section1 = () => {
  const [downloadLinks, setDownloadLinks] = useState({ convertLink: '', convertmLink: '' });
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/download')
      .then((response) => {
        setDownloadLinks({
          convertLink: response.data.convertLink,
          convertmLink: response.data.convertmLink,
        });
      })
      .catch((error) => {
        console.error('Lỗi khi lấy link tải:', error);
      });
  }, []);

  // Mở modal chọn phiên bản
  const handleShowVersionModal = () => setShowVersionModal(true);
  const handleCloseVersionModal = () => setShowVersionModal(false);

  // Mở modal chọn cổng thanh toán
  const openPaymentOptions = (product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
  };
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  // Thanh toán MoMo
  const payWithMoMo = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/payment/momo', {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        amount: selectedProduct.price
      });
      if (res.data?.payUrl) {
        window.location.href = res.data.payUrl;
      } else {
        alert('Không tạo được link thanh toán MoMo.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tạo đơn MoMo.');
    }
  };

  // Thanh toán VNPAY
  const payWithVnPay = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/payment/vnpay', {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        amount: selectedProduct.price
      });
      if (res.data?.payUrl) {
        window.location.href = res.data.payUrl;
      } else {
        alert('Không tạo được link thanh toán VNPAY.');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tạo đơn VNPAY.');
    }
  };

  return (
    <section id="section1" className="d-flex align-items-center min-vh-100 bg-light">
      <Container className="text-center">
        <img src={iconapp} alt="App Icon" className="img-fluid mb-3" style={{ maxWidth: '150px' }} />
        <h1 className="display-4 mb-3">Convert</h1>
        <p className="lead mb-4">Ứng dụng tuyệt vời giúp bạn chuyển đổi file mp3/mp4 một cách dễ dàng!</p>
        <Button variant="primary" size="lg" onClick={handleShowVersionModal}>
          Mua Ứng Dụng
        </Button>

        {/* Modal chọn phiên bản */}
        <Modal show={showVersionModal} onHide={handleCloseVersionModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Chọn Phiên Bản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-4">
              <Col xs={12} md={6}>
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Title>Convert</Card.Title>
                    <Card.Text>Phiên bản cho máy có LibreOffice.</Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={() => openPaymentOptions({ id: 'convert', name: 'Convert', price: 20000 })}
                    >
                      Mua Convert (20,000₫)
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={6}>
                <Card className="h-100 text-center">
                  <Card.Body>
                    <Card.Title>ConvertM</Card.Title>
                    <Card.Text>Phiên bản cho máy có Microsoft.</Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto"
                      onClick={() => openPaymentOptions({ id: 'convertm', name: 'ConvertM', price: 30000 })}
                    >
                      Mua ConvertM (30,000₫)
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseVersionModal}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal chọn phương thức thanh toán */}
        <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Bạn đang mua: <strong>{selectedProduct?.name}</strong> — <strong>{selectedProduct?.price.toLocaleString()}₫</strong></p>
            <Row className="g-3">
              <Col xs={12} md={6}>
                <Button variant="warning" className="w-100" onClick={payWithMoMo}>Thanh toán bằng MoMo</Button>
              </Col>
              <Col xs={12} md={6}>
                <Button variant="info" className="w-100" onClick={payWithVnPay}>Thanh toán bằng VNPAY</Button>
              </Col>
            </Row>
            <p className="mt-3 text-muted">Sau khi thanh toán xong bạn sẽ được chuyển về trang tải.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePaymentModal}>Hủy</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default Section1;
