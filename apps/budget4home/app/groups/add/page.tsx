import { GroupForm } from "../(components)/form";
import { userRepository } from "../../../repositories";

export default async function () {
  const users = await userRepository.getAll();

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} />
    </>
  );
}
