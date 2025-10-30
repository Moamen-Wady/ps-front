import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <header>
        <Link className="trlink" to="/book">
          Book Now!
        </Link>
        <img
          loading="eager"
          src="/logoiw.webp"
          alt="logo"
          className="headerimg"
        />
        <h1 className="h1">Unlock Your Potential </h1>
      </header>
      <main>
        <div></div>
      </main>
    </>
  );
}
