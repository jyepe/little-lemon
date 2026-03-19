import "./FormField.css";

function FormField({ id, label, type = "text", value, onChange, required, autoComplete, placeholder, rows, options, hint }) {
    const renderControl = () => {
        if (type === "textarea") {
            return (
                <textarea
                    id={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />
            );
        }

        if (type === "select") {
            return (
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    aria-required={required ? "true" : undefined}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                aria-required={required ? "true" : undefined}
                autoComplete={autoComplete}
            />
        );
    };

    return (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            {renderControl()}
            {hint && <p className="form-field__hint">{hint}</p>}
        </div>
    );
}

export default FormField;
