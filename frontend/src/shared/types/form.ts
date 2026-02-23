export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'date' | 'select'

export interface FieldOption {
  label: string
  value: string | number | boolean | null
}

export interface FormField {
  key: string
  label: string
  type?: FieldType
  required?: boolean
  options?: FieldOption[]
}
