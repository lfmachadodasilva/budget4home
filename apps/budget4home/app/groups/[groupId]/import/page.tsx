'use client';

import { B4hButton, B4hForm, B4hTextarea } from '@budget4home/ui-components';
import { useCallback, useRef, useState } from 'react';
import { ImportClient } from '../../../../clients/import';
import { useAuth } from '../../../../contexts/auth';

export default function Import({ params }: any) {
  const { token } = useAuth();
  const dataRef = useRef<HTMLTextAreaElement>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleOnImport = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      ImportClient.import(token, params.groupId, JSON.parse(dataRef.current.value));
      alert('Done!');
    } catch (err) {
      console.error(err);
      setError('something went wrong');
    }

    setLoading(false);
  }, [token]);

  return (
    <>
      <B4hForm
        label={'Import'}
        footer={
          <B4hButton onClick={handleOnImport} disabled={loading}>
            import
          </B4hButton>
        }
      >
        <B4hTextarea
          ref={dataRef}
          rows={20}
          defaultValue={process.env.NODE_ENV === 'development' ? mock : ''}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </B4hForm>
    </>
  );
}

const mock = `[
  {
    "id": "Q9MVpd2bDacG0ojW044x",
    "name": "label 1",
    "icon": null,
    "expenses": [
      {
        "id": "34e0Q4baoGYmDHVOEBNy",
        "name": "expense 1",
        "type": "outcoming",
        "date": "2023-12-12T00:00:00.000Z",
        "value": 123,
        "comments": null,
        "groupId": "18Ye9bacMHX36xw4a94P"
      },
      {
        "id": "uHgz067MezWWqvBOBYt4",
        "name": "expense 2",
        "type": "outcoming",
        "date": "2023-11-12T00:00:00.000Z",
        "value": 123,
        "comments": null,
        "groupId": "18Ye9bacMHX36xw4a94P"
      }
    ]
  }
]`;
