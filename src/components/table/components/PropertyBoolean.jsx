
import { useState } from "react"
import Switch from "react-switch"
export default function PropertyBoolean({
  headerTitle,
  isRowEditing,
  inputType,
  inputName,
  defaultValue,
  onChange,
  isCheckBox
}) {

  const [state, setState] = useState(defaultValue)
  return (
    <div className="property">
      <div className="property-header">
        {headerTitle}
      </div>

      <div className="property-body icon">
        {
          isCheckBox ? <Switch
            onChange={
              (e) => {
                setState(e)
              }
            }
            checked={state}
          /> : <Switch
            onChange={onChange}
            checked={defaultValue}
          />
        }

      </div>
    </div>
  )
}
