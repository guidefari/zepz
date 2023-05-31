'use client'
import { FormattedUser } from '@/app/users/route'
import { IDBPDatabase, openDB } from 'idb'
import { makeObservable, observable } from 'mobx'

class LocalStorage {
  users: FormattedUser[] | undefined = []
  db: IDBPDatabase<unknown> | undefined

  constructor() {
    makeObservable(this, {
      users: observable,
      loadDB: observable,
      getUsers: observable,
    })

    this.init()
  }

  async init() {
    this.db = await this.loadDB()
    this.getUsers()
  }

  async loadDB() {
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

  async getUsers(): Promise<FormattedUser[] | void> {
    try {
      if (!this.db) return
      const data: FormattedUser[] = await fetch('/users').then((res) => res.json())
      this.db.clear('users')
      data.forEach((user) => this.db?.put('users', user, user.user_id))
      return (this.users = await this.db.getAll('users'))
    } catch (error) {
      if (this.db && (await this.db.count('users')) > 0) {
        return await this.db.getAll('users')
      } else {
        console.log('No data is available')
        console.error(error)
      }
    }
  }

  async blockUser(user_id: number) {
    const userToPersist = this.users?.find((user) => user.user_id === user_id)
    
    this.db?.put(
      'users',
      {
        ...userToPersist,
        blocked: true,
      },
      user_id
    )

    this.users = await this.db?.getAll('users')
  }
}

const localStorage = new LocalStorage()
export default localStorage
