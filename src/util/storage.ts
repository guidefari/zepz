'use client'
import { FormattedUser } from '@/app/users/route'
import { IDBPDatabase, openDB } from 'idb'
import { makeObservable, observable, runInAction } from 'mobx'

class LocalStorage {
  users: FormattedUser[] = []
  db: IDBPDatabase<unknown> | undefined
  loading = false

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
      runInAction(() => (this.loading = true))
      // this is where we'd handle frontend related pagination state - page number, and page size
      // alongside with any other params. those can be properties of the LocalStorage object
      const data: FormattedUser[] = await fetch('/users').then((res) => res.json())
      this.db.clear('users')
      data.forEach((user) => this.db?.put('users', user, user.reputation))
      runInAction(() => (this.loading = false))
      this.syncUIStoreToDB()
    } catch (error) {
      if (this.db && (await this.db.count('users')) > 0) {
        return await this.db.getAll('users')
      } else {
        console.log('No data is available')
        console.error(error)
      }
    }
  }

  async toggleUserBlock(id: number) {
    const userToPersist = this.getSingleUserDetailsFromStore(id)
    if (!userToPersist) return

    this.db?.put(
      'users',
      {
        ...userToPersist,
        blocked: !userToPersist?.blocked,
        following: false,
      },
      userToPersist.reputation
    )

    this.syncUIStoreToDB()
  }

  async toggleFollowUser(id: number) {
    const userToPersist = this.getSingleUserDetailsFromStore(id)
    if (!userToPersist) return
    // would have loved to display this on the UI, maybe via toast notification
    if (userToPersist?.blocked) return console.log('You cannot follow a blocked user')
    this.db?.put(
      'users',
      {
        ...userToPersist,
        following: !userToPersist?.following,
      },
      userToPersist.reputation
    )
    this.syncUIStoreToDB()
  }

  getSingleUserDetailsFromStore(id: number): FormattedUser | undefined {
    return this.users?.find((user) => user.user_id === id)
  }

  async syncUIStoreToDB() {
    this.users = (await this?.db?.getAll('users'))?.reverse() || []
  }
}

const localStorage = new LocalStorage()
export default localStorage
