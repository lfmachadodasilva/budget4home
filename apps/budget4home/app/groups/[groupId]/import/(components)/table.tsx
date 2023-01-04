import { ImportItem } from "./ui";

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
          <th scope="col">status</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((x, index) => {
          return (
            <tr key={index}>
              <td>{x.date}</td>
              <td>{x.type}</td>
              <td>{x.name}</td>
              <td>{(x.value / 100).toFixed(2)}</td>
              <td>{x.label?.name}</td>
              <td>{x.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
