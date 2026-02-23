export type FilterType = 'text' | 'dateRange' | 'multiSelect' | 'deliveryTime'

export interface TableFilterOption {
  label: string
  value: string | number | boolean
}

export type FilterMode = 'row' | 'dialog' | 'both'

export interface TableColumn {
  field: string
  header: string
  sortable?: boolean
  width?: string
  bodyClass?: string
  filter?: {
    type: FilterType
    placeholder?: string
    options?: TableFilterOption[]
    label?: string
    mode?: FilterMode
  }
  body?: (row: any, index?: number) => string | number
  bodyComponent?: any
}

export type TableFilters = Record<string, { value: any; matchMode?: string }>
