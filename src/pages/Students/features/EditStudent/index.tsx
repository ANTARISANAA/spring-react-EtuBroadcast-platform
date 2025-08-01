import { createModal, useModalParams } from '@/core/components/modals';
import { editStudentProducer } from '../../data/producers';
import type { Student } from '../../types';
import StudentForm from '../StudentForm';

export default function EditStudent() {
  const modalParams = useModalParams<{
    student: Student;
  }>();

  const initialValues = modalParams?.student ?? undefined;

  return (
    <StudentForm initialValues={initialValues} producer={editStudentProducer} />
  );
}

export const EditStudentModal = createModal({
  key: 'edit-student',
  element: <EditStudent />,
  size: 'medium',
});
