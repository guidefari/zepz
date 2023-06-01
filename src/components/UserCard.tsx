import { FormattedUser } from '@/app/users/route'
import React from 'react'
import { Dropdown } from './Dropdown'

type Props = {
  user: FormattedUser
}

export const UserCard = ({ user }: Props) => {
  return (
    <div className="p-6">
      <div className={`relative rounded-xl  ${user.blocked && `ring-4 ring-red-800`} group`}>
        <img
          className={`object-cover object-center w-full mb-8 ${
            user.blocked && `opacity-40`
          }  lg:h-48 md:h-36 rounded-xl`}
          src={user.profile_image}
          alt="blog"
        />
        <div className="absolute cursor-pointer top-3 right-3">
          <Dropdown user={user} />
        </div>
      </div>
      <h1 className="text-xl  font-semibold leading-none tracking-tighter text-neutral-600">
        {user.display_name}
      </h1>
      <h4 title="Reputation score" className="mb-2">
        🔥{new Intl.NumberFormat('en-US').format(user.reputation)}
      </h4>
      {user.blocked && (
        <div className="text-red-500 inline-block rounded-xl p-3 bg-red-950">Blocked</div>
      )}
      {user.following && (
        <div className="text-blue-500 inline-block rounded-xl p-3 bg-blue-950">Following</div>
      )}
    </div>
  )
}
