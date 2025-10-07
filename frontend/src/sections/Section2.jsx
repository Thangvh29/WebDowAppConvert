import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/style/sections/Section2.css';
const Section2 = () => {
  return (
    <section id="section2" className="py-5">
      <Container>
        <h2 className="text-center mb-4">Giới Thiệu & Tính Năng</h2>
        <p className="text-center lead mb-4">
          Convert là giải pháp hoàn hảo cho nhu cầu của bạn. Với giao diện thân thiện và tính năng tốt!
        </p>
        <ul className="list-group list-group-flush mx-auto" style={{ maxWidth: '600px' }}>
          {[
            'Tính năng 1: Các lựa chọn chuyển đổi phù hợp bạn cần.',
            'Tính năng 2: Hỗ trợ người dùng tối đa.',
            'Tính năng 3: Tốc độ nhanh, hiệu quả cao.',
            'Tính năng 4: Tùy chỉnh linh hoạt.',
            'Lưu ý: Convert chon những máy dùng liber Office còn ConvertM cho Những máy Microsoft ofice.'
          ].map((item, index) => (
            <li
              key={index}
              className={`list-group-item ${item.includes('Lưu ý') ? 'Note' : ''}`}
              style={{ '--i': index }}
            >
              {item.includes('Lưu ý') ? item : <><i className="fas fa-check-circle me-2"></i>{item}</>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Section2;