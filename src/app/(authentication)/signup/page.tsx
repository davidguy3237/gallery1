import Link from "next/link";

export default function SignUp() {
  return (
    <div>
      <p>Sign up</p>
      <p>
        Have an account? <Link href="/login">Log in here</Link>
      </p>
    </div>
  );
}
