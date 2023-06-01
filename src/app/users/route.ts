import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const params = new URL(req.url)
  const page = params.searchParams.get('page') || '1'
  const pagesize = params.searchParams.get('pagesize') || '20'

  const url =
    'http://api.stackexchange.com/2.2/users?' +
    new URLSearchParams({
      pagesize,
      page,
      order: 'desc',
      sort: 'reputation',
      site: 'stackoverflow',
    })
  console.log('url:', url)

  try {
    const res = await fetch(url)
    const stackoverflowUsers: StackAPIResponse = await res.json()

    const formattedUsers: FormattedUser[] = stackoverflowUsers?.items?.map((user) => {
      return {
        user_id: user.user_id,
        display_name: user.display_name,
        reputation: user.reputation,
        profile_image: user.profile_image,
        following: false,
        blocked: false,
      }
    })
    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error(error)
    return NextResponse.json([])
  }
}

export type FormattedUser = Pick<
  StackUser,
  'user_id' | 'profile_image' | 'display_name' | 'reputation'
> & {
  following: boolean
  blocked: boolean
}

type StackUser = {
  badge_counts: {
    bronze: number
    silver: number
    gold: number
  }
  account_id: number
  is_employee: boolean
  last_modified_date: number
  last_access_date: number
  reputation_change_year: number
  reputation_change_month: number
  reputation_change_week: number
  reputation_change_day: number
  reputation: number
  creation_date: number
  user_type: string
  user_id: number
  accept_rate: number
  location?: string
  website_url?: string
  link: string
  profile_image: string
  display_name: string
}

type StackAPIResponse = {
  items: StackUser[]
}
