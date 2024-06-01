import { createClient } from '@/utils/supabase/server'

export interface FetchAllUsersProps {
    pageNumber: number
}

export const fetchAllUsers = async (props: FetchAllUsersProps) => {
    const { pageNumber } = props
    const supabase = createClient()

    const { data, error } = await supabase
        .from('Cursus User')
        .select()
        .range((pageNumber - 1) * 30, pageNumber * 30)
    return { data, error }
}
