import { LoginForm } from "@/components/LoginForm";
import { NextRequest } from "next/server";

export default async function Home() {
  return (
    <div className="card bg-neutral text-neutral-content w-96 mx-auto">
      <div className="card-body items-center text-center">
        <div className="card-title">Sign-up to TaskManager</div>
          <LoginForm signup={true}/>
      </div>
    </div> )
}