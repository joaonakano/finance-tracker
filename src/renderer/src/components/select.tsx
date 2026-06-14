import { useMemo } from "react"
import CreatableSelect from "react-select/creatable"

import { cn } from "@/lib/utils"

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
  className?: string
}

export const Select = ({
  value,
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
  className,
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
      className={cn("text-sm h-10", className)}
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
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0"
        })
      }}
    />
  )
}
