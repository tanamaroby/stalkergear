'use client'
import { createClient } from '@/utils/supabase/client'
import { debounce, map } from 'lodash'
import { ChevronsUpDown } from 'lucide-react'
import { FC, useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export interface LoginSearchProps {
    onChange: (e: string) => void
}

const LoginSearch: FC<LoginSearchProps> = (props) => {
    const { onChange } = props
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(false)
    const [suggestions, setSuggestions] = useState<string[]>([])
    const supabase = createClient()

    const fetchSuggestions = useCallback(
        debounce(async () => {
            if (query.length > 2) {
                const { data } = await supabase
                    .from('Cursus User')
                    .select('user->>login' as string)
                    .like('user ->> login', `%${query}%`)
                    .range(0, 10)
                setSuggestions(data ? map(data, 'login') : [])
            } else {
                setSuggestions([])
            }
        }, 1000),
        [query],
    )

    useEffect(() => {
        fetchSuggestions()
    }, [query])

    const handleChange = (value: string) => {
        setQuery(value)
        setOpen(false)
        onChange(value)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='w-full justify-between flex'
                >
                    {query ? query : 'Search users...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[--radix-popover-trigger-width] p-0 bg-black mx-4'>
                <Command>
                    <CommandInput
                        placeholder='Search users...'
                        onValueChange={(search) => setQuery(search)}
                    />
                    <CommandList>
                        <CommandEmpty>No users found.</CommandEmpty>
                        <CommandGroup>
                            {map(suggestions, (suggestion) => {
                                return (
                                    <CommandItem
                                        key={suggestion}
                                        value={suggestion}
                                        onSelect={(value) => {
                                            handleChange(value)
                                        }}
                                    >
                                        {suggestion}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default LoginSearch
