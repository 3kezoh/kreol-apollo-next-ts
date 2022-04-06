import Link from "next/link";
import { Button } from "react-bulma-components";

export const DefineButton = () => (
  <Link href="/define" passHref>
    <a className="button" data-cy="define">
      +
    </a>
  </Link>
);
