import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Content = ({ children, ...props }: Props) => (
  <div className="dropdown-content" {...props}>
    {children}
  </div>
);
