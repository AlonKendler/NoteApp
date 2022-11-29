### NoteApp is a simple react-ts (vite) application to show, create, edit and delete notes.

Tech stack used  for UI:
- react-bootsrap
- react-select for multi-select input
- react-markdown

data is stored at localStorage , see useLocalStorage custom hook.

## To run code clone repo =>install deps =>  yarn run dev

### TYPES as shown in app.tsx:
```
export type RawNote = {
  id: string;
} & RawNoteData;
export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};
export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tags[];
};

export type Tags = {
  id: string;
  label: string;
};
```
