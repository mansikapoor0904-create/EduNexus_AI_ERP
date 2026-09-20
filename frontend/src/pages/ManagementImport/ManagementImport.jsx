

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  previewImport,
  commitImport,
} from "../../services/importService";
import "./ManagementImport.css";

const ManagementImport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

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
  const [dragOver, setDragOver] = useState(false);

  // ============================================
  // VALIDATE FILE (by name OR mime type)
  // ============================================

  const isValidFile = (selectedFile) => {
    if (!selectedFile) return false;

    const fileName = selectedFile.name.toLowerCase();
    const mimeType = selectedFile.type;

    // Check by extension
    const validExtension =
      fileName.endsWith(".csv") ||
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls");

    // Check by MIME type (handles files with no extension)
    const validMime =
      mimeType === "text/csv" ||
      mimeType === "application/csv" ||
      mimeType === "text/plain" ||
      mimeType === "application/vnd.ms-excel" ||
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimeType === "" || // Some OS don't set mime for csv
      mimeType === "application/octet-stream"; // Generic binary

    return validExtension || validMime;
  };

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

    // Size check - 10 MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setError("File size must be less than 10 MB.");
      return;
    }

    // Validate file type
    if (!isValidFile(selectedFile)) {
      setFile(null);
      setError(
        "Only CSV (.csv) and Excel (.xlsx, .xls) files are allowed."
      );
      return;
    }

    setFile(selectedFile);
  };

  // ============================================
  // DRAG AND DROP
  // ============================================

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOver(false);

    if (loading || importing) return;

    const droppedFile = event.dataTransfer.files?.[0];

    setError("");
    setResult(null);
    setImportResult(null);

    if (!droppedFile) return;

    if (droppedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      return;
    }

    if (!isValidFile(droppedFile)) {
      setError(
        "Only CSV (.csv) and Excel (.xlsx, .xls) files are allowed."
      );
      return;
    }

    setFile(droppedFile);
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

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ============================================
  // REMOVE SELECTED FILE
  // ============================================

  const handleRemoveFile = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setFile(null);
    setResult(null);
    setImportResult(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ============================================
  // PREVIEW & VALIDATE
  // ============================================

  const handlePreview = async () => {
    setError("");
    setImportResult(null);

    if (!file) {
      setError("Please select a CSV or XLSX file.");
      return;
    }

    try {
      setLoading(true);

      const data = await previewImport({ type, file });

      setResult(data);
    } catch (err) {
      console.error("Preview import error:", err);
      setResult(null);
      setError(
        err.message || "Unable to process the uploaded file."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CONFIRM IMPORT
  // ============================================

  const handleConfirmImport = async () => {
    if (importing) return;

    setError("");
    setImportResult(null);

    if (!file) {
      setError("Please select a CSV or XLSX file.");
      return;
    }

    if (!result?.summary?.valid) {
      setError(
        "Please fix all validation errors before importing."
      );
      return;
    }

    try {
      setImporting(true);

      const data = await commitImport({ type, file });

      console.log("Import successful:", data);

      setImportResult(data);

      // Save to localStorage for dashboard
      try {
        const existing = JSON.parse(
          localStorage.getItem("importedData") || '{"students":[],"faculty":[]}'
        );

        if (type === "student" && data.records) {
          existing.students = [
            ...existing.students,
            ...data.records,
          ];
        } else if (type === "faculty" && data.records) {
          existing.faculty = [
            ...existing.faculty,
            ...data.records,
          ];
        }

        localStorage.setItem(
          "importedData",
          JSON.stringify(existing)
        );
      } catch (storageErr) {
        console.warn("LocalStorage save failed:", storageErr);
      }

    } catch (err) {
      console.error("Confirm import error:", err);
      setError(
        err.message || "Unable to import the records."
      );
    } finally {
      setImporting(false);
    }
  };

  // ============================================
  // GET FILE ICON
  // ============================================

  const getFileIcon = (fileName) => {
    if (!fileName) return "📄";
    const name = fileName.toLowerCase();
    if (name.endsWith(".csv")) return "📊";
    if (name.endsWith(".xlsx") || name.endsWith(".xls"))
      return "📗";
    return "📄";
  };

  // ============================================
  // FORMAT FILE SIZE
  // ============================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
            onClick={() => navigate("/management/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <h1>Import Data</h1>

          <p>
            Upload student or faculty records using CSV or
            Excel files.
          </p>
        </div>
      </div>

      {/* ======================================
          UPLOAD CARD
      ====================================== */}

      <div className="import-card">

        {/* ── STEP 1 ── */}
        <div className="import-step">
          <span className="step-number">1</span>
          <div>
            <h2>Select Data Type</h2>
            <p>
              Choose the type of records you want to import.
            </p>
          </div>
        </div>

        {/* TYPE SELECTION */}
        <div className="type-selection">

          <button
            type="button"
            className={
              type === "student" ? "type-card active" : "type-card"
            }
            onClick={() => handleTypeChange("student")}
            disabled={loading || importing}
          >
            <div className="type-icon">🎓</div>
            <strong>Students</strong>
            <span>Import student records</span>
          </button>

          <button
            type="button"
            className={
              type === "faculty" ? "type-card active" : "type-card"
            }
            onClick={() => handleTypeChange("faculty")}
            disabled={loading || importing}
          >
            <div className="type-icon">👨‍🏫</div>
            <strong>Faculty</strong>
            <span>Import faculty records</span>
          </button>

        </div>

        {/* ── STEP 2 ── */}
        <div className="import-step">
          <span className="step-number">2</span>
          <div>
            <h2>Upload File</h2>
            <p>
              Supported formats: <strong>.csv</strong>,{" "}
              <strong>.xlsx</strong>, <strong>.xls</strong>
              <br />
              Maximum size: 10 MB
            </p>
          </div>
        </div>

        {/* FILE UPLOAD ZONE */}
        <div
          className={`file-upload-zone ${dragOver ? "drag-over" : ""} ${
            file ? "has-file" : ""
          } ${loading || importing ? "disabled" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!loading && !importing) {
              fileInputRef.current?.click();
            }
          }}
        >
          {/* Hidden input — accepts ALL files so OS doesn't filter */}
          <input
            ref={fileInputRef}
            type="file"
            accept="*/*"
            onChange={handleFileChange}
            disabled={loading || importing}
            style={{ display: "none" }}
          />

          {file ? (
            /* File selected state */
            <div className="file-selected">
              <div className="file-icon-large">
                {getFileIcon(file.name)}
              </div>

              <div className="file-info">
                <strong className="file-name">{file.name}</strong>
                <span className="file-size">
                  {formatFileSize(file.size)}
                </span>
              </div>

              <button
                type="button"
                className="remove-file-btn"
                onClick={handleRemoveFile}
                title="Remove file"
              >
                ✕
              </button>
            </div>
          ) : (
            /* Empty state */
            <div className="upload-content">
              <div className="upload-icon-wrap">
                <span className="upload-arrow">↑</span>
              </div>

              <strong>
                Drag & drop your file here
              </strong>

              <span>
                or click to browse your computer
              </span>

              <div className="upload-formats">
                <span className="format-badge">CSV</span>
                <span className="format-badge">XLSX</span>
                <span className="format-badge">XLS</span>
              </div>
            </div>
          )}
        </div>

        {/* Template download hint */}
        <p className="template-hint">
          💡 Make sure your file has the correct column headers.
          Columns like <code>name</code>, <code>email</code>,{" "}
          <code>student_id</code> / <code>employee_id</code> are
          required.
        </p>

        {/* ERROR */}
        {error && (
          <div className="import-error">
            <span>⚠</span> {error}
          </div>
        )}

        {/* PREVIEW BUTTON */}
        <button
          type="button"
          className="preview-button"
          onClick={handlePreview}
          disabled={!file || loading || importing}
        >
          {loading ? (
            <>
              <span className="btn-spinner" /> Processing...
            </>
          ) : (
            "Preview & Validate"
          )}
        </button>

      </div>

      {/* ======================================
          PREVIEW CARD
      ====================================== */}

      {result && (
        <div className="preview-card">

          {/* HEADER */}
          <div className="preview-header">
            <div>
              <h2>Import Preview</h2>
              <p>{result.file?.name || file?.name}</p>
            </div>

            <div
              className={
                result.summary?.valid
                  ? "status-badge valid"
                  : "status-badge invalid"
              }
            >
              {result.summary?.valid ? "✓ Valid" : "✗ Needs Correction"}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="summary-grid">

            <div className="summary-item">
              <span>Total Records</span>
              <strong>{result.summary?.totalRows ?? 0}</strong>
            </div>

            <div className="summary-item">
              <span>Preview Rows</span>
              <strong>{result.summary?.previewRows ?? 0}</strong>
            </div>

            <div
              className={`summary-item ${
                (result.summary?.errorCount ?? 0) > 0
                  ? "summary-error"
                  : "summary-ok"
              }`}
            >
              <span>Validation Errors</span>
              <strong>{result.summary?.errorCount ?? 0}</strong>
            </div>

          </div>

                    {/* VALIDATION ERRORS */}
          {result.errors?.length > 0 && (
            <div className="validation-errors">
              <h3>⚠ Validation Errors — Fix Before Importing</h3>
              <ul>
                {result.errors.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* WARNINGS */}
          {result.warnings?.length > 0 && (
            <div className="validation-warnings">
              <h3>⚠ Warnings — Import Will Still Work</h3>
              <ul>
                {result.warnings.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PREVIEW TABLE */}
          {result.preview?.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {result.columns?.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.preview.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {result.columns?.map((column) => (
                        <td key={column}>
                          {String(row[column] ?? "")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CONFIRM IMPORT */}
          {result.summary?.valid && !importResult && (
            <button
              type="button"
              className="confirm-button"
              onClick={handleConfirmImport}
              disabled={importing}
            >
              {importing ? (
                <>
                  <span className="btn-spinner" /> Importing...
                </>
              ) : (
                `Confirm Import — ${result.summary?.totalRows ?? 0} Records`
              )}
            </button>
          )}

          {/* IMPORT SUCCESS */}
          {importResult && (
            <div className="import-success">

              <div className="success-icon">✓</div>

              <h3>Import Successful!</h3>

              <p>
                {importResult.message ||
                  "Records imported successfully."}
              </p>

              {importResult.summary && (
                <div className="success-summary">

                  <div className="success-stat">
                    <span>Imported</span>
                    <strong>
                      {importResult.summary.imported ?? 0}
                    </strong>
                  </div>

                  <div className="success-stat">
                    <span>Skipped</span>
                    <strong>
                      {importResult.summary.skipped ?? 0}
                    </strong>
                  </div>

                </div>
              )}

              <div className="success-actions">

                <button
                  type="button"
                  className="dashboard-button"
                  onClick={() =>
                    navigate("/management/dashboard")
                  }
                >
                  Go to Dashboard
                </button>

                <button
                  type="button"
                  className="import-more-button"
                  onClick={() => {
                    setFile(null);
                    setResult(null);
                    setImportResult(null);
                    setError("");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                >
                  Import More
                </button>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default ManagementImport;