import { Col, Row } from 'antd';
import React from 'react';
import MonthlyRevenue from './MonthlyRevenue';

function Dashboard() {
  return (
    <Row className="p-32" gutter={[32, 32]}>
      {/* doanh thu theo tháng */}
      <Col span={24} xl={12}>
        <div className="bg-white p-12 bor-rad-8 box-sha-home">
          <MonthlyRevenue />
        </div>
      </Col>
    </Row>
  );
}

export default Dashboard;
