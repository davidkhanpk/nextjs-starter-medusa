"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import SortProducts, { SortOptions } from "./sort-products"
import { OptionGroup, OptionFilters } from "@lib/util/product-options"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  optionGroups?: OptionGroup[]
  optionFilters?: OptionFilters
  "data-testid"?: string
}

const RefinementList = ({
  sortBy,
  optionGroups,
  "data-testid": dataTestId,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const toggleOptionFilter = useCallback(
    (optionName: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      const current = params.getAll(optionName)
      if (current.includes(value)) {
        params.delete(optionName)
        current.filter((v) => v !== value).forEach((v) => params.append(optionName, v))
      } else {
        params.append(optionName, value)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const toggleGroup = (name: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  // Groups are expanded by default (collapsed[name] is undefined → !undefined = true)
  const isGroupExpanded = (name: string) => !collapsedGroups[name]

  const activeOptionCount =
    optionGroups?.reduce((sum, g) => sum + searchParams.getAll(g.name).length, 0) ?? 0

  const clearOptionFilters = () => {
    const params = new URLSearchParams(searchParams)
    const reservedKeys = ["sortBy", "page", "q"]
    const keysToDelete: string[] = []
    params.forEach((_, key) => {
      if (!reservedKeys.includes(key)) keysToDelete.push(key)
    })
    Array.from(new Set(keysToDelete)).forEach((k) => params.delete(k))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />

      {optionGroups && optionGroups.length > 0 && (
        <div className="flex flex-col gap-y-2 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base-semi">Filters</span>
            {activeOptionCount > 0 && (
              <button
                onClick={clearOptionFilters}
                className="text-xs text-gray-500 hover:text-black underline transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {optionGroups.map((group) => {
            const expanded = isGroupExpanded(group.name)
            const activeCount = searchParams.getAll(group.name).length

            return (
              <div key={group.name} className="border-b border-gray-200 pb-4 last:border-0">
                <button
                  onClick={() => toggleGroup(group.name)}
                  className="flex items-center justify-between w-full py-2"
                >
                  <span className="text-sm font-semibold flex items-center gap-x-2">
                    {group.name}
                    {activeCount > 0 && (
                      <span className="bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                        {activeCount}
                      </span>
                    )}
                  </span>
                  {expanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {expanded && (
                  <ul className="flex flex-col gap-y-2 mt-1">
                    {group.values.map((value) => {
                      const selected = searchParams.getAll(group.name).includes(value)
                      return (
                        <li key={value}>
                          <button
                            onClick={() => toggleOptionFilter(group.name, value)}
                            className="flex items-center gap-x-2 text-sm w-full text-left py-0.5"
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                                selected
                                  ? "bg-black border-black"
                                  : "border-gray-400 hover:border-gray-600"
                              }`}
                            >
                              {selected && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </span>
                            <span
                              className={
                                selected ? "font-medium text-black" : "text-gray-600"
                              }
                            >
                              {value}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RefinementList
