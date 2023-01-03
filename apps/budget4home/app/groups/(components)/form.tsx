"use client";

import { Group, User } from "@budget4home/base";
import { B4hButton, B4hInput } from "@budget4home/ui-components";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { useAuth } from "../../../contexts/auth";
import { B4hRoutes } from "../../../util/routes";

interface GroupFormProps {
  group?: Group;
  users: User[];
}

export const GroupForm = (props: GroupFormProps) => {
  const { push } = useRouter();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>();
  const userIdsRef = useRef<string[]>(props.group?.userIds ?? []);

  const handleOnManage = async () => {
    // TODO validate name
    // TODO loading state

    setLoading(true);
    try {
      if (!props.group?.id) {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            name: nameRef.current.value,
            userIds: userIdsRef.current,
          }),
        });
      } else {
        await fetch(B4hRoutes.api + B4hRoutes.groups, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            id: props.group.id,
            name: nameRef.current.value,
            userIds: userIdsRef.current,
          }),
        });
      }
      push(B4hRoutes.groups);
    } catch {
      // TODO show error msg
    }
    setLoading(false);
  };

  const handleOnDelete = async () => {
    if (confirm("Are you sure?")) {
      setLoading(true);
      await fetch(B4hRoutes.api + B4hRoutes.groups, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ id: props.group.id }),
      });

      push(B4hRoutes.groups);
      setLoading(false);
    }
  };

  const handleOnChangeUser = async (
    event: ChangeEvent<{ checked: boolean }>,
    id: string
  ) => {
    if (event.target.checked) {
      userIdsRef.current.push(id);
    } else {
      userIdsRef.current = userIdsRef.current.filter((x) => x !== id);
    }
  };

  return (
    <>
      <>
        {props.group?.id && (
          <>
            <label>Id</label>
            <p>{props.group.id}</p>
          </>
        )}
        <B4hInput ref={nameRef} defaultValue={props.group?.name} label="Name" />
        <>
          {props.users?.map((x) => {
            return (
              <div key={x.id}>
                <B4hInput
                  id={x.id}
                  type={"checkbox"}
                  defaultChecked={props.group?.userIds?.includes(x.id) ?? false}
                  onChange={(event) => handleOnChangeUser(event, x.id)}
                  label={`${x.displayName ?? ""} - ${x.email}`}
                />
              </div>
            );
          })}
        </>
      </>

      <br></br>

      <B4hButton onClick={handleOnManage} disabled={loading}>
        {props.group?.id ? "Update" : "Add"}
      </B4hButton>
      {props.group?.id && (
        <B4hButton onClick={handleOnDelete} disabled={loading}>
          Delete
        </B4hButton>
      )}
    </>
  );
};
