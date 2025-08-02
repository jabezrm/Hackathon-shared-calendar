import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to={"/"}>
      <h1 className="logo">
        Link<span id="highlight">U</span>p
      </h1>
    </Link>
  );
}
