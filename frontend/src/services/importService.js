// import { getAccessToken } from "./authService";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// /*
// |--------------------------------------------------------------------------
// | Preview Import
// |--------------------------------------------------------------------------
// | Sends CSV/XLSX file to backend for:
// | - File reading
// | - Column detection
// | - Validation
// | - Duplicate checking
// | - Preview
// |--------------------------------------------------------------------------
// */

// export const previewImport = async ({ type, file }) => {
//   const token = getAccessToken();

//   if (!token) {
//     throw new Error(
//       "Your session has expired. Please log in again."
//     );
//   }

//   if (!type) {
//     throw new Error(
//       "Please select Student or Faculty."
//     );
//   }

//   if (!file) {
//     throw new Error(
//       "Please select a CSV or XLSX file."
//     );
//   }

//   const formData = new FormData();

//   formData.append("type", type);
//   formData.append("file", file);

//   const response = await fetch(
//     `${API_BASE_URL}/management/import/preview`,
//     {
//       method: "POST",

//       headers: {
//         Authorization: `Bearer ${token}`,
//       },

//       credentials: "include",

//       body: formData,
//     }
//   );

//   let data;

//   try {
//     data = await response.json();
//   } catch {
//     throw new Error(
//       "The server returned an invalid response."
//     );
//   }

//   if (!response.ok) {
//     const error = new Error(
//       data.message ||
//         "Unable to preview the imported file."
//     );

//     error.response = {
//       status: response.status,
//       data,
//     };

//     throw error;
//   }

//   return data;
// };


// /*
// |--------------------------------------------------------------------------
// | Confirm Import
// |--------------------------------------------------------------------------
// | Sends the file to backend to actually save:
// |
// | Student:
// | users + students
// |
// | Faculty:
// | users + faculty
// |--------------------------------------------------------------------------
// */

// export const commitImport = async ({ type, file }) => {
//   const token = getAccessToken();

//   if (!token) {
//     throw new Error(
//       "Your session has expired. Please log in again."
//     );
//   }

//   if (!type) {
//     throw new Error(
//       "Please select Student or Faculty."
//     );
//   }

//   if (!file) {
//     throw new Error(
//       "Please select a CSV or XLSX file."
//     );
//   }

//   const formData = new FormData();

//   formData.append("type", type);
//   formData.append("file", file);

//   const response = await fetch(
//     `${API_BASE_URL}/management/import/commit`,
//     {
//       method: "POST",

//       headers: {
//         Authorization: `Bearer ${token}`,
//       },

//       credentials: "include",

//       body: formData,
//     }
//   );

//   let data;

//   try {
//     data = await response.json();
//   } catch {
//     throw new Error(
//       "The server returned an invalid response."
//     );
//   }

//   if (!response.ok) {
//     const error = new Error(
//       data.message ||
//         "Unable to import the records."
//     );

//     error.response = {
//       status: response.status,
//       data,
//     };

//     throw error;
//   }

//   return data;
// };

import { getAccessToken } from "./authService";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// ============================================
// Preview Import
// ============================================

export const previewImport = async ({
  type,
  file,
}) => {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const formData = new FormData();

  formData.append("type", type);
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/management/import/preview`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Unable to preview the imported file."
    );

    error.response = {
      status: response.status,
      data,
    };

    throw error;
  }

  return data;
};

// ============================================
// Confirm Import
// ============================================

export const commitImport = async ({
  type,
  file,
}) => {
  const token = getAccessToken();

  if (!token) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const formData = new FormData();

  formData.append("type", type);
  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/management/import/commit`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      credentials: "include",

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message ||
        "Unable to import the records."
    );

    error.response = {
      status: response.status,
      data,
    };

    throw error;
  }

  return data;
};