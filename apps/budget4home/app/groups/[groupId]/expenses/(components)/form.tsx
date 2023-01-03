"use client";

import { Expense, ExpenseType, Label } from "@budget4home/base";
import { B4hButton, B4hInput, B4hSelect } from "@budget4home/ui-components";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ExpenseClient } from "../../../../../clients/expenses";
import { useAuth } from "../../../../../contexts/auth";
import { B4hRoutes } from "../../../../../util/routes";

interface ExpenseFormProps {
  expense?: Expense;
  labels: Label[];
  groupId: string;
}
export function ExpenseForm(props: ExpenseFormProps) {
  console.log(props);
  const { push } = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const typeRef = useRef<HTMLSelectElement>();
  const nameRef = useRef<HTMLInputElement>();
  const valueRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();
  const labelRef = useRef<HTMLSelectElement>();

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    setLoading(true);
    try {
      if (!props.expense?.id) {
        await ExpenseClient.add(token, {
          type: typeRef.current.value,
          name: nameRef.current.value,
          value: +valueRef.current.value,
          date: dateRef.current.value,
          label: { id: labelRef.current.value } as Label,
          groupId: props.groupId,
        });
      } else {
        await ExpenseClient.edit(token, {
          id: props.expense.id,
          type: typeRef.current.value,
          name: nameRef.current.value,
          value: +valueRef.current.value,
          date: dateRef.current.value,
          label: { id: labelRef.current.value } as Label,
          groupId: props.groupId,
        });
      }
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    } catch {
      // TODO show error msg
    }
    setLoading(false);
  };

  const handleOnDelete = async () => {
    if (confirm("Are you sure?")) {
      setLoading(true);

      await ExpenseClient.delete(token, {
        id: props.expense.id,
        groupId: props.groupId,
      });

      setLoading(false);
      push(`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}`);
    }
  };

  return (
    <>
      <h5>Expense</h5>

      <>
        {props.expense?.id && (
          <>
            <label>Id</label>
            <p>{props.expense.id}</p>
          </>
        )}
        <B4hSelect
          id={"type"}
          ref={typeRef}
          defaultValue={props.expense?.type ?? ExpenseType.outcoming}
          options={[
            { key: ExpenseType.outcoming, value: ExpenseType.outcoming },
            { key: ExpenseType.incoming, value: ExpenseType.incoming },
          ]}
          label={"Type"}
        />
        <br></br>

        <B4hInput
          id={"name"}
          ref={nameRef}
          defaultValue={props.expense?.name}
          label={"Name"}
        />
        <br></br>
        <B4hInput
          id={"value"}
          type="number"
          ref={valueRef}
          defaultValue={props.expense?.value}
          label={"Value"}
        />

        <br></br>

        <B4hInput
          id={"date"}
          type="date"
          ref={dateRef}
          defaultValue={format(
            props.expense?.date ? new Date(props.expense?.date) : new Date(),
            "yyyy-MM-dd"
          )}
          label={"Date"}
        />
        <br></br>
        <B4hSelect
          id={"label"}
          ref={labelRef}
          defaultValue={props.expense?.label?.id ?? props.labels.at(0)?.id}
          options={props.labels.map((label) => {
            return {
              key: label.id,
              value: label.name,
            };
          })}
          label={"Label"}
        />
        <br></br>
      </>

      <br></br>

      <B4hButton onClick={handleOnManage} disabled={loading}>
        {props.expense?.id ? "Update" : "Add"}
      </B4hButton>
      {props.expense?.id && (
        <B4hButton onClick={handleOnDelete}>Delete</B4hButton>
      )}
    </>
  );
}