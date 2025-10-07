import * as yup from 'yup';

export const buildSchema = (existingUrls) => (
    yup.string()
    .url("La URL no es válida")
    .notOneOf(existingUrls, "El feed ya existe")
    .required("El campo es obligatorio")
);