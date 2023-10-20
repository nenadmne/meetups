import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">React Meetups</Link>
      </div>
      <nav>
        <Link href="/new-meetup">Add New Meetup</Link>
      </nav>
    </header>
  );
}

export default MainNavigation;
