import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = {
  page: number;
  pathname: string;
  query: any;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Next = ({ page, pathname, query, ...props }: Props) => (
  <Link href={{ pathname, query }}>
    <a href={pathname} className="pagination-next" {...props}>
      Next
    </a>
  </Link>
);
