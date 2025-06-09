import React from "react";
import { useState } from "react";
import TagError from "../components/TagError";
import { schemaNote } from "../validate/shemaNote";
import { ValidationError } from "yup";
import * as Yup from "yup";
import { createNoteApi, deleteNoteApi } from "../api/noteApi.js";
import { toast } from "react-toastify";
import useNoteStore from "../stores/noteStore.js";
import { useEffect } from "react";
import NoteItem from "../components/NoteItem.jsx";

const initialInput = {
  topic: "",
  detail: "",
};

function NotePage() {
  const actionFetchAllNote = useNoteStore((state) => state.actionFetchAllNotes);
  const notes = useNoteStore((state) => state.notes);

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    actionFetchAllNote();
  }, [actionFetchAllNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // validate input
      schemaNote.validateSync(input, { abortEarly: false });

      // api
      await createNoteApi(input);

      // alert
      toast.success("Note created");
      document.getElementById("my_modal_2").close();
      setInputError(initialInput);
      setInput(initialInput);
    } catch (err) {
      // console.log(err.inner)

      // if (error.name === "ValidateError") {

      // }
      toast.error("Failed to create");

      if (err instanceof Yup.ValidationError) {
        const result = err.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(result);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // console.log('delete')

      await deleteNoteApi(id);
      toast.success("Deleted");
      actionFetchAllNote();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="text-3xl">Note List</h3>
      <button
        className="my-4 px-4 py-2 text-white bg-pink-500 rounded-xl cursor-pointer hover:bg-pink-700 duration-200"
        onClick={() => {
          setInput(initialInput);
          setInputError(initialInput);
          document.getElementById("my_modal_2").showModal();
        }}
      >
        Create Note
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-col gap-2 rounded-2xl">
          <h1 className="text-2xl text-center">Create Note</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className={`w-full px-4 py-2 bg-gray-200 rounded-xl outline-0`}
                type="text"
                placeholder="Enter your Topic"
                name="topic"
                onChange={handleChange}
                value={input.topic}
              />
              <div className="h-6 mt-1">
                <TagError error={inputError.topic} />
              </div>
            </div>
            <div>
              <textarea
                rows={5}
                placeholder="Enter your detail"
                className={`w-full px-4 py-2 bg-gray-200 rounded-xl outline-0 resize-none`}
                name="detail"
                onChange={handleChange}
                value={input.detail}
              ></textarea>
              <div className="h-6">
                <TagError error={inputError.detail} />
              </div>
            </div>
            <button
              className="w-full text-white py-2 bg-pink-500 rounded-xl cursor-pointer hover:bg-pink-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div className="flex gap-6 flex-wrap">
        {notes.map((item) => (
          <NoteItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default NotePage;
