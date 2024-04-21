import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function PostContentEditor({ handleChange, content, oldContent }) {

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  return (
    <div className="h-screen flex items-center flex-col" dir="ltr">
      <div className="h-full w-full border-4">
        <QuillEditor
          value={content}
          defaultValue={oldContent}
          onChange={handleChange}
          modules={quillModules}
          formats={quillFormats}
          className="h-[70%] mt-10 bg-white"
        />
      </div>
    </div>
  );
}
