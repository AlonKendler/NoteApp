import React from "react";
import { NoteData, Tags } from "./App";

import { NoteForm } from "./NoteForm";

interface NewNoteProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
}

export function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps): React.ReactElement {
  return (
    <>
      <h1 className="mb-2">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
