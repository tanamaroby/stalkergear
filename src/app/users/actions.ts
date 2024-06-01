import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import { map, replace, split } from 'lodash'

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

export const fetchFastestUsers = async () => {
    const supabase = createClient()
    const { data: rawData, error } = await supabase.from('Cursus User').select()
    const data = map(rawData, (user) => {
        const user_begin = user.begin_at
        const user_level = user.level
        const days = dayjs().diff(dayjs(user_begin), 'days')
        return {
            ...user,
            speed_index: ((user_level ?? 0) / days) * 100,
        }
    })
        .sort((a, b) => b.speed_index - a.speed_index)
        .slice(0, 10)
    return { data, error }
}
