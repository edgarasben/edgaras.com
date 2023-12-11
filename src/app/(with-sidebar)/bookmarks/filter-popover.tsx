'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import CheckIcon from '@/components/icons/check'
import { Separator } from '@/components/separator'
import { cn } from '@/lib/utils'

export function FilterPopover({
  title,
  options,
}: {
  title: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}) {
  const selectedValues = new Set('test1, test2, test4')

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-8 border-dashed">
            {`( + )`}
            {title}
            {selectedValues?.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.size}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }
                        const filterValues = Array.from(selectedValues)
                        /* column?.setFilterValue(
                            filterValues.length ? filterValues : undefined,
                          ) */ /* TODO: SET VALUE HERE */
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'text-primary-foreground bg-primary'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                      )}
                      <span>{option.label}</span>
                      {/*  {facets?.get(option.value) && (
                          <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                            {facets.get(option.value)}
                          </span>
                        )} */}{' '}
                      {/* TODO: GET TOTAL COUNT OF EACH FILTER */}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
              {selectedValues.size > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      /*  onSelect={() => column?.setFilterValue(undefined)} */ /* TODO: REMOVE ALL FILDERS  */
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
