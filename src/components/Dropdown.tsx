import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import './dropdown-styles.css'
import { ThreeDots } from './icons'

export const Dropdown = () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className='focus:ring-2 ring-inset IconButton'>
        <ThreeDots />
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content className="DropdownMenuContent">
        <DropdownMenu.Item>
          <button className='text-black'>follow</button>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <button className='text-black'>block</button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
)
