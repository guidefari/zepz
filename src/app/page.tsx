'use client';
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FormattedUser } from "./users/route";
import { UserCard } from "@/components/UserCard";

export default function Home() {
  const [data, setData] = useState<FormattedUser[]>([]);
  const [isLoading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    fetch('/users')
    .then((res) => res.json())
    .then((data?: FormattedUser[]) => {
      data && setData(data);
      console.log('data:', data)
      setLoading(false);
    });
  }, []);
 
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  
  return (
    <main className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
      <div className="grid w-full grid-cols-1 gap-6 mx-auto lg:grid-cols-3">
        {data.map((user) => (
            <UserCard key={user.user_id} user={user} />
        ))}
      </div>
    </main>
  )
}

type SearchParams = {
  page: number
  pagesize: number
}