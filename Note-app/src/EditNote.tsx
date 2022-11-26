import React from "react";
import { NoteData, Tags } from "./App";

import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";

interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
}

export function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps): React.ReactElement {
  const note = useNote();
  return (
    <>
      <h1 className="mb-2">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
