export interface GroupModel {
    id: number;
    name: string;

    /** relations */
    users: string[];
}

export const defaultGroupModel: GroupModel[] = [
    {
        id: 1,
        name: "Test 1",
        users: ["user 1", "user 2"]
    },
    {
        id: 2,
        name: "Test 2",
        users: ["user 1", "user 2"]
    },
    {
        id: 3,
        name: "Test 3",
        users: ["user 1", "user 2"]
    }
];