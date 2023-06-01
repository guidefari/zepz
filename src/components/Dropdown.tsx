import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import './dropdown-styles.css'
import { ThreeDots } from './icons'
import store from '@/util/storage'
import { observer } from 'mobx-react'
import { FormattedUser } from '@/app/users/route'

type Props = {
  user: FormattedUser
}

export const Dropdown = observer(({ user }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="focus:ring-2 ring-inset IconButton">
        <ThreeDots />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent">
          <DropdownMenu.Item
            className={`text-black cursor-pointer ${user.blocked && `cursor-not-allowed`}`}
            disabled={user?.blocked}
            onClick={() => store.toggleFollowUser(user?.user_id)}
          >
            <button className="text-black cursor-pointer">
              {user?.following ? 'unfollow' : 'follow'}
            </button>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="text-black cursor-pointer"
            onClick={() => store.toggleUserBlock(user?.user_id)}
          >
            <button>{user?.blocked ? 'unblock' : 'block'}</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
})
