"use client"

import { useCurrentRole } from "@/hooks/user-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
    const role = useCurrentRole();
    if (role !== allowedRole) {
        return (
            <FormError message="You don't have a permission to view this content!" />
        );
    }
    return (
        <>
            {children}
        </>
    );

}