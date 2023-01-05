import { getUserId } from "../../../../util/getUserId";
import {
  groupRepository,
  labelRepository,
} from "../../../../util/repositories";
import { ImportUi } from "./(components)/ui";

export default async function ({ params }: any) {
  const userId = await getUserId();

  const groupPromise = groupRepository.get(userId, params.groupId);
  const labelsPromise = labelRepository.getAll(userId, params.groupId);

  const [group, labels] = await Promise.all([groupPromise, labelsPromise]);

  return (
    <>
      <h3>Import</h3>
      <ImportUi labels={labels} group={group} />
    </>
  );
}
