import { Button, Space, Tooltip } from 'antd';

type Action = {
  title: string;
  buttonIcon: React.ReactNode;
  onClick: () => void;
};
function ActionsTooltip({ title, buttonIcon, onClick }: Action) {
  return (
    <Tooltip title={title}>
      <Button type="text" size="small" icon={buttonIcon} onClick={onClick} />
    </Tooltip>
  );
}

export default function TableActions({ actions }: { actions: Action[] }) {
  return (
    <Space size="small">
      {actions.map((action) => (
        <ActionsTooltip key={action.title} {...action} />
      ))}
    </Space>
  );
}
