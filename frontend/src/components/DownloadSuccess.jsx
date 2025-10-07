import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const DownloadSuccess = () => {
  const [downloadLink, setDownloadLink] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const product = searchParams.get('product');

  useEffect(() => {
    if (!product) {
      setError('Không xác định được sản phẩm bạn đã mua.');
      return;
    }

    axios.get('http://localhost:5000/api/download')
      .then(res => {
        if (product === 'convert') {
          setDownloadLink(res.data.convertLink);
        } else if (product === 'convertm') {
          setDownloadLink(res.data.convertmLink);
        } else {
          setError('Sản phẩm không hợp lệ.');
        }
      })
      .catch(() => {
        setError('Không thể lấy link tải. Vui lòng liên hệ hỗ trợ.');
      });
  }, [product]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>Thanh toán thành công!</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p>Bấm nút dưới để tải phần mềm bạn đã mua.</p>
          {downloadLink ? (
            <a href={downloadLink} download>
              <button style={{ padding: '10px 20px', fontSize: '18px' }}>Tải ngay</button>
            </a>
          ) : (
            <p>Đang lấy link tải...</p>
          )}
        </>
      )}
    </div>
  );
};

export default DownloadSuccess;
