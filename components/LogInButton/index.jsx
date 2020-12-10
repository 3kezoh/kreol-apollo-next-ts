import Link from "next/link";

const LogInButton = () => (
  <Link href="/login">
    <a href="/login" className="button is-light">
      Log in
    </a>
  </Link>
);

export default LogInButton;
