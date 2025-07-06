import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';
import type { StudentFilters } from '../types';

interface StudentFiltersProps {
  filters: StudentFilters;
  onFiltersChange: (filters: StudentFilters) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export function StudentFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false,
}: StudentFiltersProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const newFilters: StudentFilters = {
      search: allValues.search,
    };
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    form.resetFields();
    onClearFilters();
  };

  return (
    <Card className="mb-4">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={filters}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="search" label={t(messages.searchStudents)}>
              <Input
                placeholder={t(messages.searchStudents)}
                prefix={<SearchOutlined />}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item label=" " className="mb-0">
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  loading={loading}
                  htmlType="submit"
                >
                  {t(messages.searchStudents)}
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleClearFilters}
                  disabled={loading}
                >
                  {t(messages.clearFilters)}
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
