import React from "react";
import { getUsers } from "@/lib/api/users";
import { AdminUser } from "@/types/user";
import { UsersPageHeader } from "./components/users-page-header";
import { UserStats } from "./components/user-stats";
import { UsersTable } from "./components/users-table";

const AdminUsersPage = async () => {
    // listUsers requires an admin session — better-auth throws an APIError
    // otherwise (e.g. signed out). Show an empty state instead of a 500.
    const allUser = await getUsers();
    console.log(allUser)
    let users: AdminUser[] = [];
    try {
        const res = await getUsers();
        console.log("is it now found", res)
        // better-auth listUsers may return an array or a { users } object.
        users = Array.isArray(res)
            ? (res as AdminUser[])
            : ((res as { users?: AdminUser[] }).users ?? []);
    } catch {
        users = [];
    }
    console.log(users);
    console.log('user not found');

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <UsersPageHeader />

            <UserStats users={users} />

            <UsersTable users={users} />
        </div>
    );
};

export default AdminUsersPage;
