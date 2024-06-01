export interface UsersFormData {
    sort: string
}

export const SELECT_OPTIONS: {
    title: string
    value: string
}[] = [
    { title: 'Level DESC', value: 'level-desc' },
    { title: 'Level ASC', value: 'level-asc' },
    { title: 'Blackhole DESC', value: 'blackholed_at-desc' },
    { title: 'Blackhole ASC', value: 'blackholed_at-asc' },
    { title: 'Eval Points DESC', value: 'user+correction_point-desc' },
    { title: 'Eval Points ASC', value: 'user+correction_point-asc' },
]
