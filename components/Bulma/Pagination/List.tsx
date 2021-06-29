import { ReactNode } from "react";

type Props = { children: ReactNode };

export const List = ({ children, ...props }: Props) => (
  <ul className="pagination-list" {...props}>
    {children}
  </ul>
);
