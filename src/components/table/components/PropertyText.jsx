
export default function PropertyText({
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
                    readOnly={!isRowEditing}
                    type={inputType}
                    name={inputName}
                    defaultValue={defaultValue} />
            </div>
        </div>
    )
}
