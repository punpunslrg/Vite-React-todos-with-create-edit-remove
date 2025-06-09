import React, { useEffect } from "react";
import { useState } from "react";
import TagError from "./TagError";
import { updateNoteApi } from "../api/noteApi";
import { toast } from "react-toastify";
import { schemaNote } from "../validate/shemaNote";
import * as Yup from "yup";

const initialInput = {
  topic: "",
  detail: "",
};

function NoteItem({ item, handleDelete }) {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState({
    topic: item.topic || "",
    detail: item.detail || "",
  });
  const [inputError, setInputError] = useState(initialInput);

  const modalId = `my_modal_${item.id}`;

  useEffect(() => {
    if (isEdit) {
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    }
  }, [isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    // setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  // const handleSave = async (id) => {
  //   try {
  //     await schemaNote.validate(input, { abortEarly: false });

  //     await updateNoteApi(id, input);

  //     await actionUpdateNote(id, input);

  //     toast.success("Edited");
  //     setIsEdit(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = async (e, id) => {
    try {
      console.log("yes1");

      e.preventDefault();

      // validate input
      schemaNote.validateSync(input, { abortEarly: false });

      // api
      await updateNoteApi(id, input);
      
      toast.success("Edited!");
      document.getElementById(modalId).close();
      setIsEdit(false);
      setInputError(initialInput);
      setInput(initialInput);
    } catch (err) {
      // console.log(err.inner)

      // if (error.name === "ValidateError") {

      // }

      if (err instanceof Yup.ValidationError) {
        const result = err.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(result);
      }
      toast.error("Failed to save");
    }
  };

  return (
    <div className="border border-gray-400 min-w-70 flex flex-col gap-2 p-4 rounded-2xl">
      <div>
        <p>Topic</p>
        <h3 className="text-3xl">{item.topic}</h3>
      </div>
      <p>Detail :</p>
      <div className={`w-full h-30 px-4 py-2 bg-gray-200 rounded-xl outline-0`}>
        {item.detail}
      </div>
      <div className="flex justify-end gap-2">
        <button className="btn btn-neutral" onClick={() => setIsEdit(true)}>
          EDIT
        </button>
        <button className="btn btn-error" onClick={() => handleDelete(item.id)}>
          DELETE
        </button>
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box flex flex-col gap-2 rounded-2xl">
          <h1 className="text-2xl text-center">Edit Note</h1>
          <form onSubmit={(e) => handleSubmit(e, item.id)}>
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
              Save
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}

export default NoteItem;
