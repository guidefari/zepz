import { FormattedUser } from "@/app/users/route";
import { openDB } from "idb";

const load = openDB('stack-zepz', 1, {
    upgrade(db) {
      db.createObjectStore('users');
    },
  });


export async function read(): Promise<FormattedUser[] | undefined> {
    const db = await load

    try {
        const data: FormattedUser[] = await fetch('/users').then((res) => res.json())
        db.clear('users');
        data.forEach((user) => db.put('users', user, user.user_id));
        return db.getAll('users');
    } catch (error) {
        if (await db.count('users') > 0) {
            return await db.getAll('users');
        } else {
            console.log("No data is available");
        }
    }

}
