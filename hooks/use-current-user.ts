import { useSession } from "next-auth/react";

 export const useCurrenUser = () => {
    const session = useSession();

    return session.data?.user;
 }