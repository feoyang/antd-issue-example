import {
  Input,
  Form,
  Modal,
  message,
  Checkbox,
  Typography,
  CheckboxProps,
  Spin,
  Select,
  InputNumber,
  Row,
  Col,
  Space,
} from 'antd';
import { useRequest } from 'ahooks';
import { useState, useEffect } from 'react';
import { createProgramModalStyle } from '../style';
import { requestIrrigationAreasByGatewayId } from '../../../../../services/requests/xlyk-device';

export interface CreateProgramModalProps {
  gatewayId: number;
  open: boolean;
  onCancel: () => void;
}

export const CreateProgramModal = ({
  gatewayId,
  open,
  onCancel,
}: CreateProgramModalProps) => {
  const { styles } = createProgramModalStyle();
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [form] = Form.useForm();

  // 当open或gatewayId变化时重新请求
  // 只有当modal打开时才发送请求
  const { data: irrigationAreas, loading: requestIrrigationAreasLoading } = useRequest(
    requestIrrigationAreasByGatewayId,
    {
      defaultParams: [gatewayId],
      refreshDeps: [open, gatewayId],
      ready: open,
      onError: (error) => {
        message.error(error.message);
      },
    },
  );

  // 当模态框打开时重置状态
  useEffect(() => {
    if (open) {
      setCheckedList([]);
      form.resetFields();
    }
  }, [open, form]);

  const handleOk = () => {
    message.info('点击了创建程序！');
  };

  const checkAll = (irrigationAreas?.length ?? 0) === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < (irrigationAreas?.length ?? 0);

  const onChange = (list: number[]) => {
    setCheckedList(list);
    form.setFieldValue('areaIds', list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    const allIds = irrigationAreas?.map((item) => item.Id) ?? [];
    const newCheckedList = e.target.checked ? allIds : [];
    setCheckedList(newCheckedList);
    form.setFieldValue('areaIds', newCheckedList);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="创建程序"
      width={600}
      classNames={{
        body: styles.modalBody,
      }}
      centered
      onOk={handleOk}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="任务名称"
          name="name"
          rules={[{ required: true, message: '请输入任务名称' }]}
        >
          <Input placeholder="请输入任务名称" />
        </Form.Item>
        <Form.Item
          label={
            <Space size="middle">
              选择灌区
              {
                irrigationAreas?.length && irrigationAreas?.length > 0 ?
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                  >
                    全选
                  </Checkbox> : null
              }
            </Space>
          }
          name="areaIds">
          <Spin spinning={requestIrrigationAreasLoading}>
            {irrigationAreas?.length && irrigationAreas?.length > 0 ?
              <Checkbox.Group value={checkedList} onChange={onChange}>
                {irrigationAreas?.map((item, index) => (
                  <Checkbox key={item.Id} value={item.Id}>
                    {item.Zonename || `灌区${index + 1}`}
                  </Checkbox>
                ))}
              </Checkbox.Group>
              : <Typography.Text type="secondary">此网关下暂无灌区</Typography.Text>
            }
          </Spin>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="循环次数（次）"
              name="cycleCount"
              rules={[{ required: true, message: '请输入循环次数' }]}
            >
              <InputNumber placeholder="请输入循环次数" min={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="循环间隔（分钟）"
              name="cycleInterval"
              rules={[{ required: true, message: '请输入循环间隔' }]}
            >
              <InputNumber placeholder="请输入循环间隔" min={0} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="肥前时长（分钟）"
              name="preFertilizerDuration"
              rules={[{ required: true, message: '请输入肥前时长' }]}
            >
              <InputNumber
                placeholder="1"
                min={0}
                defaultValue={1}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="施肥时长（分钟）"
              name="fertilizerDuration"
              rules={[{ required: true, message: '请输入施肥时长' }]}
            >
              <InputNumber
                placeholder="0"
                min={0}
                defaultValue={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="肥后时长（分钟）"
              name="postFertilizerDuration"
              rules={[{ required: true, message: '请输入肥后时长' }]}
            >
              <InputNumber
                placeholder="1"
                min={0}
                defaultValue={1}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="选择配方"
          name="recipe"
          rules={[{ required: true, message: '请选择配方' }]}
        >
          <Select placeholder="请选择配方" style={{ width: '100%' }}>
            {/* 这里可以根据实际需要添加配方选项 */}
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};
