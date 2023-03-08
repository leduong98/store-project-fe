import {
  Col,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography
} from "antd";
import { useForm, Controller } from "react-hook-form";
import React, {
  useEffect,
  useState
} from 'react';
import productApi
  from "../../../apis/productApi";
import axiosClient
  from "../../../apis/axiosClient";
const { Title, Text } = Typography;

const ImportProductForm = (props) => {

  const [options, setOptions] = useState([])

    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            qty: ''
        }
    })

    async function fetchData() {
      const reponse = await productApi.getAllProductsName()
      const optionsToset = []
      reponse.data.forEach(e => {
        optionsToset.push({id: e.id, name: e.name})
      })
      setOptions(optionsToset)
    }

    useEffect( () => {
      fetchData();
    }, [])

      useEffect(() => {
        reset(props.value)
      }, [])

    const onSubmit = async (data) => {
        data = {'product_id': data.name,'quantity': data.qty,'price': data.price, 'json_type': 'productSource'}
            const url = '/product-source';
         await axiosClient.post(url, data);
        props.cancel()
        props.getList()
    }

    return (
        <Modal title={'Nhập thêm sản phẩm'}
            visible={props.visible} onOk={handleSubmit(onSubmit)} onCancel={props.cancel}
            width={1000}
        >
            <Row gutter={20}>
                <Col span={12}>
                    <Title level={5}>Tên: </Title>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => <Select style={{ width: '100%' }} {...field}>
                          {
                            options.map((item, index) => (<Select.Option value={item.id} key={index}>
                              {item.name}
                            </Select.Option>))
                          }
                        </Select>}
                    />
                    {errors?.name?.type === 'required' && <p><Text type='danger'>Tên không được bỏ trống</Text></p>}
                </Col>
                <Col span={6}>
                  <Title level={5}>Giá nhập: </Title>
                    <Controller
                        name="price"
                        control={control}
                        rules={{ required: true, min: 1000, max: 1000000000000 }}
                        render={({ field }) => <InputNumber style={{width: '100%'}} {...field} />}
                    />
                  {errors?.price?.type === 'required' && <p><Text type='danger'>Giá không thể để trống</Text></p>}
                  {errors?.price?.type === 'min' && <p><Text type='danger'>Giá phải lớn hơn hoặc bằng 1000 VND</Text></p>}
                  {errors?.price?.type === 'max' && <p><Text type='danger'>Giá phải nhỏ hơn hoặc bằng 1.000.000.000.000 VND</Text></p>}
                </Col>
                <Col span={16}>
                <Title level={5}>Số lượng: </Title>
                    <Controller
                        name="qty"
                        control={control}
                        rules={{ required: true, min: 1, max: 1000 }}
                        render={({ field }) => <InputNumber {...field} />}
                    />
                  {errors?.qty?.type === 'required' && <p><Text type='danger'>Số lượng không được bỏ trống</Text></p>}
                  {errors?.qty?.type === 'min' && <p><Text type='danger'>Số lượng phải lớn hơn hoặc bằng 1</Text></p>}
                  {errors?.qty?.type === 'max' && <p><Text type='danger'>Số lượng phải nhỏ hơn hoặc bằng 1000</Text></p>}
                </Col>
            </Row>
        </Modal>)
}

export default ImportProductForm;
