import { formatDate } from "../../../libs/timeFormater"

export default function PropertyDate({
    headerTitle,
    isRowEditing,
    inputType,
    inputName,
    defaultValue
}) {


    const onChange = (e) => {
        console.log(e.target.value)
    }

    return (
        <div className="property">
            <div className="property-header">
                {headerTitle}
            </div>
            <div className="property-body">
                {
                    isRowEditing ? <input
                        readOnly={!isRowEditing}
                        type={inputType}
                        name={inputName}
                        onChange={onChange}
                        defaultValue={defaultValue} /> : <span>
                        {defaultValue ? formatDate(defaultValue) : "مشخص نشده است"}
                    </span>
                }

            </div>
        </div>
    )
}
