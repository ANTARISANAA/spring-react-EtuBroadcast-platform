import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Slider,
  Space,
} from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';
import type { StudentFilters } from '../types';

const { RangePicker } = DatePicker;
const { Option } = Select;

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
      status: allValues.status,
      gender: allValues.gender,
      grade: allValues.grade,
      major: allValues.major,
      enrollmentDateRange: allValues.enrollmentDateRange,
      gpaRange: allValues.gpaRange,
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
            <Form.Item name="status" label={t(messages.filterByStatus)}>
              <Select placeholder={t(messages.filterByStatus)} allowClear>
                <Option value="active">{t(messages.active)}</Option>
                <Option value="inactive">{t(messages.inactive)}</Option>
                <Option value="graduated">{t(messages.graduated)}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="gender" label={t(messages.filterByGender)}>
              <Select placeholder={t(messages.filterByGender)} allowClear>
                <Option value="male">{t(messages.male)}</Option>
                <Option value="female">{t(messages.female)}</Option>
                <Option value="other">{t(messages.other)}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="grade" label={t(messages.filterByGrade)}>
              <Select placeholder={t(messages.filterByGrade)} allowClear>
                <Option value="Freshman">Freshman</Option>
                <Option value="Sophomore">Sophomore</Option>
                <Option value="Junior">Junior</Option>
                <Option value="Senior">Senior</Option>
                <Option value="Graduate">Graduate</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="major" label={t(messages.filterByMajor)}>
              <Select placeholder={t(messages.filterByMajor)} allowClear>
                <Option value="Computer Science">Computer Science</Option>
                <Option value="Engineering">Engineering</Option>
                <Option value="Business">Business</Option>
                <Option value="Arts">Arts</Option>
                <Option value="Sciences">Sciences</Option>
                <Option value="Medicine">Medicine</Option>
                <Option value="Law">Law</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              name="enrollmentDateRange"
              label={t(messages.filterByEnrollmentDate)}
            >
              <RangePicker
                placeholder={[
                  t(messages.filterByEnrollmentDate),
                  t(messages.filterByEnrollmentDate),
                ]}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item name="gpaRange" label={t(messages.filterByGPA)}>
              <Slider
                range
                min={0}
                max={4}
                step={0.1}
                marks={{
                  0: '0.0',
                  1: '1.0',
                  2: '2.0',
                  3: '3.0',
                  4: '4.0',
                }}
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
