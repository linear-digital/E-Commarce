
'use client'
import MainPage from "@/Components/Pages/MainPage";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/shop')
  }, []);

  return (  
    <>
     
    </>
  );
}
