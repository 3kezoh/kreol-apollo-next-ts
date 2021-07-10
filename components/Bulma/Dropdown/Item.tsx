import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Item = ({ children, ...props }: Props) => (
  <li className="dropdown-item" {...props}>
    {children}
  </li>
);
