'use client';
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { FormattedUser } from "./users/route";

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
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      sup
    </main>
  )
}

type SearchParams = {
  page: number
  pagesize: number
}