import { createClient } from '@/utils/supabase/server'
import { replace, split } from 'lodash'

export interface FetchAllUsersProps {
    pageNumber: number
    sort?: string
}

export const fetchAllUsers = async (props: FetchAllUsersProps) => {
    const { pageNumber, sort } = props
    const supabase = createClient()

    const [inputSort, inputOrder] = sort ? split(sort, '-') : [null, null]
    const sortType = inputSort ? replace(inputSort, ' ', '->') : 'level'
    const order = inputOrder ?? 'desc'

    const query = supabase
        .from('Cursus User')
        .select()
        .order(sortType, { ascending: order === 'asc' ? true : false })
        .range((pageNumber - 1) * 30, pageNumber * 30)
    const finalQuery =
        sortType === 'blackholed_at'
            ? query.not('blackholed_at', 'is', null)
            : query

    const { data, error } = await finalQuery
    return { data, error }
}
