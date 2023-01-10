import { format } from 'date-fns';
import { ImportItem, ImportItemStatus } from './ui';

interface ImportTableProps {
  items: ImportItem[];
}

export const ImportTable = (props: ImportTableProps) => {
  if (!props.items) {
    return <>Empty items</>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">date</th>
          <th scope="col">type</th>
          <th scope="col">name</th>
          <th scope="col">value</th>
          <th scope="col">label</th>
          <th scope="col">comments</th>
          <th scope="col">status</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((x, index) => {
          return (
            <tr key={index}>
              <td>
                {new Date(x.date).toString() === 'Invalid Date'
                  ? 'Invalid Date'
                  : format(new Date(x.date), 'yyyy-MM-dd')}
              </td>
              <td>{x.type}</td>
              <td>{x.name}</td>
              <td>{(x.value / 100).toFixed(2)}</td>
              <td>
                {x.label?.icon && <>{x.label?.icon} - </>}
                {x.label?.name}
              </td>
              <td>{x.comments}</td>
              <td>{x.status ?? ImportItemStatus.new}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/*
[
  {
    "id": "m5VE0c0SwRzVjU1sEfr9",
    "name": "test",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 125,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "j97QqZj0JAO8Sgxdjthl",
    "name": "test 2",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 666,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "gKzcEVW4byjKUOxUoWjS",
    "name": "test",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 124,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "Z43HVVwz0Nq01BBLVeIo",
    "name": "test",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 123,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "Wsezsp2eAcVQjf0oqejv",
    "name": "test 6",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 126,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "H52k2xFDEYc4GS5lM0ag",
    "name": "test 5",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 123,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "EtaXJSzskQQqR8Ibl4Ya",
    "name": "test 2",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 333,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "25eeAVb3xd96pSs1P133",
    "name": "comment",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 123,
    "comments": "test",
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "0xJ6fduOYGQF2z6SUqnE",
    "name": "test 2",
    "type": "outcoming",
    "date": "2023-01-09T00:00:00.000Z",
    "value": 444,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "ZEA5mcOdt6qKgKd24T2B",
    "name": "gasto",
    "type": "outcoming",
    "date": "2023-01-08T00:00:00.000Z",
    "value": 2000,
    "label": {
      "id": "1jiFcetIO53bgGYl2YW5",
      "name": "market",
      "icon": "🛒"
    }
  },
  {
    "id": "h7ahRqh1Iq2sqe0XquHP",
    "name": "Dojo ",
    "type": "incoming",
    "date": "2023-01-04T00:00:00.000Z",
    "value": 20000,
    "label": {
      "id": "6HpyHdNE9bIoSSOwqVSo",
      "name": "salary"
    }
  },
  {
    "id": "FYR717kUmP9dtY2bzjCT",
    "name": "pub",
    "type": "outcoming",
    "date": "2023-01-03T00:00:00.000Z",
    "value": 200,
    "label": {
      "id": "8t4jazfKTtNUUeEvbLlI",
      "name": "pub",
      "icon": "🍺"
    }
  },
  {
    "id": "8hYRwd7inJowu43ZuWFg",
    "name": "pub",
    "type": "outcoming",
    "date": "2023-01-03T00:00:00.000Z",
    "value": 200,
    "label": {
      "id": "8t4jazfKTtNUUeEvbLlI",
      "name": "pub",
      "icon": "🍺"
    }
  }
] 
*/
