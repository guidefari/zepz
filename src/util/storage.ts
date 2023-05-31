"use client"
import { FormattedUser } from '@/app/users/route'
import { openDB } from 'idb'
import { makeObservable, observable } from "mobx";

class LocalStorage {
  users: FormattedUser[] = []

  constructor() {
    makeObservable(this, {
      users: observable,
      load: observable,
      read: observable
    });

    this.read()
  }

  load() {
    try {
      if (!window) return

      return openDB('stack-zepz', 1, {
        upgrade(db) {
          db.createObjectStore('users')
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  async read(): Promise<FormattedUser[] | void> {
    const db = await this.load()

    try {
      if (!db) return
      const data: FormattedUser[] = await fetch('/users').then((res) => res.json())
      db.clear('users')
      data.forEach((user) => db.put('users', user, user.user_id))
      return (this.users = await db.getAll('users'))
    } catch (error) {
      if (db && (await db.count('users')) > 0) {
        return await db.getAll('users')
      } else {
        console.log('No data is available')
        console.error(error)
      }
    }
  }
}

const localStorage = new LocalStorage()
export default localStorage
