import classNames from "classnames";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  page: number;
  isCurrent: boolean;
  pathname: string;
  query: any;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = ({ page, isCurrent, pathname, query, ...props }: Props) => {
  const classes = { "is-current": isCurrent };
  const className = classNames("pagination-link", classes);
  return (
    <li>
      <NextLink href={{ pathname, query }}>
        <a href={pathname} className={className} {...props}>
          {page}
        </a>
      </NextLink>
    </li>
  );
};
