import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllNoteApi } from "../api/noteApi";

const useNoteStore = create(
  persist((set) => ({
    notes: [],
    actionFetchAllNotes: async () => {
      const data = await getAllNoteApi()
      set({notes: data})
    }
  }),{
    name: "notes-store"
  })
)

export default useNoteStore;