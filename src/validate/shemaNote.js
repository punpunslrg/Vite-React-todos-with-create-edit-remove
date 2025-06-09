import * as Yup from 'yup'

export const schemaNote = Yup.object({
  topic: Yup.string().max(200).required("Topic is required"),
  detail: Yup.string().max(200).required("Detail is required"),
})