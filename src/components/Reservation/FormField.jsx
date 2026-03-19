import "./FormField.css";

function FormField({ id, label, type = "text", value, onChange, required, autoComplete, placeholder, rows }) {
    const isTextarea = type === "textarea";

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            {isTextarea ? (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    aria-required={required ? "true" : undefined}
                    autoComplete={autoComplete}
                />
            )}
        </div>
    );
}

export default FormField;
