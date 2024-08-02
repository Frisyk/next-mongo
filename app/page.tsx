import { getUsers } from "@/lib/action";
import mongoose from "mongoose";


export default async function Home() {
  const users = await getUsers();
  console.log(users, "oek");
  return (
    <main>
      hi
    </main>
  );
}
