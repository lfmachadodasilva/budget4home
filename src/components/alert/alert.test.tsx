import { AlertProps, AlertTypes } from './alert';
import { AlertTestObject } from './alert.testObject';

async function defaultInitialise(props: Partial<AlertProps> = {}) {
  const obj = new AlertTestObject();
  await obj.initialiseObject(props);

  expect(obj).toBeDefined();

  return obj;
}

describe('<AlertComponent />', () => {
  test('should not show alert', async () => {
    const obj = await defaultInitialise({ show: false });

    expect(obj.getAlert).toBeNull();
  });

  test('should show alert', async () => {
    const obj = await defaultInitialise({ show: true, body: 'Show alert' });

    expect(obj.getAlert).toBeInTheDocument();
    expect(obj.queryByText('Show alert')).toBeInTheDocument();
    expect(obj.querySelector('.alert-danger')).toBeInTheDocument();
  });

  test('should show alert with warning color', async () => {
    const obj = await defaultInitialise({ show: true, body: 'Show alert', type: AlertTypes.Warning });

    expect(obj.getAlert).toBeInTheDocument();
    expect(obj.queryByText('Show alert')).toBeInTheDocument();
    expect(obj.querySelector('.alert-warning')).toBeInTheDocument();
  });
});
