"use client"
import { FormattedUser } from "@/app/users/route";
import { openDB } from "idb";

class LocalStorage {
    users: FormattedUser[] = []
    
    constructor() {
        this.read()
    }

    load() {
        try {
            if (!window) return
            
            return openDB('stack-zepz', 1, {
                upgrade(db) {
                  db.createObjectStore('users');
                },
              });
        } catch (error) {
            console.error(error)
        }

    }
    

    async read(): Promise<FormattedUser[] | undefined> {
        const db = await this.load()

        try {
            if (!db) return
            const data: FormattedUser[] = await fetch('/users').then((res) => res.json())
            db.clear('users');
            data.forEach((user) => db.put('users', user, user.user_id));
            this.users = await db.getAll('users');
        } catch (error) {
            if (db && await db.count('users') > 0) {
                return await db.getAll('users');
            } else {
                console.log("No data is available");
            }
        }

    }

}

const localStorage = new LocalStorage()
export default localStorage