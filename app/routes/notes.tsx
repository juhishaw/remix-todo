import { Link } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { LinksFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListsLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: "Could not find any notes" },
      { status: 404, statusText: "Not found" }
    );
  }
  return notes;
  // return json(notes)
};

export async function action({ request }) {
  const formData = await request.formData();
  // const noteData = {
  //   title: formData.get('name'),
  //   content: formData.get('content')
  // }
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title - must be 5 characters long!" };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);
  // await new Promise((resolve, reject) => setTimeout(() => resolve(updatedNotes), 2000))
  return redirect("/notes");
}

export function ErrorBoundary({ error }) {
  return (
    <main className="error">
      <h1>An error related to your notes occured!</h1>
      <p>{error}</p>
      <p>
        Back to <Link to="/">Safety</Link>
      </p>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [...newNoteLinks(), ...noteListsLinks()];
};

export function meta() {
  return [{
    title: 'All Notes',
    description: 'Manage your notes with ease.',
  }];
}

