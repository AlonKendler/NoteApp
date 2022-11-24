import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tags } from "./App";
import { v4 as uuidV4 } from "uuid";

interface NoteFormProps {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags: Tags[];
}

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
}: NoteFormProps): React.ReactElement {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(
      "handleSubmit:",
      titleRef.current?.value,
      markdownRef.current?.value
    );
    // the ! is telling ts that we know value is not null (cuz required by bootsrap UI)
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                isMulti
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onCreateOption={(label) => {
                  const newTag: Tags = { id: uuidV4(), label: label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
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
        <Row>
          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control ref={markdownRef} required as="textarea" rows={10} />
          </Form.Group>
        </Row>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
