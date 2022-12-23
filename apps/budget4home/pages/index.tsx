import { testRepository } from '@budget4home/repositories';
import { Button } from '@budget4home/web-components';

export default function Web() {
  return (
    <div>
      <h1>Web - {testRepository()}</h1>
      <Button />
    </div>
  );
}
