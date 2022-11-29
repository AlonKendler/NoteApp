import React, { useMemo, useState } from "react";
import { Col, Row, Stack, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tags } from "./App";
import { v4 as uuidV4 } from "uuid";
import { NoteCard } from "./NoteCard";
import { Tag } from "@mui/icons-material";

interface NoteListProps {
  availableTags: Tags[];
  notes: Note[];
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
}

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps): React.ReactElement {
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
  const [title, setTitle] = useState("");
  const [showTagsModal, setShowTagsModal] = useState(false);

  const handleClose = () => setShowTagsModal(false);
  const handleShow = () => setShowTagsModal(true);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, selectedTags, title]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button onClick={handleShow} variant="outline-secondary">
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => {
          return (
            <Col key={note.id}>
              <NoteCard id={note.id} title={note.title} tags={note.tags} />
            </Col>
          );
        })}
      </Row>
      <Modal
        show={showTagsModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => onDeleteTag(tag.id)}
                      variant="outline-danger"
                    >
                      X
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
