"use client";

import { Expense, Group, Label } from "@budget4home/base";
import { B4hButton, B4hTextarea } from "@budget4home/ui-components";
import { useCallback, useRef, useState } from "react";
import { useAuth } from "../../../../../contexts/auth";
import { splitItems } from "./split";
import { ImportTable } from "./table";

export const ImportItemStatus = {
  new: "New",
  processing: "Processing",
  done: "Done",
  addLabel: "Add Label",
  fail: "Fail",
};

export interface ImportItem extends Expense {
  status: string;
}

interface ImportUiProps {
  labels: Label[];
  group: Group;
}

export const ImportUi = (props: ImportUiProps) => {
  const { token } = useAuth();
  const dataRef = useRef<HTMLTextAreaElement>();
  const [data, setData] = useState<ImportItem[]>();
  const [loading, setLoading] = useState(false);

  const handleOnProcess = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(splitItems(event.target.value, props.labels, props.group.id));
  };

  const handleOnImport = useCallback(async () => {}, [token]);

  return (
    <>
      <B4hTextarea
        ref={dataRef}
        style={{ height: "200px", width: "100%" }}
        rows={5}
        onChange={handleOnProcess}
      />
      <B4hButton onClick={handleOnImport} disabled={loading}>
        import
      </B4hButton>
      <p>
        Format:
        <strong>2022-12-31|incoming|Uo|200000|salary</strong>
      </p>
      <ImportTable items={data} />
    </>
  );
};

/* 
2022-12-31|incoming|Uo|200000|salary
2022-12-27|outcoming|luiz|2|home 
2022-12-23|outcoming|bebidinha|100000|market
2022-12-27|outcoming|Sainsbury's |1000|market
2023-01-02|outcoming|oub|20000|🍻
2022-12-30|incoming|Sojo|9000|salary
2022-12-27|outcoming|Cabelo|5000|general
2022-12-27|incoming|Dojo|10000|💰
2022-12-28|outcoming|test|10|market
2023-01-01|outcoming|copa|20000|pub
2022-12-30|outcoming|Bebidinha|1000|pub
2022-12-27|outcoming|bla|200|home 
*/
