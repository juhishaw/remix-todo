import { Link, json, useLoaderData } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import styles from "~/styles/note-details.css";

export default function NoteDetailsPage() {
  const note = useLoaderData() as any;

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note?.title}</h1>
      </header>
      <p id="note-details-contnet">{note?.content}</p>
    </main>
  );
}

export const loader = async ({ params }) => {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw json(
      { message: "Could not find any note for id" + noteId },
      { status: 404, statusText: "Not found" }
    );
  }
  return selectedNote;
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta({ data }) {
  return [{
    title: data.title,
    description: 'Manage your notes with ease.',
  }];
}