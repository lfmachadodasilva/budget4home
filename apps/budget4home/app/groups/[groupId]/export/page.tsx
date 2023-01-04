import { B4hTextarea } from "@budget4home/ui-components";
import { format } from "date-fns";
import { cookies } from "next/headers";

import { firebaseAdminAuth } from "../../../../util/firebaseAdmin";
import {
  expenseRepository,
  groupRepository,
} from "../../../../util/repositories";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const groupPromise = groupRepository.get(uid, params.groupId);
  const expensesPromise = expenseRepository.getAll(uid, params.groupId);

  const [group, expenses] = await Promise.all([groupPromise, expensesPromise]);

  const separator = "|";
  const expensesValue = expenses
    .map((expense) => {
      const line = [
        format(new Date(expense.date), "yyyy-MM-dd"),
        expense.type,
        expense.name,
        expense.value,
        expense.label.name,
      ];
      return line.join(separator);
    })
    .join("\n");

  return (
    <>
      <h3>Export - {group.name}</h3>
      <p>
        Format:
        <strong>2022-12-31|incoming|Uo|200000|salary</strong>
      </p>
      <B4hTextarea
        defaultValue={expensesValue}
        disabled
        style={{ height: "200px", width: "100%" }}
      />
    </>
  );
}
