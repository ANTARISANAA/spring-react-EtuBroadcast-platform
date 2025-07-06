import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="relative h-screen w-screen">
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to="/">Back Home</Link>
      </Button>
    }
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    />
    </div>
);

export default NotFound;
