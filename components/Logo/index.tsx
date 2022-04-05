import Link from "next/link";
import { Button } from "react-bulma-components";

export const Logo = () => (
  <Button>
    <Link href="/" passHref>
      <a data-cy="home">Home</a>
    </Link>
  </Button>
);
