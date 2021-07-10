import { HTMLAttributes, ReactNode } from "react";

type Props = { children: ReactNode } & HTMLAttributes<HTMLUListElement>;

export const Menu = ({ children, ...props }: Props) => (
  <ul className="dropdown-menu" role="menu" {...props}>
    {children}
  </ul>
);
