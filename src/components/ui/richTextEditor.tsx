import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles

const oldRichTextEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      modules={{
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          [{ 'align': [] }],
          ['link', 'blockquote'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          ['clean'],
        ],
      }}
    />
  );
};

export default oldRichTextEditor;
