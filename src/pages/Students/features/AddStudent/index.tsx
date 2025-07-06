import { createModal } from '@/core/components/modals';
import i18n from '@/i18n';
import { addStudentProducer } from '../../data/producers';
import { messages } from '../../messages';
import StudentForm from '../StudentForm';

export default function AddStudent() {
  return <StudentForm producer={addStudentProducer} />;
}

export const AddStudentModal = createModal({
  key: 'add-student',
  title: i18n.t(messages.addStudent),
  element: <AddStudent />,
  size: 'medium',
});
