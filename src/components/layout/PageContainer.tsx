
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <div className="p-6 h-full flex flex-col">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
