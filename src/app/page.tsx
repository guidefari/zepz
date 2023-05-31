"use client"
import { UserCard } from '@/components/UserCard'
import store  from '@/util/storage'
import { observer } from 'mobx-react'

export default observer(function Home() {
  // if (isLoading) return <p>Loading...</p>
  // if (!users) return <p>No profile data</p>

  return (
    <main className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
      <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        {store?.users?.map((user) => (
          <UserCard key={user.user_id} user={user} />
        ))}
      </div>
    </main>
  )
})

type SearchParams = {
  page: number
  pagesize: number
}
