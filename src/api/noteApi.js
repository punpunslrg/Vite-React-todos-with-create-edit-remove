const baseURL = "http://localhost:10000/notes";

export const createNoteApi = async (input) => {
  return await fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(input),
  });

  // จริงๆมี .then((res) => res.json());
};

export const getAllNoteApi = async () => {
  return await fetch(baseURL).then((res) => res.json());
};

export const deleteNoteApi = async (id) => {
  fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
};

export const updateNoteApi = async (id, data) => {
  fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  });
}
