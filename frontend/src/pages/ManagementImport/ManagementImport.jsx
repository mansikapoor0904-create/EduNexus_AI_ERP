

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   previewImport,
//   commitImport,
// } from "../../services/importService";
// import "./ManagementImport.css";

// const ManagementImport = () => {
//   const navigate = useNavigate();

//   const [type, setType] = useState("student");
//   const [file, setFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [importing, setImporting] = useState(false);

//   const [result, setResult] = useState(null);
//   const [importResult, setImportResult] = useState(null);

//   const [error, setError] = useState("");

//   // ============================================
//   // File Selection
//   // ============================================

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files?.[0];

//     setError("");
//     setResult(null);
//     setImportResult(null);

//     if (!selectedFile) {
//       setFile(null);
//       return;
//     }

//     const fileName = selectedFile.name.toLowerCase();

//     if (
//       !fileName.endsWith(".csv") &&
//       !fileName.endsWith(".xlsx")
//     ) {
//       setFile(null);

//       setError(
//         "Only CSV and XLSX files are allowed."
//       );

//       return;
//     }

//     if (selectedFile.size > 10 * 1024 * 1024) {
//       setFile(null);

//       setError(
//         "File size must be less than 10 MB."
//       );

//       return;
//     }

//     setFile(selectedFile);
//   };

//   // ============================================
//   // Change Type
//   // ============================================

//   const handleTypeChange = (newType) => {
//     setType(newType);
//     setFile(null);
//     setResult(null);
//     setImportResult(null);
//     setError("");
//   };

//   // ============================================
//   // Preview
//   // ============================================

//   const handlePreview = async () => {
//     setError("");
//     setImportResult(null);

//     if (!file) {
//       setError(
//         "Please select a CSV or XLSX file."
//       );

//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await previewImport({
//         type,
//         file,
//       });

//       setResult(data);
//     } catch (err) {
//       console.error(
//         "Preview import error:",
//         err
//       );

//       setResult(null);

//       setError(
//         err.message ||
//           "Unable to process the uploaded file."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // Confirm Import
//   // ============================================

//   const handleConfirmImport = async () => {
//     setError("");
//     setImportResult(null);

//     if (!file) {
//       setError(
//         "Please select a CSV or XLSX file."
//       );

//       return;
//     }

//     if (!result?.summary?.valid) {
//       setError(
//         "Please fix all validation errors before importing."
//       );

//       return;
//     }

//     try {
//       setImporting(true);

//       const data = await commitImport({
//         type,
//         file,
//       });

//       setImportResult(data);
//     } catch (err) {
//       console.error(
//         "Confirm import error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Unable to import the records."
//       );
//     } finally {
//       setImporting(false);
//     }
//   };

//   // ============================================
//   // Render
//   // ============================================

//   return (
//     <div className="management-import-page">

//       {/* ====================================== */}
//       {/* Header */}
//       {/* ====================================== */}

//       <div className="import-header">

//         <div>

//           <button
//             className="back-button"
//             onClick={() =>
//               navigate(
//                 "/management/dashboard"
//               )
//             }
//           >
//             ← Back to Dashboard
//           </button>

//           <h1>Import Data</h1>

//           <p>
//             Upload student or faculty records
//             using CSV or Excel files.
//           </p>

//         </div>

//       </div>

//       {/* ====================================== */}
//       {/* Upload Card */}
//       {/* ====================================== */}

//       <div className="import-card">

//         {/* Step 1 */}

//         <div className="import-step">

//           <span>1</span>

//           <div>
//             <h2>Select Data Type</h2>

//             <p>
//               Choose the type of records you
//               want to import.
//             </p>
//           </div>

//         </div>

//         {/* Type Selection */}

//         <div className="type-selection">

//           <button
//             type="button"
//             className={
//               type === "student"
//                 ? "type-card active"
//                 : "type-card"
//             }
//             onClick={() =>
//               handleTypeChange("student")
//             }
//           >
//             <strong>Students</strong>

//             <span>
//               Import student records
//             </span>
//           </button>

//           <button
//             type="button"
//             className={
//               type === "faculty"
//                 ? "type-card active"
//                 : "type-card"
//             }
//             onClick={() =>
//               handleTypeChange("faculty")
//             }
//           >
//             <strong>Faculty</strong>

//             <span>
//               Import faculty records
//             </span>
//           </button>

//         </div>

//         {/* Step 2 */}

//         <div className="import-step">

//           <span>2</span>

//           <div>

//             <h2>Upload File</h2>

//             <p>
//               Supported formats: .csv and .xlsx
//               <br />
//               Maximum size: 10 MB
//             </p>

//           </div>

//         </div>

//         {/* File Upload */}

//         <label className="file-upload">

//           <input
//             type="file"
//             accept=".csv,.xlsx"
//             onChange={handleFileChange}
//           />

//           <div className="upload-content">

//             <div className="upload-icon">
//               ↑
//             </div>

//             <strong>
//               {file
//                 ? file.name
//                 : "Choose CSV or Excel file"}
//             </strong>

//             <span>
//               Click to browse your computer
//             </span>

//           </div>

//         </label>

//         {/* Error */}

//         {error && (
//           <div className="import-error">
//             {error}
//           </div>
//         )}

//         {/* Preview Button */}

//         <button
//           className="preview-button"
//           onClick={handlePreview}
//           disabled={!file || loading}
//         >
//           {loading
//             ? "Processing..."
//             : "Preview & Validate"}
//         </button>

//       </div>

//       {/* ====================================== */}
//       {/* Import Preview */}
//       {/* ====================================== */}

//       {result && (

//         <div className="preview-card">

//           {/* Preview Header */}

//           <div className="preview-header">

//             <div>

//               <h2>
//                 Import Preview
//               </h2>

//               <p>
//                 {result.file?.name}
//               </p>

//             </div>

//             <div
//               className={
//                 result.summary?.valid
//                   ? "status valid"
//                   : "status invalid"
//               }
//             >
//               {result.summary?.valid
//                 ? "Valid"
//                 : "Needs Correction"}
//             </div>

//           </div>

//           {/* Summary */}

//           <div className="summary-grid">

//             <div>

//               <span>
//                 Total Records
//               </span>

//               <strong>
//                 {result.summary
//                   ?.totalRows ?? 0}
//               </strong>

//             </div>

//             <div>

//               <span>
//                 Preview Records
//               </span>

//               <strong>
//                 {result.summary
//                   ?.previewRows ?? 0}
//               </strong>

//             </div>

//             <div>

//               <span>
//                 Validation Errors
//               </span>

//               <strong>
//                 {result.summary
//                   ?.errorCount ?? 0}
//               </strong>

//             </div>

//           </div>

//           {/* Validation Errors */}

//           {result.errors?.length > 0 && (

//             <div className="validation-errors">

//               <h3>
//                 Validation Errors
//               </h3>

//               <ul>

//                 {result.errors.map(
//                   (item, index) => (
//                     <li key={index}>
//                       {item}
//                     </li>
//                   )
//                 )}

//               </ul>

//             </div>

//           )}

//           {/* Preview Table */}

//           {result.preview?.length > 0 && (

//             <div className="table-wrapper">

//               <table>

//                 <thead>

//                   <tr>

//                     {result.columns.map(
//                       (column) => (
//                         <th key={column}>
//                           {column}
//                         </th>
//                       )
//                     )}

//                   </tr>

//                 </thead>

//                 <tbody>

//                   {result.preview.map(
//                     (row, rowIndex) => (

//                       <tr key={rowIndex}>

//                         {result.columns.map(
//                           (column) => (

//                             <td key={column}>

//                               {String(
//                                 row[column] ?? ""
//                               )}

//                             </td>

//                           )
//                         )}

//                       </tr>

//                     )
//                   )}

//                 </tbody>

//               </table>

//             </div>

//           )}

//           {/* ================================= */}
//           {/* Confirm Import */}
//           {/* ================================= */}

//           {result.summary?.valid && (

//             <button
//               className="confirm-button"
//               onClick={handleConfirmImport}
//               disabled={importing}
//             >
//               {importing
//                 ? "Importing..."
//                 : "Confirm Import"}
//             </button>

//           )}

//           {/* ================================= */}
//           {/* Import Success */}
//           {/* ================================= */}

//           {importResult && (

//             <div className="import-success">

//               <h3>
//                 Import Successful
//               </h3>

//               <p>
//                 {importResult.message ||
//                   "Records imported successfully."}
//               </p>

//               {importResult.summary && (

//                 <div className="success-summary">

//                   <span>
//                     Imported:
//                     {" "}
//                     {importResult.summary
//                       .imported ?? 0}
//                   </span>

//                   <span>
//                     Skipped:
//                     {" "}
//                     {importResult.summary
//                       .skipped ?? 0}
//                   </span>

//                 </div>

//               )}

//               <button
//                 className="dashboard-button"
//                 onClick={() =>
//                   navigate(
//                     "/management/dashboard"
//                   )
//                 }
//               >
//                 Go to Management Dashboard
//               </button>

//             </div>

//           )}

//         </div>

//       )}

//     </div>
//   );
// };

// export default ManagementImport;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  previewImport,
  commitImport,
} from "../../services/importService";

import "./ManagementImport.css";

const ManagementImport = () => {
  const navigate = useNavigate();

  // ============================================
  // STATE
  // ============================================

  const [type, setType] = useState("student");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  const [result, setResult] = useState(null);
  const [importResult, setImportResult] = useState(null);

  const [error, setError] = useState("");

  // ============================================
  // FILE SELECTION
  // ============================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    setError("");
    setResult(null);
    setImportResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    // CSV / XLSX only
    if (
      !fileName.endsWith(".csv") &&
      !fileName.endsWith(".xlsx")
    ) {
      setFile(null);

      setError(
        "Only CSV and XLSX files are allowed."
      );

      return;
    }

    // 10 MB limit
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);

      setError(
        "File size must be less than 10 MB."
      );

      return;
    }

    setFile(selectedFile);
  };

  // ============================================
  // CHANGE TYPE
  // ============================================

  const handleTypeChange = (newType) => {
    setType(newType);
    setFile(null);
    setResult(null);
    setImportResult(null);
    setError("");
  };

  // ============================================
  // PREVIEW & VALIDATE
  // ============================================

  const handlePreview = async () => {
    setError("");
    setImportResult(null);

    if (!file) {
      setError(
        "Please select a CSV or XLSX file."
      );
      return;
    }

    try {
      setLoading(true);

      const data = await previewImport({
        type,
        file,
      });

      setResult(data);
    } catch (err) {
      console.error(
        "Preview import error:",
        err
      );

      setResult(null);

      setError(
        err.message ||
          "Unable to process the uploaded file."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CONFIRM IMPORT
  // ============================================

  const handleConfirmImport = async () => {
    // Prevent accidental double click
    if (importing) {
      return;
    }

    setError("");
    setImportResult(null);

    if (!file) {
      setError(
        "Please select a CSV or XLSX file."
      );
      return;
    }

    if (!result) {
      setError(
        "Please preview and validate the file first."
      );
      return;
    }

    if (!result.summary?.valid) {
      setError(
        "Please fix all validation errors before importing."
      );
      return;
    }

    try {
      setImporting(true);

      const data = await commitImport({
        type,
        file,
      });

      console.log(
        "Import successful:",
        data
      );

      setImportResult(data);

    } catch (err) {
      console.error(
        "Confirm import error:",
        err
      );

      setError(
        err.message ||
          "Unable to import the records."
      );

    } finally {
      setImporting(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="management-import-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="import-header">

        <div>

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate(
                "/management/dashboard"
              )
            }
          >
            ← Back to Dashboard
          </button>

          <h1>Import Data</h1>

          <p>
            Upload student or faculty records
            using CSV or Excel files.
          </p>

        </div>

      </div>

      {/* ======================================
          UPLOAD CARD
      ====================================== */}

      <div className="import-card">

        {/* STEP 1 */}

        <div className="import-step">

          <span>1</span>

          <div>

            <h2>
              Select Data Type
            </h2>

            <p>
              Choose the type of records you
              want to import.
            </p>

          </div>

        </div>

        {/* TYPE SELECTION */}

        <div className="type-selection">

          <button
            type="button"
            className={
              type === "student"
                ? "type-card active"
                : "type-card"
            }
            onClick={() =>
              handleTypeChange("student")
            }
            disabled={loading || importing}
          >
            <strong>
              Students
            </strong>

            <span>
              Import student records
            </span>

          </button>

          <button
            type="button"
            className={
              type === "faculty"
                ? "type-card active"
                : "type-card"
            }
            onClick={() =>
              handleTypeChange("faculty")
            }
            disabled={loading || importing}
          >
            <strong>
              Faculty
            </strong>

            <span>
              Import faculty records
            </span>

          </button>

        </div>

        {/* STEP 2 */}

        <div className="import-step">

          <span>2</span>

          <div>

            <h2>
              Upload File
            </h2>

            <p>
              Supported formats: .csv and .xlsx
              <br />
              Maximum size: 10 MB
            </p>

          </div>

        </div>

        {/* FILE UPLOAD */}

        <label
          className={
            importing
              ? "file-upload disabled"
              : "file-upload"
          }
        >

          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            disabled={loading || importing}
          />

          <div className="upload-content">

            <div className="upload-icon">
              ↑
            </div>

            <strong>
              {file
                ? file.name
                : "Choose CSV or Excel file"}
            </strong>

            <span>
              Click to browse your computer
            </span>

          </div>

        </label>

        {/* ERROR */}

        {error && (
          <div className="import-error">
            {error}
          </div>
        )}

        {/* PREVIEW BUTTON */}

        <button
          type="button"
          className="preview-button"
          onClick={handlePreview}
          disabled={
            !file ||
            loading ||
            importing
          }
        >
          {loading
            ? "Processing..."
            : "Preview & Validate"}
        </button>

      </div>

      {/* ======================================
          PREVIEW
      ====================================== */}

      {result && (

        <div className="preview-card">

          {/* HEADER */}

          <div className="preview-header">

            <div>

              <h2>
                Import Preview
              </h2>

              <p>
                {result.file?.name}
              </p>

            </div>

            <div
              className={
                result.summary?.valid
                  ? "status valid"
                  : "status invalid"
              }
            >
              {result.summary?.valid
                ? "Valid"
                : "Needs Correction"}
            </div>

          </div>

          {/* SUMMARY */}

          <div className="summary-grid">

            <div>

              <span>
                Total Records
              </span>

              <strong>
                {result.summary
                  ?.totalRows ?? 0}
              </strong>

            </div>

            <div>

              <span>
                Preview Records
              </span>

              <strong>
                {result.summary
                  ?.previewRows ?? 0}
              </strong>

            </div>

            <div>

              <span>
                Validation Errors
              </span>

              <strong>
                {result.summary
                  ?.errorCount ?? 0}
              </strong>

            </div>

          </div>

          {/* VALIDATION ERRORS */}

          {result.errors?.length > 0 && (

            <div className="validation-errors">

              <h3>
                Validation Errors
              </h3>

              <ul>

                {result.errors.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}

              </ul>

            </div>

          )}

          {/* TABLE */}

          {result.preview?.length > 0 && (

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    {result.columns?.map(
                      (column) => (
                        <th key={column}>
                          {column}
                        </th>
                      )
                    )}

                  </tr>

                </thead>

                <tbody>

                  {result.preview.map(
                    (row, rowIndex) => (

                      <tr key={rowIndex}>

                        {result.columns?.map(
                          (column) => (

                            <td key={column}>
                              {String(
                                row[column] ?? ""
                              )}
                            </td>

                          )
                        )}

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

          {/* ==================================
              CONFIRM IMPORT
          ================================== */}

          {result.summary?.valid &&
            !importResult && (

            <button
              type="button"
              className="confirm-button"
              onClick={handleConfirmImport}
            //   disabled={importing}
            >

              {importing
                ? "Importing..."
                : "Confirm Import"}

            </button>

          )}

          {/* ==================================
              IMPORT SUCCESS
          ================================== */}

          {importResult && (

            <div className="import-success">

              <div className="success-icon">
                ✓
              </div>

              <h3>
                Import Successful
              </h3>

              <p>
                {importResult.message ||
                  "Import completed successfully."}
              </p>

              {importResult.summary && (

                <div className="success-summary">

                  <div>
                    <span>
                      Imported
                    </span>

                    <strong>
                      {importResult.summary
                        .imported ?? 0}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Skipped
                    </span>

                    <strong>
                      {importResult.summary
                        .skipped ?? 0}
                    </strong>
                  </div>

                </div>

              )}

              <button
                type="button"
                className="dashboard-button"
                onClick={() =>
                  navigate(
                    "/management/dashboard"
                  )
                }
              >
                Go to Management Dashboard
              </button>

            </div>

          )}

        </div>

      )}

    </div>
  );
};

export default ManagementImport;