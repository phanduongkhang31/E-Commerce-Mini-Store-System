import React from "react";
import { Icon } from "./Components";

interface RoleBadgeProps {
  role: "admin" | "user";
  size?: "sm" | "md" | "lg";
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = "md" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const iconSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (role === "admin") {
    return (
      <span
        className={`inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-md ${sizeClasses[size]}`}
      >
        <Icon name="admin_panel_settings" className={iconSizes[size]} />
        ADMIN
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-md ${sizeClasses[size]}`}
    >
      <Icon name="person" className={iconSizes[size]} />
      USER
    </span>
  );
};

