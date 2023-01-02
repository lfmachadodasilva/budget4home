import { format } from "date-fns";
import { sum } from "lodash";
import { cookies } from "next/headers";
import Link from "next/link";
import { ExpenseType } from "../../../../models/expense";
import { getAllExpensesThisMonth } from "../../../../repositories/expenses";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../../../util/firebaseAdmin";
import { B4hRoutes } from "../../../../util/routes";
import { ExpensesDate } from "./(components)/date";

export default async function ({ params, searchParams }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const date = new Date();
  date.setDate(1);
  searchParams.year && date.setFullYear(+searchParams?.year);
  searchParams.month && date.setMonth(+searchParams?.month - 1);

  const expenses = await getAllExpensesThisMonth(
    firebaseAdminFirestore,
    uid,
    params?.groupId,
    date
  );

  const totalUsed =
    sum(
      expenses
        .filter((x) => x.type === ExpenseType.outcoming)
        .map((x) => x.value)
    ) / 100;
  const totalLeft =
    (sum(
      expenses
        .filter((x) => x.type === ExpenseType.incoming)
        .map((x) => x.value)
    ) -
      totalUsed) /
    100;

  return (
    <>
      <h5>Expenses</h5>
      <br></br>
      <br></br>
      <Link
        href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.expenseAdd}`}
      >
        add
      </Link>
      <br></br>
      <br></br>
      <ExpensesDate />
      <br></br>
      <br></br>
      <>
        <label>
          <strong>Total used:</strong> {totalUsed.toFixed(2)}
        </label>
      </>
      <br></br>
      <>
        <label>
          <strong>Total left:</strong> {totalLeft.toFixed(2)}
        </label>
      </>
      <ul>
        {expenses.map((expense) => {
          return (
            <li key={expense.id}>
              <label>{expense.type}</label>
              {" - "}
              <label>{format(new Date(expense.date), "yyyy-MM-dd")}</label>
              {" - "}
              <label>{expense.name}</label> -{" "}
              <label>{(expense.value / 100).toFixed(2)}</label>
              {" - "}
              <label>{expense.label?.name}</label>
              {" - "}
              <Link
                href={`${B4hRoutes.groups}/${expense.groupId}${B4hRoutes.expenses}/${expense.id}`}
              >
                edit
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
