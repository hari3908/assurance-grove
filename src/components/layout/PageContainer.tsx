
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <div className="p-6">
      {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
      {children}
    </div>
  );
}
