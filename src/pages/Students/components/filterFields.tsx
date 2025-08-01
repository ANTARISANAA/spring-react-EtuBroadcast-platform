import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';
import type { StudentFilters } from '../types';

interface StudentFiltersProps {
  filters: StudentFilters;
  loading?: boolean;
  onReset: () => void;
  setFilterParams: (params: any) => void;
}

export function StudentFilters({
  filters,
  loading = false,
  onReset,
  setFilterParams,
}: StudentFiltersProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleClearFilters = () => {
    form.resetFields();
    onReset?.();
  };

  const handleSearch = (values: any) => {
    // Remove empty values
    const cleanValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] && values[key].trim() !== '') {
        acc[key] = values[key].trim();
      }
      return acc;
    }, {} as any);
    
    setFilterParams(cleanValues);
  };
  
  return (
    <Card className="mb-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSearch}
        initialValues={filters}
      >
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Form.Item name="search" label={t(messages.searchStudents)}>
              <Input
                placeholder={t('pages.Students.searchPlaceholder')}
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
