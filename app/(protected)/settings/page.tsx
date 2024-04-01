"use client"

import { useSession } from "next-auth/react";

const SettingsPage =  () => {

  const session = useSession();
  return (
    <div>
      {JSON.stringify(session)}

      <form action={async () => {
        

      }}>
        <button type="submit" >
          Sign out
        </button>
      </form>
    </div>
  )
}

export default SettingsPage