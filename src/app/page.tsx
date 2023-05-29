'use client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormattedUser } from './users/route'
import { UserCard } from '@/components/UserCard'
import { read } from '@/util/storage'

export default async function Home() {
  // const [state] = useState(users)
  const [isLoading, setLoading] = useState(false)
  console.log('io')
  
  useEffect(() => {
    console.log('effect')
    const users =  async () => await read()
    console.log('users:', users)
  
  }, [])

  if (isLoading) return <p>Loading...</p>
  // if (!users) return <p>No profile data</p>

  

  return (
    <main className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
      <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        {/* {state?.map((user) => (
          <UserCard key={user.user_id} user={user} />
        ))} */}
      </div>
    </main>
  )
}

type SearchParams = {
  page: number
  pagesize: number
}
