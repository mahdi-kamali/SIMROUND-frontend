
export default function PropertySelect({
    headerTitle,
    isRowEditing,
    inputName,
    defaultValue,
    options
}) {
    return (
        <div className="property">
            <div className="property-header">
                {headerTitle}
            </div>

            <div className="property-body select-box">
                <select
                    readOnly={!isRowEditing}
                    defaultValue={defaultValue}
                    name={inputName} >
                    {options?.map((item) => {
                        return <option
                            key={item.value}
                            value={item.value}>
                            {item.label}
                        </option>
                    })}
                </select>

            </div>
        </div>
    )
}
