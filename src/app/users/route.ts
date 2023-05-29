import { NextResponse } from 'next/server';


export async function GET() {
  const res = await fetch('http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow' );
  const data = await res.json();
 
  return NextResponse.json({ data });
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
  data: {
    items: StackUser[]
  }
}