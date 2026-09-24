import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileSpreadsheet,
  FileUp,
  GraduationCap,
  UploadCloud,
  X,
  AlertCircle,
} from "lucide-react";

import { previewImport, commitImport } from "../../services/importService";
import "./ManagementImport.css";

const IMPORT_TYPES = {
  student: {
    title: "Import Student Records",
    shortTitle: "Students",
    description: "Upload student enrollment, academic, and account records in one organized workspace.",
    cardDescription: "Import student records",
    entityName: "student",
    entityPlural: "students",
    requiredFields: ["name", "email", "student_id"],
    Icon: GraduationCap,
  },
  faculty: {
    title: "Import Faculty Records",
    shortTitle: "Faculty",
    description: "Upload faculty profiles, department assignments, and account records in one organized workspace.",
    cardDescription: "Import faculty records",
    entityName: "faculty",
    entityPlural: "faculty members",
    requiredFields: ["name", "email", "employee_id"],
    Icon: BriefcaseBusiness,
  },
};

const ManagementImport = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef(null);

  const queryType = searchParams.get("type");

  // Track the current step (1 = Select Type, 2 = Upload, 3 = Preview)
  const [step, setStep] = useState(1);
  const [type, setType] = useState(queryType === "faculty" ? "faculty" : "student");

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  const [result, setResult] = useState(null);
  const [importResult, setImportResult] = useState(null);

  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const config = IMPORT_TYPES[type];
  const TypeIcon = config.Icon;

  useEffect(() => {
    const currentType = searchParams.get("type");
    if (currentType === "student" || currentType === "faculty") {
      setType(currentType);
    }
  }, [searchParams]);

  const clearResults = () => {
    setError("");
    setResult(null);
    setImportResult(null);
  };

  const isValidFile = (selectedFile) => {
    if (!selectedFile) return false;
    const fileName = selectedFile.name.toLowerCase();
    const mimeType = selectedFile.type;
    const validExtension = fileName.endsWith(".csv") || fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
    const validMime =
      mimeType === "text/csv" ||
      mimeType === "application/csv" ||
      mimeType === "text/plain" ||
      mimeType === "application/vnd.ms-excel" ||
      mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimeType === "" ||
      mimeType === "application/octet-stream";
    return validExtension || validMime;
  };

  const selectFile = (selectedFile) => {
    clearResults();
    if (!selectedFile) {
      setFile(null);
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setError("File size must be less than 10 MB.");
      return;
    }
    if (!isValidFile(selectedFile)) {
      setFile(null);
      setError("Only CSV (.csv) and Excel (.xlsx, .xls) files are allowed.");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileChange = (event) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!loading && !importing) setDragOver(true);
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
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleTypeChange = (newType) => {
    if (loading || importing) return;
    setType(newType);
    setSearchParams({ type: newType });
    setFile(null);
    clearResults();
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    // Automatically advance to the upload step
    setStep(2); 
  };

  const handleRemoveFile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFile(null);
    clearResults();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePreview = async () => {
    clearResults();
    if (!file) {
      setError(`Please select a file containing ${config.entityPlural}.`);
      return;
    }
    try {
      setLoading(true);
      const data = await previewImport({ type, file });
      setResult(data);
      // Automatically advance to the preview step
      setStep(3); 
    } catch (err) {
      console.error("Preview import error:", err);
      setError(err.message || "Unable to process the uploaded file.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    if (importing) return;
    setError("");
    setImportResult(null);

    if (!file) {
      setError(`Please select a file containing ${config.entityPlural}.`);
      return;
    }
    if (!result?.summary?.valid) {
      setError("Please fix all validation errors before importing.");
      return;
    }

    try {
      setImporting(true);
      const data = await commitImport({ type, file });
      setImportResult(data);

      try {
        const existing = JSON.parse(localStorage.getItem("importedData") || '{"students":[],"faculty":[]}');
        if (type === "student" && data.records) {
          existing.students = [...existing.students, ...data.records];
        }
        if (type === "faculty" && data.records) {
          existing.faculty = [...existing.faculty, ...data.records];
        }
        localStorage.setItem("importedData", JSON.stringify(existing));
      } catch (storageError) {
        console.warn("LocalStorage save failed:", storageError);
      }
    } catch (err) {
      console.error("Confirm import error:", err);
      setError(err.message || "Unable to import the records.");
    } finally {
      setImporting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return FileUp;
    const fileNameLower = fileName.toLowerCase();
    if (fileNameLower.endsWith(".xlsx") || fileNameLower.endsWith(".xls")) {
      return FileSpreadsheet;
    }
    return FileUp;
  };

  const FileIcon = file ? getFileIcon(file.name) : FileUp;

  const backPath = type === "student" ? "/management/students" : "/management/faculty";

  // NEW: Function to download generated credentials as CSV
  const downloadCredentials = () => {
    if (!importResult?.generatedPasswords?.length) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Email,Password\n" +
      importResult.generatedPasswords
        .map((e) => `${e.email},${e.password}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}_credentials.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className={`management-import-page ${type === "student" ? "import-student-mode" : "import-faculty-mode"}`}>
      <div className="import-shell">
        {/* HEADER */}
        <header className="import-page-header">
          <button type="button" className="import-back-button" onClick={() => navigate(backPath)}>
            <ArrowLeft size={17} />
            Back to {type === "student" ? "Student Directory" : "Faculty Directory"}
          </button>

          <div className="import-kicker">
            DATA MANAGEMENT / {config.shortTitle.toUpperCase()}
          </div>

          <div className="import-header-row">
            <div>
              <h1>{config.title}</h1>
              <p>{config.description}</p>
              <div className="import-header-meta">
                <TypeIcon size={16} />
                <span>{config.shortTitle} workspace</span>
                <span className="meta-divider">•</span>
                <span>CSV and Excel files</span>
                <span className="meta-divider">•</span>
                <span>Maximum 10 MB</span>
              </div>
            </div>
          </div>
        </header>

        <section className="import-card">
          {/* ================= STEP 1: SELECT RECORD TYPE ================= */}
          {step === 1 && (
            <>
              <div className="import-step">
                <span className="step-number">1</span>
                <div className="step-copy">
                  <h2>Select record type</h2>
                  <p>Choose the type of records you want to add to your institution.</p>
                </div>
              </div>

              <div className="import-type-selection">
                <button
                  type="button"
                  className={`import-type-card ${type === "student" ? "active" : ""}`}
                  onClick={() => handleTypeChange("student")}
                  disabled={loading || importing}
                >
                  <span className="import-type-icon"><GraduationCap size={25} /></span>
                  <strong>Students</strong>
                  <span>Enrollment and academic records</span>
                </button>

                <button
                  type="button"
                  className={`import-type-card ${type === "faculty" ? "active" : ""}`}
                  onClick={() => handleTypeChange("faculty")}
                  disabled={loading || importing}
                >
                  <span className="import-type-icon"><BriefcaseBusiness size={25} /></span>
                  <strong>Faculty</strong>
                  <span>Professional and account records</span>
                </button>
              </div>
            </>
          )}

          {/* ================= STEP 2: UPLOAD FILE ================= */}
          {step === 2 && (
            <>
              <div className="import-step">
                <span className="step-number">2</span>
                <div className="step-copy">
                  <h2>Upload {config.entityName} file</h2>
                  <p>Use a CSV or Excel file with the required columns for {config.entityPlural}.</p>
                </div>
              </div>

              <div
                className={`file-upload-zone ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""} ${loading || importing ? "disabled" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => { if (!loading && !importing) fileInputRef.current?.click(); }}
                onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") fileInputRef.current?.click(); }}
                role="button"
                tabIndex={loading || importing ? -1 : 0}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  disabled={loading || importing}
                  hidden
                />

                {file ? (
                  <div className="file-selected">
                    <div className="file-icon-large"><FileIcon size={38} /></div>
                    <div className="file-info">
                      <strong className="file-name">{file.name}</strong>
                      <span className="file-size">{formatFileSize(file.size)} • Ready for preview</span>
                    </div>
                    <button type="button" className="remove-file-button" onClick={handleRemoveFile} title="Remove file">
                      <X size={17} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="upload-icon-wrap"><UploadCloud size={28} /></div>
                    <strong>Drag and drop your {config.entityName} file here</strong>
                    <span>or click to browse your computer</span>
                    <div className="upload-formats">
                      <span>CSV</span><span>XLSX</span><span>XLS</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="required-columns">
                <div className="required-columns-heading">
                  <span className="required-columns-icon"><AlertCircle size={15} /></span>
                  <strong>Required columns</strong>
                </div>
                <div className="required-column-list">
                  {config.requiredFields.map((field) => <code key={field}>{field}</code>)}
                </div>
              </div>

              {error && (
                <div className="import-error" role="alert">
                  <AlertCircle size={17} />
                  <span>{error}</span>
                </div>
              )}

              {/* Navigation Buttons for Step 2 */}
              <div className="import-actions-row" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="button" className="back-button" onClick={() => setStep(1)} disabled={loading || importing}>
                  Back to Selection
                </button>
                <button type="button" className="preview-button" onClick={handlePreview} disabled={!file || loading || importing}>
                  {loading ? (
                    <><span className="button-spinner" />Processing File...</>
                  ) : (
                    <><FileSpreadsheet size={18} />Preview and Validate</>
                  )}
                </button>
              </div>
            </>
          )}
        </section>

        {/* ================= STEP 3: PREVIEW & IMPORT ================= */}
        {step === 3 && result && (
          <section className="preview-card">
            <div className="preview-header">
              <div>
                <div className="import-kicker">STEP 3 / REVIEW</div>
                <h2>Review {config.entityPlural}</h2>
                <p>{result.file?.name || file?.name}</p>
              </div>
              <div className={`preview-status ${result.summary?.valid ? "valid" : "invalid"}`}>
                {result.summary?.valid ? (
                  <><CheckCircle2 size={16} />Ready to Import</>
                ) : (
                  <><AlertCircle size={16} />Needs Correction</>
                )}
              </div>
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <span>Total Records</span>
                <strong>{result.summary?.totalRows ?? 0}</strong>
              </div>
              <div className="summary-item">
                <span>Preview Rows</span>
                <strong>{result.summary?.previewRows ?? 0}</strong>
              </div>
              <div className={`summary-item ${(result.summary?.errorCount ?? 0) > 0 ? "has-errors" : "no-errors"}`}>
                <span>Validation Errors</span>
                <strong>{result.summary?.errorCount ?? 0}</strong>
              </div>
            </div>

            {result.errors?.length > 0 && (
              <div className="validation-box validation-errors">
                <h3><AlertCircle size={17} />Validation errors</h3>
                <ul>{result.errors.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </div>
            )}

            {result.warnings?.length > 0 && (
              <div className="validation-box validation-warnings">
                <h3><AlertCircle size={17} />Review warnings</h3>
                <ul>{result.warnings.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </div>
            )}

            {result.preview?.length > 0 && (
              <div className="preview-table-wrapper">
                <table className="preview-table">
                  <thead>
                    <tr>{result.columns?.map((column) => <th key={column}>{column}</th>)}</tr>
                  </thead>
                  <tbody>
                    {result.preview.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {result.columns?.map((column) => <td key={column}>{String(row[column] ?? "")}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Navigation Buttons for Step 3 (Hidden if import is complete) */}
            {!importResult && (
              <div className="import-actions-row" style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button 
                  type="button" 
                  className="back-button" 
                  onClick={() => { setResult(null); setStep(2); }} 
                  disabled={importing}
                >
                  Back to Upload
                </button>
                
                {result.summary?.valid && (
                  <button type="button" className="confirm-button" onClick={handleConfirmImport} disabled={importing}>
                    {importing ? (
                      <><span className="button-spinner" />Importing Records...</>
                    ) : (
                      <><CheckCircle2 size={18} />Confirm Import — {result.summary?.totalRows ?? 0} Records</>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* ================= SUCCESS STATE WITH GENERATED PASSWORDS ================= */}
            {importResult && (
              <div className="import-success">
                <div className="success-icon"><CheckCircle2 size={28} /></div>
                <div className="import-kicker">IMPORT COMPLETE</div>
                <h3>{config.shortTitle} imported successfully</h3>
                <p>{importResult.message || `Your ${config.entityPlural} were imported successfully.`}</p>

                {importResult.summary && (
                  <div className="success-summary">
                    <div className="success-stat">
                      <span>Imported</span>
                      <strong>{importResult.summary.imported ?? 0}</strong>
                    </div>
                    <div className="success-stat">
                      <span>Skipped</span>
                      <strong>{importResult.summary.skipped ?? 0}</strong>
                    </div>
                  </div>
                )}

                {/* NEW: Display Generated Passwords */}
                {importResult.generatedPasswords?.length > 0 && (
                  <div className="credentials-box" style={{ marginTop: '2rem', width: '100%', textAlign: 'left', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E8E0D1' }}>
                    <h4 style={{ color: 'var(--burgundy-main)', marginBottom: '1rem' }}>🔑 Generated Login Credentials</h4>
                    <p style={{ fontSize: '0.9rem', color: '#6B5B5E', marginBottom: '1rem' }}>
                      Please download these credentials and distribute them to the users. They will be required to change their password on first login.
                    </p>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '8px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                          <tr style={{ background: '#FDFBF7' }}>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Email</th>
                            <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #eee' }}>Temporary Password</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importResult.generatedPasswords.map((cred, idx) => (
                            <tr key={idx}>
                              <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{cred.email}</td>
                              <td style={{ padding: '8px', borderBottom: '1px solid #eee', fontFamily: 'monospace' }}>{cred.password}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button 
                      onClick={downloadCredentials}
                      style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'var(--burgundy-main)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Download Credentials CSV
                    </button>
                  </div>
                )}

                <div className="success-actions" style={{ marginTop: '2rem' }}>
                  <button type="button" className="dashboard-button" onClick={() => navigate(backPath)}>
                    View {config.shortTitle}
                  </button>
                  <button
                    type="button"
                    className="import-more-button"
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                      setImportResult(null);
                      setError("");
                      setStep(1); // Reset to Step 1
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Import More
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default ManagementImport;