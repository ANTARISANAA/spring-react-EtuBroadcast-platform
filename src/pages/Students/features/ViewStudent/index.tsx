import { createModal, useModalParams } from '@/core/components/modals';
import type { Student } from '../../types';
import StudentForm from '../StudentForm';

export default function ViewStudent() {
  const modalParams = useModalParams<{
    student: Student;
  }>();

  const initialValues = modalParams?.student ?? undefined;

  return <StudentForm initialValues={initialValues} isViewMode />;
}

export const ViewStudenttModal = createModal({
  key: 'view-student',
  element: <ViewStudent />,
  size: 'medium',
});
