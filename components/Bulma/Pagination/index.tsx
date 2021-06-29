import classNames from "classnames";
import { ReactNode } from "react";
import { Ellipsis } from "./Ellipsis";
import { Link } from "./Link";
import { List } from "./List";
import { Next } from "./Next";
import { Previous } from "./Previous";

type Props = { children: ReactNode; isCentered: boolean };

export const Pagination = ({ children, isCentered, ...props }: Props) => {
  const classes = { "is-centered": isCentered };
  const className = classNames("pagination", classes);
  return (
    <nav className={className} role="navigation" {...props}>
      {children}
    </nav>
  );
};

Pagination.Ellipsis = Ellipsis;
Pagination.Link = Link;
Pagination.List = List;
Pagination.Next = Next;
Pagination.Previous = Previous;
