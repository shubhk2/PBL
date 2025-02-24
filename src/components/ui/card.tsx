import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-gray-800 text-white p-4 rounded-xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
}