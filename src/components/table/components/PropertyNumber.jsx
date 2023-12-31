
export default function PropertyNumber({
    headerTitle,
    isRowEditing,
    inputType,
    inputName,
    defaultValue
}) {
    return (
        <div className="property">
            <div className="property-header">
                {headerTitle}
            </div>
            <div className="property-body">
                <input
                    min={0}
                    readOnly={!isRowEditing}
                    type={inputType}
                    name={inputName}
                    defaultValue={defaultValue} />
            </div>
        </div>
    )
}
