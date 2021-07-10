import { ReactNode } from "react";
import { Ellipsis } from "./Ellipsis";
import { Link } from "./Link";
import { List } from "./List";
import { Next } from "./Next";
import { Previous } from "./Previous";

type Props = { children: ReactNode };

export const Pagination = ({ children, ...props }: Props) => {
  return (
    <nav className="pagination is-centered" role="navigation" {...props}>
      {children}
    </nav>
  );
};

Pagination.Ellipsis = Ellipsis;
Pagination.Link = Link;
Pagination.List = List;
Pagination.Next = Next;
Pagination.Previous = Previous;
