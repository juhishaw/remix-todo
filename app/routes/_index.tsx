import { Link } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import homeStyles from "~/styles/home.css";

export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping tracks of your notes</h1>
      <p>Try our early beta and never loose track of your notes</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};
