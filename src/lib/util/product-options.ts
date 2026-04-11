import { HttpTypes } from "@medusajs/types"

export type OptionGroup = {
  name: string
  values: string[]
}

export type OptionFilters = Record<string, string[]>

/**
 * Extract unique product option groups (e.g., Color, Size) and their values
 * from a list of products. Options with no values are omitted.
 */
export function extractOptionGroups(
  products: HttpTypes.StoreProduct[]
): OptionGroup[] {
  const optionMap = new Map<string, Set<string>>()

  for (const product of products) {
    for (const option of product.options ?? []) {
      if (!option.title) continue
      if (!optionMap.has(option.title)) {
        optionMap.set(option.title, new Set())
      }
      for (const v of option.values ?? []) {
        if (v.value) optionMap.get(option.title)!.add(v.value)
      }
    }
  }

  return Array.from(optionMap.entries())
    .map(([name, valuesSet]) => ({
      name,
      values: Array.from(valuesSet).sort(),
    }))
    .filter((g) => g.values.length > 0)
}

/**
 * Filter products so that only those matching ALL active option filters survive.
 * Within one option (e.g., Color) values are OR-ed (Red OR Blue).
 * Across different options (e.g., Color AND Size) they are AND-ed.
 */
export function filterProductsByOptions(
  products: HttpTypes.StoreProduct[],
  optionFilters: OptionFilters
): HttpTypes.StoreProduct[] {
  const active = Object.entries(optionFilters).filter(
    ([, vals]) => vals.length > 0
  )
  if (active.length === 0) return products

  return products.filter((product) =>
    active.every(([optionName, selectedValues]) => {
      const opt = (product.options ?? []).find((o) => o.title === optionName)
      if (!opt) return false
      return (opt.values ?? []).some((v) => selectedValues.includes(v.value))
    })
  )
}

/**
 * Parse option filter values from raw URL search params, skipping reserved keys.
 */
export function parseOptionFilters(
  rawParams: Record<string, string | string[] | undefined>,
  reservedKeys: string[] = ["sortBy", "page", "q"]
): OptionFilters {
  const filters: OptionFilters = {}
  for (const [key, value] of Object.entries(rawParams)) {
    if (reservedKeys.includes(key) || !value) continue
    filters[key] = Array.isArray(value) ? value : [value]
  }
  return filters
}
