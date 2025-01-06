import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequireRoleProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function RequireRole({
  children,
  allowedRoles,
}: RequireRoleProps) {
  const role = localStorage?.getItem("role");
  if (role && allowedRoles.includes(role)) {
    return children;
  }
  return <Navigate to="/login" />;
}
