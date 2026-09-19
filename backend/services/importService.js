// // const XLSX = require("xlsx");
// // const { parse } = require("csv-parse/sync");

// // const ALLOWED_EXTENSIONS = [".xlsx", ".csv"];

// // const MAX_ROWS = 5000;

// // const normalizeHeader = (header) => {
// //   return String(header || "")
// //     .trim()
// //     .toLowerCase()
// //     .replace(/\s+/g, "_")
// //     .replace(/-/g, "_");
// // };

// // const normalizeRow = (row) => {
// //   const normalized = {};

// //   Object.entries(row).forEach(([key, value]) => {
// //     normalized[normalizeHeader(key)] =
// //       typeof value === "string"
// //         ? value.trim()
// //         : value;
// //   });

// //   return normalized;
// // };

// // const getFileExtension = (filename) => {
// //   const index = filename.lastIndexOf(".");

// //   if (index === -1) {
// //     return "";
// //   }

// //   return filename
// //     .substring(index)
// //     .toLowerCase();
// // };

// // const parseExcelFile = (buffer) => {
// //   const workbook = XLSX.read(buffer, {
// //     type: "buffer",
// //     cellDates: true,
// //   });

// //   if (!workbook.SheetNames.length) {
// //     throw new Error(
// //       "The Excel file does not contain any worksheet."
// //     );
// //   }

// //   const firstSheet =
// //     workbook.Sheets[workbook.SheetNames[0]];

// //   const rows = XLSX.utils.sheet_to_json(
// //     firstSheet,
// //     {
// //       defval: "",
// //       raw: false,
// //     }
// //   );

// //   return rows;
// // };

// // const parseCsvFile = (buffer) => {
// //   const text = buffer.toString("utf8");

// //   return parse(text, {
// //     columns: true,
// //     skip_empty_lines: true,
// //     trim: true,
// //     bom: true,
// //   });
// // };

// // const parseUploadedFile = (file) => {
// //   if (!file) {
// //     throw new Error("No file was uploaded.");
// //   }

// //   const extension = getFileExtension(
// //     file.originalname
// //   );

// //   if (!ALLOWED_EXTENSIONS.includes(extension)) {
// //     throw new Error(
// //       "Only .xlsx and .csv files are supported."
// //     );
// //   }

// //   let rows;

// //   if (extension === ".xlsx") {
// //     rows = parseExcelFile(file.buffer);
// //   } else {
// //     rows = parseCsvFile(file.buffer);
// //   }

// //   if (!Array.isArray(rows)) {
// //     throw new Error(
// //       "Unable to read the uploaded file."
// //     );
// //   }

// //   if (rows.length === 0) {
// //     throw new Error(
// //       "The uploaded file does not contain any data."
// //     );
// //   }

// //   if (rows.length > MAX_ROWS) {
// //     throw new Error(
// //       `Maximum ${MAX_ROWS} records can be imported at once.`
// //     );
// //   }

// //   const normalizedRows = rows.map(normalizeRow);

// //   return {
// //     extension,
// //     rows: normalizedRows,
// //   };
// // };

// // const validateStudentRows = (rows) => {
// //   const errors = [];

// //   const requiredColumns = [
// //     "student_id",
// //     "name",
// //     "email",
// //   ];

// //   if (!rows.length) {
// //     return {
// //       valid: false,
// //       errors: ["No student records found."],
// //     };
// //   }

// //   const columns = Object.keys(rows[0]);

// //   for (const column of requiredColumns) {
// //     if (!columns.includes(column)) {
// //       errors.push(
// //         `Missing required column: ${column}`
// //       );
// //     }
// //   }

// //   if (errors.length) {
// //     return {
// //       valid: false,
// //       errors,
// //     };
// //   }

// //   const seenStudentIds = new Set();
// //   const seenEmails = new Set();

// //   rows.forEach((row, index) => {
// //     const rowNumber = index + 2;

// //     const studentId = String(
// //       row.student_id || ""
// //     ).trim();

// //     const name = String(
// //       row.name || ""
// //     ).trim();

// //     const email = String(
// //       row.email || ""
// //     )
// //       .trim()
// //       .toLowerCase();

// //     if (!studentId) {
// //       errors.push(
// //         `Row ${rowNumber}: student_id is required.`
// //       );
// //     }

// //     if (!name) {
// //       errors.push(
// //         `Row ${rowNumber}: name is required.`
// //       );
// //     }

// //     if (!email) {
// //       errors.push(
// //         `Row ${rowNumber}: email is required.`
// //       );
// //     } else if (
// //       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: invalid email address.`
// //       );
// //     }

// //     if (
// //       studentId &&
// //       seenStudentIds.has(studentId)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: duplicate student_id ${studentId} in uploaded file.`
// //       );
// //     }

// //     if (
// //       email &&
// //       seenEmails.has(email)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
// //       );
// //     }

// //     if (studentId) {
// //       seenStudentIds.add(studentId);
// //     }

// //     if (email) {
// //       seenEmails.add(email);
// //     }

// //     if (
// //       row.semester !== undefined &&
// //       row.semester !== ""
// //     ) {
// //       const semester = Number(row.semester);

// //       if (
// //         !Number.isInteger(semester) ||
// //         semester < 1
// //       ) {
// //         errors.push(
// //           `Row ${rowNumber}: semester must be a positive integer.`
// //         );
// //       }
// //     }
// //   });

// //   return {
// //     valid: errors.length === 0,
// //     errors,
// //   };
// // };

// // const validateFacultyRows = (rows) => {
// //   const errors = [];

// //   const requiredColumns = [
// //     "employee_id",
// //     "name",
// //     "email",
// //   ];

// //   if (!rows.length) {
// //     return {
// //       valid: false,
// //       errors: ["No faculty records found."],
// //     };
// //   }

// //   const columns = Object.keys(rows[0]);

// //   for (const column of requiredColumns) {
// //     if (!columns.includes(column)) {
// //       errors.push(
// //         `Missing required column: ${column}`
// //       );
// //     }
// //   }

// //   if (errors.length) {
// //     return {
// //       valid: false,
// //       errors,
// //     };
// //   }

// //   const seenEmployeeIds = new Set();
// //   const seenEmails = new Set();

// //   rows.forEach((row, index) => {
// //     const rowNumber = index + 2;

// //     const employeeId = String(
// //       row.employee_id || ""
// //     ).trim();

// //     const name = String(
// //       row.name || ""
// //     ).trim();

// //     const email = String(
// //       row.email || ""
// //     )
// //       .trim()
// //       .toLowerCase();

// //     if (!employeeId) {
// //       errors.push(
// //         `Row ${rowNumber}: employee_id is required.`
// //       );
// //     }

// //     if (!name) {
// //       errors.push(
// //         `Row ${rowNumber}: name is required.`
// //       );
// //     }

// //     if (!email) {
// //       errors.push(
// //         `Row ${rowNumber}: email is required.`
// //       );
// //     } else if (
// //       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: invalid email address.`
// //       );
// //     }

// //     if (
// //       employeeId &&
// //       seenEmployeeIds.has(employeeId)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: duplicate employee_id ${employeeId} in uploaded file.`
// //       );
// //     }

// //     if (
// //       email &&
// //       seenEmails.has(email)
// //     ) {
// //       errors.push(
// //         `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
// //       );
// //     }

// //     if (employeeId) {
// //       seenEmployeeIds.add(employeeId);
// //     }

// //     if (email) {
// //       seenEmails.add(email);
// //     }
// //   });

// //   return {
// //     valid: errors.length === 0,
// //     errors,
// //   };
// // };

// // const validateRows = (type, rows) => {
// //   if (type === "student") {
// //     return validateStudentRows(rows);
// //   }

// //   if (type === "faculty") {
// //     return validateFacultyRows(rows);
// //   }

// //   return {
// //     valid: false,
// //     errors: [
// //       "Import type must be student or faculty.",
// //     ],
// //   };
// // };

// // module.exports = {
// //   parseUploadedFile,
// //   validateRows,
// // };

// import { getAccessToken } from "./authService";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";

// // ============================================
// // Preview
// // ============================================

// export const previewImport = async ({
//   type,
//   file,
// }) => {
//   const token = getAccessToken();

//   if (!token) {
//     throw new Error(
//       "Your session has expired. Please log in again."
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

//   const data = await response.json();

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

// // ============================================
// // Confirm Import
// // ============================================

// export const commitImport = async ({
//   type,
//   file,
// }) => {
//   const token = getAccessToken();

//   if (!token) {
//     throw new Error(
//       "Your session has expired. Please log in again."
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

//   const data = await response.json();

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

const XLSX = require("xlsx");
const { parse } = require("csv-parse/sync");

const ALLOWED_EXTENSIONS = [".xlsx", ".csv"];
const MAX_ROWS = 5000;

/* =========================================================
   Normalize Header
========================================================= */

const normalizeHeader = (header) => {
  return String(header || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
};

/* =========================================================
   Normalize Row
========================================================= */

const normalizeRow = (row) => {
  const normalized = {};

  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeHeader(key)] =
      typeof value === "string"
        ? value.trim()
        : value;
  });

  return normalized;
};

/* =========================================================
   Get File Extension
========================================================= */

const getFileExtension = (filename) => {
  const index = filename.lastIndexOf(".");

  if (index === -1) {
    return "";
  }

  return filename
    .substring(index)
    .toLowerCase();
};

/* =========================================================
   Parse Excel
========================================================= */

const parseExcelFile = (buffer) => {
  const workbook = XLSX.read(buffer, {
    type: "buffer",
    cellDates: true,
  });

  if (!workbook.SheetNames.length) {
    throw new Error(
      "The Excel file does not contain any worksheet."
    );
  }

  const firstSheet =
    workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(
    firstSheet,
    {
      defval: "",
      raw: false,
    }
  );

  return rows;
};

/* =========================================================
   Parse CSV
========================================================= */

const parseCsvFile = (buffer) => {
  const text = buffer.toString("utf8");

  return parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true,
  });
};

/* =========================================================
   Parse Uploaded File
========================================================= */

const parseUploadedFile = (file) => {
  if (!file) {
    throw new Error("No file was uploaded.");
  }

  const extension = getFileExtension(
    file.originalname
  );

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error(
      "Only .xlsx and .csv files are supported."
    );
  }

  let rows;

  if (extension === ".xlsx") {
    rows = parseExcelFile(file.buffer);
  } else {
    rows = parseCsvFile(file.buffer);
  }

  if (!Array.isArray(rows)) {
    throw new Error(
      "Unable to read the uploaded file."
    );
  }

  if (rows.length === 0) {
    throw new Error(
      "The uploaded file does not contain any data."
    );
  }

  if (rows.length > MAX_ROWS) {
    throw new Error(
      `Maximum ${MAX_ROWS} records can be imported at once.`
    );
  }

  const normalizedRows =
    rows.map(normalizeRow);

  return {
    extension,
    rows: normalizedRows,
  };
};

/* =========================================================
   Validate Student Rows
========================================================= */

const validateStudentRows = (rows) => {
  const errors = [];

  const requiredColumns = [
    "student_id",
    "name",
    "email",
  ];

  if (!rows.length) {
    return {
      valid: false,
      errors: ["No student records found."],
    };
  }

  const columns = Object.keys(rows[0]);

  for (const column of requiredColumns) {
    if (!columns.includes(column)) {
      errors.push(
        `Missing required column: ${column}`
      );
    }
  }

  if (errors.length) {
    return {
      valid: false,
      errors,
    };
  }

  const seenStudentIds = new Set();
  const seenEmails = new Set();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    const studentId = String(
      row.student_id || ""
    ).trim();

    const name = String(
      row.name || ""
    ).trim();

    const email = String(
      row.email || ""
    )
      .trim()
      .toLowerCase();

    /* Student ID */

    if (!studentId) {
      errors.push(
        `Row ${rowNumber}: student_id is required.`
      );
    }

    /* Name */

    if (!name) {
      errors.push(
        `Row ${rowNumber}: name is required.`
      );
    }

    /* Email */

    if (!email) {
      errors.push(
        `Row ${rowNumber}: email is required.`
      );
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.push(
        `Row ${rowNumber}: invalid email address.`
      );
    }

    /* Duplicate Student ID */

    if (
      studentId &&
      seenStudentIds.has(studentId)
    ) {
      errors.push(
        `Row ${rowNumber}: duplicate student_id ${studentId} in uploaded file.`
      );
    }

    /* Duplicate Email */

    if (
      email &&
      seenEmails.has(email)
    ) {
      errors.push(
        `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
      );
    }

    if (studentId) {
      seenStudentIds.add(studentId);
    }

    if (email) {
      seenEmails.add(email);
    }

    /* Semester */

    if (
      row.semester !== undefined &&
      row.semester !== ""
    ) {
      const semester = Number(
        row.semester
      );

      if (
        !Number.isInteger(semester) ||
        semester < 1
      ) {
        errors.push(
          `Row ${rowNumber}: semester must be a positive integer.`
        );
      }
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/* =========================================================
   Validate Faculty Rows
========================================================= */

const validateFacultyRows = (rows) => {
  const errors = [];

  const requiredColumns = [
    "employee_id",
    "name",
    "email",
  ];

  if (!rows.length) {
    return {
      valid: false,
      errors: ["No faculty records found."],
    };
  }

  const columns = Object.keys(rows[0]);

  for (const column of requiredColumns) {
    if (!columns.includes(column)) {
      errors.push(
        `Missing required column: ${column}`
      );
    }
  }

  if (errors.length) {
    return {
      valid: false,
      errors,
    };
  }

  const seenEmployeeIds = new Set();
  const seenEmails = new Set();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    const employeeId = String(
      row.employee_id || ""
    ).trim();

    const name = String(
      row.name || ""
    ).trim();

    const email = String(
      row.email || ""
    )
      .trim()
      .toLowerCase();

    /* Employee ID */

    if (!employeeId) {
      errors.push(
        `Row ${rowNumber}: employee_id is required.`
      );
    }

    /* Name */

    if (!name) {
      errors.push(
        `Row ${rowNumber}: name is required.`
      );
    }

    /* Email */

    if (!email) {
      errors.push(
        `Row ${rowNumber}: email is required.`
      );
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.push(
        `Row ${rowNumber}: invalid email address.`
      );
    }

    /* Duplicate Employee ID */

    if (
      employeeId &&
      seenEmployeeIds.has(employeeId)
    ) {
      errors.push(
        `Row ${rowNumber}: duplicate employee_id ${employeeId} in uploaded file.`
      );
    }

    /* Duplicate Email */

    if (
      email &&
      seenEmails.has(email)
    ) {
      errors.push(
        `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
      );
    }

    if (employeeId) {
      seenEmployeeIds.add(employeeId);
    }

    if (email) {
      seenEmails.add(email);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
};

/* =========================================================
   Validate Rows
========================================================= */

const validateRows = (type, rows) => {
  if (type === "student") {
    return validateStudentRows(rows);
  }

  if (type === "faculty") {
    return validateFacultyRows(rows);
  }

  return {
    valid: false,
    errors: [
      "Import type must be student or faculty.",
    ],
  };
};

/* =========================================================
   Export
========================================================= */

module.exports = {
  parseUploadedFile,
  validateRows,
};