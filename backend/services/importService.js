

// const XLSX = require("xlsx");
// const { parse } = require("csv-parse/sync");

// const ALLOWED_EXTENSIONS = [".xlsx", ".csv"];
// const MAX_ROWS = 5000;

// /* =========================================================
//    Normalize Header
// ========================================================= */

// const normalizeHeader = (header) => {
//   return String(header || "")
//     .trim()
//     .toLowerCase()
//     .replace(/\s+/g, "_")
//     .replace(/-/g, "_");
// };

// /* =========================================================
//    Normalize Row
// ========================================================= */

// const normalizeRow = (row) => {
//   const normalized = {};

//   Object.entries(row).forEach(([key, value]) => {
//     normalized[normalizeHeader(key)] =
//       typeof value === "string"
//         ? value.trim()
//         : value;
//   });

//   return normalized;
// };

// /* =========================================================
//    Get File Extension
// ========================================================= */

// const getFileExtension = (filename) => {
//   const index = filename.lastIndexOf(".");

//   if (index === -1) {
//     return "";
//   }

//   return filename
//     .substring(index)
//     .toLowerCase();
// };

// /* =========================================================
//    Parse Excel
// ========================================================= */

// const parseExcelFile = (buffer) => {
//   const workbook = XLSX.read(buffer, {
//     type: "buffer",
//     cellDates: true,
//   });

//   if (!workbook.SheetNames.length) {
//     throw new Error(
//       "The Excel file does not contain any worksheet."
//     );
//   }

//   const firstSheet =
//     workbook.Sheets[workbook.SheetNames[0]];

//   const rows = XLSX.utils.sheet_to_json(
//     firstSheet,
//     {
//       defval: "",
//       raw: false,
//     }
//   );

//   return rows;
// };

// /* =========================================================
//    Parse CSV
// ========================================================= */

// const parseCsvFile = (buffer) => {
//   const text = buffer.toString("utf8");

//   return parse(text, {
//     columns: true,
//     skip_empty_lines: true,
//     trim: true,
//     bom: true,
//   });
// };

// /* =========================================================
//    Parse Uploaded File
// ========================================================= */

// const parseUploadedFile = (file) => {
//   if (!file) {
//     throw new Error("No file was uploaded.");
//   }

//   const extension = getFileExtension(
//     file.originalname
//   );

//   if (!ALLOWED_EXTENSIONS.includes(extension)) {
//     throw new Error(
//       "Only .xlsx and .csv files are supported."
//     );
//   }

//   let rows;

//   if (extension === ".xlsx") {
//     rows = parseExcelFile(file.buffer);
//   } else {
//     rows = parseCsvFile(file.buffer);
//   }

//   if (!Array.isArray(rows)) {
//     throw new Error(
//       "Unable to read the uploaded file."
//     );
//   }

//   if (rows.length === 0) {
//     throw new Error(
//       "The uploaded file does not contain any data."
//     );
//   }

//   if (rows.length > MAX_ROWS) {
//     throw new Error(
//       `Maximum ${MAX_ROWS} records can be imported at once.`
//     );
//   }

//   const normalizedRows =
//     rows.map(normalizeRow);

//   return {
//     extension,
//     rows: normalizedRows,
//   };
// };

// /* =========================================================
//    Validate Student Rows
// ========================================================= */

// const validateStudentRows = (rows) => {
//   const errors = [];

//   const requiredColumns = [
//     "student_id",
//     "name",
//     "email",
//   ];

//   if (!rows.length) {
//     return {
//       valid: false,
//       errors: ["No student records found."],
//     };
//   }

//   const columns = Object.keys(rows[0]);

//   for (const column of requiredColumns) {
//     if (!columns.includes(column)) {
//       errors.push(
//         `Missing required column: ${column}`
//       );
//     }
//   }

//   if (errors.length) {
//     return {
//       valid: false,
//       errors,
//     };
//   }

//   const seenStudentIds = new Set();
//   const seenEmails = new Set();

//   rows.forEach((row, index) => {
//     const rowNumber = index + 2;

//     const studentId = String(
//       row.student_id || ""
//     ).trim();

//     const name = String(
//       row.name || ""
//     ).trim();

//     const email = String(
//       row.email || ""
//     )
//       .trim()
//       .toLowerCase();

//     /* Student ID */

//     if (!studentId) {
//       errors.push(
//         `Row ${rowNumber}: student_id is required.`
//       );
//     }

//     /* Name */

//     if (!name) {
//       errors.push(
//         `Row ${rowNumber}: name is required.`
//       );
//     }

//     /* Email */

//     if (!email) {
//       errors.push(
//         `Row ${rowNumber}: email is required.`
//       );
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: invalid email address.`
//       );
//     }

//     /* Duplicate Student ID */

//     if (
//       studentId &&
//       seenStudentIds.has(studentId)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: duplicate student_id ${studentId} in uploaded file.`
//       );
//     }

//     /* Duplicate Email */

//     if (
//       email &&
//       seenEmails.has(email)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
//       );
//     }

//     if (studentId) {
//       seenStudentIds.add(studentId);
//     }

//     if (email) {
//       seenEmails.add(email);
//     }

//     /* Semester */

//     if (
//       row.semester !== undefined &&
//       row.semester !== ""
//     ) {
//       const semester = Number(
//         row.semester
//       );

//       if (
//         !Number.isInteger(semester) ||
//         semester < 1
//       ) {
//         errors.push(
//           `Row ${rowNumber}: semester must be a positive integer.`
//         );
//       }
//     }
//   });

//   return {
//     valid: errors.length === 0,
//     errors,
//   };
// };

// /* =========================================================
//    Validate Faculty Rows
// ========================================================= */

// const validateFacultyRows = (rows) => {
//   const errors = [];

//   const requiredColumns = [
//     "employee_id",
//     "name",
//     "email",
//   ];

//   if (!rows.length) {
//     return {
//       valid: false,
//       errors: ["No faculty records found."],
//     };
//   }

//   const columns = Object.keys(rows[0]);

//   for (const column of requiredColumns) {
//     if (!columns.includes(column)) {
//       errors.push(
//         `Missing required column: ${column}`
//       );
//     }
//   }

//   if (errors.length) {
//     return {
//       valid: false,
//       errors,
//     };
//   }

//   const seenEmployeeIds = new Set();
//   const seenEmails = new Set();

//   rows.forEach((row, index) => {
//     const rowNumber = index + 2;

//     const employeeId = String(
//       row.employee_id || ""
//     ).trim();

//     const name = String(
//       row.name || ""
//     ).trim();

//     const email = String(
//       row.email || ""
//     )
//       .trim()
//       .toLowerCase();

//     /* Employee ID */

//     if (!employeeId) {
//       errors.push(
//         `Row ${rowNumber}: employee_id is required.`
//       );
//     }

//     /* Name */

//     if (!name) {
//       errors.push(
//         `Row ${rowNumber}: name is required.`
//       );
//     }

//     /* Email */

//     if (!email) {
//       errors.push(
//         `Row ${rowNumber}: email is required.`
//       );
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: invalid email address.`
//       );
//     }

//     /* Duplicate Employee ID */

//     if (
//       employeeId &&
//       seenEmployeeIds.has(employeeId)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: duplicate employee_id ${employeeId} in uploaded file.`
//       );
//     }

//     /* Duplicate Email */

//     if (
//       email &&
//       seenEmails.has(email)
//     ) {
//       errors.push(
//         `Row ${rowNumber}: duplicate email ${email} in uploaded file.`
//       );
//     }

//     if (employeeId) {
//       seenEmployeeIds.add(employeeId);
//     }

//     if (email) {
//       seenEmails.add(email);
//     }
//   });

//   return {
//     valid: errors.length === 0,
//     errors,
//   };
// };

// /* =========================================================
//    Validate Rows
// ========================================================= */

// const validateRows = (type, rows) => {
//   if (type === "student") {
//     return validateStudentRows(rows);
//   }

//   if (type === "faculty") {
//     return validateFacultyRows(rows);
//   }

//   return {
//     valid: false,
//     errors: [
//       "Import type must be student or faculty.",
//     ],
//   };
// };

// /* =========================================================
//    Export
// ========================================================= */

// module.exports = {
//   parseUploadedFile,
//   validateRows,
// };


const XLSX = require("xlsx");
const { parse } = require("csv-parse/sync");

const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];
const MAX_ROWS = 5000;

/* =========================================================
   Normalize Header
========================================================= */

const normalizeHeader = (header) => {
  return String(header || "")
    .trim()
    .toLowerCase()
    .replace(/[\s\-\/\\]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
};

/* =========================================================
   Smart Column Mapper
   Accepts many variations → maps to internal field name
========================================================= */

const FACULTY_COLUMN_MAP = {
  employee_id: [
    "employee_id", "employeeid", "emp_id", "empid",
    "faculty_id", "facultyid", "staff_id", "staffid",
    "faculty_code", "staff_code", "emp_code", "empcode",
    "id", "faculty_no", "staff_no", "employee_no",
    "employeeno", "facid", "fac_id"
  ],
  name: [
    "name", "full_name", "fullname", "faculty_name",
    "facultyname", "staff_name", "staffname",
    "employee_name", "employeename", "teacher_name"
  ],
  email: [
    "email", "email_id", "emailid", "mail",
    "mail_id", "mailid", "official_email",
    "officialemail", "email_address", "emailaddress",
    "work_email", "college_email"
  ],
  department: [
    "department", "dept", "dept_name", "deptname",
    "department_name", "departmentname", "school",
    "faculty_dept", "division"
  ],
  designation: [
    "designation", "title", "post", "position",
    "job_title", "jobtitle", "rank", "role",
    "faculty_designation", "staff_designation"
  ],
  phone: [
    "phone", "mobile", "contact", "phone_no",
    "phoneno", "mobile_no", "mobileno", "contact_no",
    "contactno", "cell", "telephone", "tel",
    "phone_number", "phonenumber", "mobile_number"
  ],
  date_of_birth: [
    "date_of_birth", "dob", "birth_date", "birthdate",
    "birth_day", "birthday", "d_o_b", "dateofbirth",
    "date_birth", "born_on", "born", "birth"
  ],
  gender: [
    "gender", "sex", "gender_type"
  ],
  address: [
    "address", "addr", "residential_address",
    "home_address", "permanent_address"
  ],
  joining_date: [
    "joining_date", "join_date", "joindate",
    "date_of_joining", "dateofjoining", "joined_on",
    "start_date", "startdate"
  ],
};

const STUDENT_COLUMN_MAP = {
  student_id: [
    "student_id", "studentid", "stud_id", "studid",
    "roll_no", "rollno", "roll_number", "rollnumber",
    "enrollment_no", "enrollmentno", "enrollment_id",
    "enrollmentid", "enroll_no", "admission_no",
    "admissionno", "reg_no", "regno", "registration_no",
    "registrationno", "id", "student_no", "stud_no"
  ],
  name: [
    "name", "full_name", "fullname", "student_name",
    "studentname", "stud_name", "studname",
    "candidate_name", "scholar_name"
  ],
  email: [
    "email", "email_id", "emailid", "mail",
    "mail_id", "mailid", "student_email",
    "studentemail", "email_address", "emailaddress",
    "personal_email", "college_email"
  ],
  course: [
    "course", "program", "programme", "degree",
    "course_name", "coursename", "program_name",
    "programname", "stream"
  ],
  department: [
    "department", "dept", "dept_name", "deptname",
    "department_name", "departmentname", "school",
    "branch", "division"
  ],
  semester: [
    "semester", "sem", "term", "semester_no",
    "semno", "current_semester", "sem_no"
  ],
  phone: [
    "phone", "mobile", "contact", "phone_no",
    "phoneno", "mobile_no", "mobileno", "contact_no",
    "contactno", "cell", "telephone", "tel",
    "phone_number", "phonenumber", "mobile_number"
  ],
  date_of_birth: [
    "date_of_birth", "dob", "birth_date", "birthdate",
    "birth_day", "birthday", "d_o_b", "dateofbirth",
    "date_birth", "born_on", "born", "birth"
  ],
  gender: [
    "gender", "sex", "gender_type"
  ],
  address: [
    "address", "addr", "residential_address",
    "home_address", "permanent_address"
  ],
  year: [
    "year", "academic_year", "academicyear",
    "study_year", "class_year"
  ],
};

/* =========================================================
   Map Row Columns to Internal Fields
========================================================= */

const mapRowColumns = (row, columnMap) => {
  const normalizedRow = {};

  // Normalize all incoming keys first
  const incomingKeys = {};
  Object.entries(row).forEach(([key, value]) => {
    incomingKeys[normalizeHeader(key)] = value;
  });

  // For each internal field, find a match
  Object.entries(columnMap).forEach(([internalField, aliases]) => {
    for (const alias of aliases) {
      if (incomingKeys.hasOwnProperty(alias)) {
        const val = incomingKeys[alias];
        normalizedRow[internalField] =
          typeof val === "string" ? val.trim() : val;
        break;
      }
    }
  });

  return normalizedRow;
};

/* =========================================================
   Get File Extension
========================================================= */

const getFileExtension = (filename) => {
  const index = filename.lastIndexOf(".");
  if (index === -1) return "";
  return filename.substring(index).toLowerCase();
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

  const rows = XLSX.utils.sheet_to_json(firstSheet, {
    defval: "",
    raw: false,
  });

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

  const extension = getFileExtension(file.originalname);

  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error(
      "Only .xlsx, .xls and .csv files are supported."
    );
  }

  let rows;

  if (extension === ".xlsx" || extension === ".xls") {
    rows = parseExcelFile(file.buffer);
  } else {
    rows = parseCsvFile(file.buffer);
  }

  if (!Array.isArray(rows)) {
    throw new Error("Unable to read the uploaded file.");
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

  return {
    extension,
    rows, // raw rows — mapping happens in validate
  };
};

/* =========================================================
   Validate Faculty Rows
========================================================= */

const validateFacultyRows = (rows) => {
  const errors = [];
  const warnings = [];

  if (!rows.length) {
    return {
      valid: false,
      errors: ["No faculty records found in the file."],
      warnings: [],
      mappedRows: [],
    };
  }

  // Map all rows using smart column detection
  const mappedRows = rows.map((row) =>
    mapRowColumns(row, FACULTY_COLUMN_MAP)
  );

  // Check if we can identify the ID column at all
  const firstRow = mappedRows[0];

  if (!firstRow.hasOwnProperty("employee_id")) {
    errors.push(
      "Could not find a Faculty/Employee ID column. " +
      "Accepted column names: Faculty ID, Employee ID, " +
      "Staff ID, Emp ID, Faculty Code, Staff Code, " +
      "Employee No, Faculty No"
    );
  }

  if (!firstRow.hasOwnProperty("name")) {
    errors.push(
      "Could not find a Name column. " +
      "Accepted column names: Name, Full Name, " +
      "Faculty Name, Staff Name, Employee Name"
    );
  }

  // Warn about optional missing columns
  if (!firstRow.hasOwnProperty("email")) {
    warnings.push(
      "No Email column found. Faculty will be imported without email."
    );
  }

  if (!firstRow.hasOwnProperty("department")) {
    warnings.push(
      "No Department column found. Faculty will be imported without department."
    );
  }

  if (!firstRow.hasOwnProperty("date_of_birth")) {
    warnings.push(
      "No Date of Birth column found. Faculty will be imported without DOB."
    );
  }

  // Stop if critical columns missing
  if (errors.length) {
    return { valid: false, errors, warnings, mappedRows: [] };
  }

  const seenEmployeeIds = new Set();
  const seenEmails = new Set();

  mappedRows.forEach((row, index) => {
    const rowNumber = index + 2;

    const employeeId = String(
      row.employee_id || ""
    ).trim();

    const name = String(row.name || "").trim();

    const email = String(row.email || "")
      .trim()
      .toLowerCase();

    // Employee ID — required
    if (!employeeId) {
      errors.push(
        `Row ${rowNumber}: Faculty/Employee ID is empty.`
      );
    }

    // Name — required
    if (!name) {
      errors.push(`Row ${rowNumber}: Name is empty.`);
    }

    // Email — optional, but validate format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      warnings.push(
        `Row ${rowNumber}: Email "${email}" looks invalid — will be skipped.`
      );
    }

    // Duplicate employee ID in file
    if (employeeId && seenEmployeeIds.has(employeeId)) {
      errors.push(
        `Row ${rowNumber}: Duplicate Faculty ID "${employeeId}" in file.`
      );
    }

    // Duplicate email in file
    if (email && seenEmails.has(email)) {
      warnings.push(
        `Row ${rowNumber}: Duplicate email "${email}" in file.`
      );
    }

    if (employeeId) seenEmployeeIds.add(employeeId);
    if (email) seenEmails.add(email);
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    mappedRows,
  };
};

/* =========================================================
   Validate Student Rows
========================================================= */

const validateStudentRows = (rows) => {
  const errors = [];
  const warnings = [];

  if (!rows.length) {
    return {
      valid: false,
      errors: ["No student records found in the file."],
      warnings: [],
      mappedRows: [],
    };
  }

  // Map all rows using smart column detection
  const mappedRows = rows.map((row) =>
    mapRowColumns(row, STUDENT_COLUMN_MAP)
  );

  const firstRow = mappedRows[0];

  // Critical columns
  if (!firstRow.hasOwnProperty("student_id")) {
    errors.push(
      "Could not find a Student ID column. " +
      "Accepted column names: Student ID, Roll No, " +
      "Enrollment No, Admission No, Reg No, " +
      "Registration No, Student No"
    );
  }

  if (!firstRow.hasOwnProperty("name")) {
    errors.push(
      "Could not find a Name column. " +
      "Accepted column names: Name, Full Name, " +
      "Student Name, Candidate Name"
    );
  }

  // Optional column warnings
  if (!firstRow.hasOwnProperty("email")) {
    warnings.push(
      "No Email column found. Students will be imported without email."
    );
  }

  if (!firstRow.hasOwnProperty("department")) {
    warnings.push(
      "No Department column found."
    );
  }

  if (!firstRow.hasOwnProperty("date_of_birth")) {
    warnings.push(
      "No Date of Birth column found."
    );
  }

  if (errors.length) {
    return { valid: false, errors, warnings, mappedRows: [] };
  }

  const seenStudentIds = new Set();
  const seenEmails = new Set();

  mappedRows.forEach((row, index) => {
    const rowNumber = index + 2;

    const studentId = String(
      row.student_id || ""
    ).trim();

    const name = String(row.name || "").trim();

    const email = String(row.email || "")
      .trim()
      .toLowerCase();

    // Student ID — required
    if (!studentId) {
      errors.push(
        `Row ${rowNumber}: Student ID is empty.`
      );
    }

    // Name — required
    if (!name) {
      errors.push(`Row ${rowNumber}: Name is empty.`);
    }

    // Email — optional
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      warnings.push(
        `Row ${rowNumber}: Email "${email}" looks invalid — will be skipped.`
      );
    }

    // Semester — optional but must be number if present
    if (row.semester !== undefined && row.semester !== "") {
      const sem = Number(row.semester);
      if (!Number.isInteger(sem) || sem < 1) {
        warnings.push(
          `Row ${rowNumber}: Semester "${row.semester}" is not valid — will be ignored.`
        );
      }
    }

    // Duplicates
    if (studentId && seenStudentIds.has(studentId)) {
      errors.push(
        `Row ${rowNumber}: Duplicate Student ID "${studentId}" in file.`
      );
    }

    if (email && seenEmails.has(email)) {
      warnings.push(
        `Row ${rowNumber}: Duplicate email "${email}" in file.`
      );
    }

    if (studentId) seenStudentIds.add(studentId);
    if (email) seenEmails.add(email);
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    mappedRows,
  };
};

/* =========================================================
   Validate Rows  (main export)
========================================================= */

const validateRows = (type, rows) => {
  if (type === "student") return validateStudentRows(rows);
  if (type === "faculty") return validateFacultyRows(rows);

  return {
    valid: false,
    errors: ["Import type must be student or faculty."],
    warnings: [],
    mappedRows: [],
  };
};

/* =========================================================
   Export
========================================================= */

module.exports = {
  parseUploadedFile,
  validateRows,
};