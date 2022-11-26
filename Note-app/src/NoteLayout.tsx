import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "./App";

type NoteLayoutProps = {
  notes: Note[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();

  const note = notes.find((n) => n.id === id);

  if (note == null) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet context={note} />;
  }
}

//use this inside outles of NoteLayout
// helper function get context
export function useNote() {
  return useOutletContext<Note>();
}
