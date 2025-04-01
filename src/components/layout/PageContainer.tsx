
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  className?: string; // Added className prop for more flexibility
}

export function PageContainer({ children, title, className }: PageContainerProps) {
  return (
    <div className={`p-6 h-full flex flex-col ${className || ""}`}>
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="flex-1 overflow-auto"> {/* Changed from overflow-hidden to overflow-auto */}
        {children}
      </div>
    </div>
  );
}
