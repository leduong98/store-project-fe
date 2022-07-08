import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, InputNumber, message, Popconfirm, Row, Spin, Table, Typography } from 'antd';
import adminApi from 'apis/adminApi';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';

const { Title, Text } = Typography;

const defaultDiscount = {
  id: 0,
  name: '',
  startDate: '',
  endDate: '',
  discount: null,
}


function DiscountList(props) {
  const [dataColumn, setDataColumn] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState('insert');
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(1);

  const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
    defaultValues: { ...defaultDiscount }
  })

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
      align: 'center',
      width: '10%'
    },
    {
      title: 'Tên',
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      width: '20%'
    },
    {
      title: '% Giảm giá',
      key: 'discount',
      align: 'center',
      dataIndex: 'discount',
      width: '10%'
    },
    {
      title: 'Ngày bắt đầu',
      key: 'startDate',
      align: 'center',
      dataIndex: 'startDate',
      width: '20%'
    },
    {
      title: 'Ngày kết thúc',
      key: 'endDate',
      align: 'center',
      dataIndex: 'endDate',
      width: '20%'
    },
    {
      title: 'Action',
      align: 'center',
      render: (_v, records) => (
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='primary' icon={<EditOutlined />} onClick={() => updateDiscount(records)}> Sửa</Button>
          &nbsp;
          &nbsp;
          <Popconfirm
            title="Bạn có chắc muốn xoá ?"
            placement="left"
            cancelText="Huỷ bỏ"
            okText="Xoá"
            onConfirm={() => onDelCategory(records.id)}>
            <Button danger icon={<DeleteOutlined />}>Xoá</Button>
          </Popconfirm>
        </Row>

      ),
    },
  ];

  const onDelCategory = async (id) => {
    try {
      const response = await adminApi.deleteDiscount(id);
      if (response && response.status === 200) {
        message.success('Xóa discount thành công');
        getDiscountList()
      }
    } catch (error) {
      message.error('Xoá discount thất bại');
    }
  };

  async function getDiscountList() {
    try {
      setIsLoading(true);
      const response = await adminApi.getAllDiscount(props.productId);
      if (response) {
        const { data } = response.data;
        setDataColumn([...data]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDiscountList();
  }, [props.productId]);

  const updateDiscount = (item = null) => {
    setAction("update")
    reset(item)
  }

  const handleChangeTable = event => {
    setPage(event.current)
  }

  const changeDate = (e, filed) => {
    setValue(filed, e.format('YYYY-MM-DD'))
  }

  const onSubmit = async data => {
    data = { ...data, 'json_type': 'discount', product_id: props.productId }
    if (action === 'insert') {
      await adminApi.insertDiscount(data)
    } else {
      await adminApi.updateDiscount(data)
    }
    reset(defaultDiscount)
    getDiscountList()
  }

  const cancelUpdate = () => {
    setAction("insert");
    reset(defaultDiscount);
  }

  return (
    <>
      {isLoading ? (
        <Spin className="trans-center" tip="Đang lấy danh sách ..." />
      ) : (
        <div style={{ padding: '10px 10px 10px 10px' }}>
          <Row gutter={[20, 10]}>
            <Col span={6}>
              <Title level={5}>Tên </Title>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <Input {...field}
                />}
              />
              {errors?.name?.type === 'required' && <p><Text type='danger'>Tên không được bỏ trống</Text></p>}
            </Col>
            <Col span={6}>
              <Title level={5}>% Giảm giá </Title>
              <Controller
                name="discount"
                control={control}
                rules={{ required: true, min: 10, max: 100 }}
                render={({ field }) => <InputNumber style={{ width: '100%' }} {...field}
                />}
              />
              {errors?.discount?.type === 'required' && <p><Text type='danger'>% giảm giá không được bỏ trống</Text></p>}
              {errors?.discount?.type === 'min' && <p><Text type='danger'>% giảm giá lớn hơn hoặc bằng 1</Text></p>}
              {errors?.discount?.type === 'max' && <p><Text type='danger'>% giảm giá nhỏ hơn hoặc bằng 100</Text></p>}
            </Col>
            <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
              <Button type="primary" icon={action === 'insert' ? <PlusOutlined /> : <EditOutlined />} onClick={handleSubmit(onSubmit)}>
                {action === 'insert' ? 'Thêm' : 'Cập nhật'}
              </Button> &nbsp;
              {action === 'update' && <Button onClick={() => cancelUpdate()}>
                Cancel
              </Button>}
            </Col>
            <Col span={6}>
              <Title level={5}>Ngày bắt đầu </Title>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DatePicker value={field.value ? moment(field.value, "YYYY-MM-DD") : ''} style={{ width: '100%' }} onChange={(e) => changeDate(e, "startDate")} />}
              />
              {errors?.startDate?.type === 'required' && <p><Text type='danger'>Ngày bắt đầu không được bỏ trống</Text></p>}
            </Col>
            <Col span={6}>
              <Title level={5}>Ngày kết thúc </Title>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <DatePicker value={field.value ? moment(field.value, "YYYY-MM-DD") : ''} style={{ width: '100%' }} onChange={(e) => changeDate(e, "endDate")}
                />}
              />
              {errors?.endDate?.type === 'required' && <p><Text type='danger'>Ngày kết thúc không được bỏ trống</Text></p>}
            </Col>
          </Row>
          <br></br>
          <Table
            columns={columns}
            dataSource={dataColumn}
            onChange={handleChangeTable}
            pagination={{ showLessItems: true, position: ['bottomCenter'], pageSize: 5, current: page }}
          />
        </div>
      )}
    </>
  );
}

export default DiscountList;
