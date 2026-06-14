import { useMemo } from "react"
import CreatableSelect from "react-select/creatable"

type Option = {
  label: string
  value: string
}

type Props = {
  value?: string | null
  onChange: (value?: string) => void
  onCreate?: (value: string) => void
  options?: Option[]
  disabled?: boolean
  placeholder?: string
}

export const Select = ({
  value,
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
}: Props) => {
  const selectedValue = useMemo(() => {
    return options.find((option) => option.value === value) ?? null
  }, [options, value])

  const handleChange = (option: Option | null) => {
    onChange(option?.value)
  }

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="text-sm"
      classNamePrefix="select"
      value={selectedValue}
      onChange={handleChange}
      options={options}
      onCreateOption={onCreate}
      isDisabled={disabled}
      isClearable
      noOptionsMessage={() => "Nenhum item encontrado"}
      formatCreateLabel={(input) => `Criar "${input}"`}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: "2rem",
          height: "2rem",
          borderRadius: "0.5rem",
          borderColor: state.isFocused ? "var(--ring)" : "var(--border)",
          boxShadow: state.isFocused ? "0 0 0 3px var(--ring) / 0.5" : "none",
          backgroundColor: "var(--background)",
          "&:hover": {
            borderColor: "var(--border)",
          },
        }),
        valueContainer: (base) => ({
          ...base,
          padding: "0 0.5rem",
        }),
        input: (base) => ({
          ...base,
          margin: 0,
          padding: 0,
        }),
        singleValue: (base) => ({
          ...base,
          color: "var(--foreground)",
          fontWeight: 400, 
        }),
        placeholder: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
          fontWeight: 400,
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: "2rem",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "var(--popover)",
          border: "1px solid var(--border)",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "var(--primary)"
            : state.isFocused
              ? "var(--accent)"
              : "transparent",
          color: state.isSelected
            ? "var(--primary-foreground)"
            : "var(--foreground)",
          cursor: "pointer",
        }),
        noOptionsMessage: (base) => ({
          ...base,
          color: "var(--muted-foreground)",
        }),
      }}
    />
  )
}
