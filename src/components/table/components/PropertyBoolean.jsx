
import Switch from "react-switch"
export default function PropertyBoolean({
  headerTitle,
  isRowEditing,
  inputType,
  inputName,
  defaultValue,
  onChange
}) {
  return (
    <div className="property">
      <div className="property-header">
        {headerTitle}
      </div>
      
      <div className="property-body icon">
        <Switch
          onChange={onChange}
          checked={defaultValue}
        />
      </div>
    </div>
  )
}
