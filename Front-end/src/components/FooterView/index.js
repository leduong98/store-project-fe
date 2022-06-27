import {
  FacebookFilled,
} from '@ant-design/icons';
import iconPhoneFooter from 'assets/imgs/icon-phone-footer.png';
import React from 'react';
import './index.scss';
function FooterView() {
  return (
    <div className="container-fluid bg-white footer p-lr-0" id="footer">
      {/* Liên hệ */}
      {/* Thông tin chi tiết */}
      <div className="container p-tb-32">
        <p className="t-center" style={{ color: '#888' }}>
          <span className="font-size-18px">
            CỬA HÀNG CUNG CẤP CAMERA GIÁM SÁT - WICAMERAS
          </span>
          <br />
          <strong>Địa chỉ:</strong>&nbsp;Số 20 Phố Viên, Đức Thắng, Bắc Từ Liêm,
          Thành phố Hà Nội
          <br/>
          <strong>Điện&nbsp;thoại:</strong>&nbsp;0335.12.1234 |{' '}
          <strong>Email:</strong>&nbsp;wicam@gmail.com&nbsp;|{' '}
          <strong>Website:</strong>&nbsp;<a href="/">Wistore.vn</a>
        </p>
        <div className="d-flex align-i-center justify-content-center">
          <div className="d-flex align-i-center m-lr-32">
            <img src={iconPhoneFooter} />
            <div className="t-center m-l-16">
              <h2 style={{ color: '#CE1F26' }}>Hotline</h2>
              <h2 style={{ color: '#CE1F26' }}>0335.12.1234</h2>
            </div>
          </div>
          <div className="d-flex">
            <a href="https://fb.com" target="blank">
              <FacebookFilled
                className="p-lr-4 social-item"
                style={{ fontSize: 36, color: '#0C86EF' }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterView;
