import { Fragment } from "react"
import {
  CustomNumericInput,
  GlowingWrapper,
  InputDropdown,
} from "@/shared/components/ui"

export const Form: React.FC<{
  editableData: IMap
  updateEditableData: (data: { key: keyof IMap; value: any }) => void
}> = ({ editableData, updateEditableData }) => {
  const types = ["Exploration", "Scenario"]
  const visibilities = ["low", "default"]
  const status = [true, false]

  return (
    <ul className="p-2 grid grid-cols-2 gap-2">
      <li className="col-span-2 text-base relative z-[60] flex flex-col">
        <span className="text-gray-400 text-sm w-full block cursor-pointer">
          Name
        </span>
        <GlowingWrapper inset="0">
          <input
            onChange={(e) =>
              updateEditableData({ key: "name", value: e.target.value })
            }
            placeholder={`Add a name for the ${editableData.type}`}
            value={editableData.name}
            className="py-1 px-2 w-full cursor-text hover:brightness-125 flex items-center gap-x-1 line-clamp-1 rounded bg-border/50 border border-border outline-none"
          />
        </GlowingWrapper>
      </li>
      <InputDropdown
        label="Type"
        options={types}
        selected={editableData.type}
        onChange={(value) => updateEditableData({ key: "type", value })}
      />
      <InputDropdown
        label="Status"
        options={status.map((s) =>
          s ? "Currently Active Map" : "Inactive Map"
        )}
        selected={editableData.active ? "Currently Active Map" : "Inactive Map"}
        onChange={(value) =>
          updateEditableData({
            key: "active",
            value: value === "currently active map",
          })
        }
        zIndex={500}
      />
      {editableData.type === "exploration" && (
        <Fragment>
          <li className="col-span-1 text-base relative z-[10] flex flex-col">
            <span className="text-gray-400 text-sm w-full block cursor-pointer">
              Grid Size
            </span>
            <div className="flex items-center gap-x-2 w-fit">
              <GlowingWrapper>
                <CustomNumericInput
                  value={editableData.gridSize?.[0] || 0}
                  onChange={(value) =>
                    updateEditableData({
                      key: "gridSize",
                      value: [value, editableData.gridSize?.[1] || 0],
                    })
                  }
                />
              </GlowingWrapper>
              <div className="font-medium text-2xl">X</div>
              <GlowingWrapper>
                <CustomNumericInput
                  value={editableData.gridSize?.[1] || 0}
                  onChange={(value) =>
                    updateEditableData({
                      key: "gridSize",
                      value: [editableData.gridSize?.[0] || 0, value],
                    })
                  }
                />
              </GlowingWrapper>
            </div>
          </li>
          <InputDropdown
            label="Visibility"
            options={visibilities}
            selected={editableData.visibility}
            onChange={(value) =>
              updateEditableData({ key: "visibility", value })
            }
            zIndex={400}
          />
        </Fragment>
      )}
    </ul>
  )
}
