import { B4hLabelForm } from '../form';
import { labels } from '../mock';

export const metadata = {
  title: 'update label | budget4home'
};

export default function LabelUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  return <B4hLabelForm label={labels.find(label => label.id === id)} />;
}
