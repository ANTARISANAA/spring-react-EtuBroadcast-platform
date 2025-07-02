import { Alert, type AlertProps, Typography } from 'antd';

interface BaseErrorAlertProps extends AlertProps {
  title?: string;
  message?: string;
  description?: string;
}
export default function BaseErrorAlert({
  title,
  message,
  description,
}: BaseErrorAlertProps) {
  return (
    <div className="py-8 pr-7">
      <Alert
        type="error"
        description={
          <div>
            {title && <Typography.Title level={3}>{title}</Typography.Title>}

            {message && (
              <div>
                <Typography.Text className="text-primary">
                  {message}
                </Typography.Text>
              </div>
            )}

            {description && (
              <div className="mt-2">
                <Typography.Text className="text-primary text-xl font-bold">
                  {description}
                </Typography.Text>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
