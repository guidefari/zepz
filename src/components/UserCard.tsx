import { FormattedUser } from '@/app/users/route'
import React from 'react'
import { Dropdown } from './Dropdown'

type Props = {
  user: FormattedUser
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className="p-6">
      <div className='relative rounded-xl hover:bg-blue-500 group'>
        <img
          className="object-cover object-center w-full mb-8 group-hover:opacity-40 lg:h-48 md:h-36 rounded-xl"
          src={user.profile_image}
          alt="blog"
        />
        <div className='absolute cursor-pointer top-3 right-3'>

        <Dropdown />
        </div>
      </div>
      <div className="inline-flex justify-between w-full">
        <h1 className="mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600">
          {user.display_name}
        </h1>
        <span title='Reputation score'>{new Intl.NumberFormat('en-US').format(user.reputation)}</span>
      </div>
    </div>
  )
}
