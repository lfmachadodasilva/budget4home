import { ExpenseForm } from "../(components)/form";
import { getUserId } from "../../../../../util/getUserId";
import {
  groupRepository,
  labelRepository,
} from "../../../../../util/repositories";

export default async function ({ params }: any) {
  let groupId = params.groupId;

  const userId = await getUserId();

  if (!groupId) {
    groupId = await groupRepository.getFirst(userId);
  }

  const labels = await labelRepository.getAll(userId, params.groupId);

  return (
    <>
      <ExpenseForm groupId={groupId} labels={labels} />
    </>
  );
}
