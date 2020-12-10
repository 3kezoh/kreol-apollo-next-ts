import Link from "next/link";

const SignUpButton = () => (
  <Link href="/signup">
    <a href="/signup" className="button is-primary">
      <strong>Sign up</strong>
    </a>
  </Link>
);

export default SignUpButton;
