import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = {
  page: number;
  pathname: string;
  query: any;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Previous = ({ page, pathname, query, ...props }: Props) => (
  <Link href={{ pathname, query }}>
    <a href={pathname} className="pagination-previous" {...props}>
      Prev
    </a>
  </Link>
);
