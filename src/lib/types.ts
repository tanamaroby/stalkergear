export interface User {
    id: number
    email: string | null
    login: string | null
    first_name: string | null
    last_name: string | null
    usual_full_name: string | null
    usual_first_name: string | null
    url: string | null
    phone: string | null
    displayname: string | null
    kind: string | null
    image: {
        link: string
        versions: Versions
    } | null
    'staff?': boolean | null
    correction_point: number | null
    pool_month: string | null
    pool_year: string | null
    location: string | null
    wallet: number | null
    anonymize_date: string | null
    data_erasure_date: string | null
    created_at: string | null
    updated_at: string | null
    alumnized_at: string | null
    'alumni?': boolean | null
    'active?': boolean | null
}

export interface Versions {
    large: string
    medium: string
    small: string
    micro: string
}

export interface Cursus {
    id: number
    created_at: string
    name: string
    slug: string
    kind: string
}

export interface Project {
    id: number
    name: string
    slug: string
    parent_id: number | null
}

export interface CursusUser {
    grade: string | null
    level: number
    skills: Skill[]
    blackholed_at: string | null
    id: number
    begin_at: string
    end_at: string | null
    cursus_id: number
    has_coalition: boolean
    created_at: string
    updated_at: string
    user: User
    cursus: Cursus
}

export interface ProjectUser {
    id: number
    occurrence: number
    final_mark: number | null
    status: string
    'validated?': boolean | null
    current_team_id: number
    project: Project
    cursus_ids: number[]
    marked_at: string | null
    marked: boolean
    retriable_at: string | null
    created_at: string
    updated_at: string
}

export interface LanguageUser {
    id: number
    language_id: number
    user_id: number
    position: number
    created_at: string
}

export interface Achievement {
    id: number
    name: string
    description: string
    tier: string
    kind: string
    visible: boolean
    image: string
    nbr_of_success: number | null
    users_url: string
}

export interface ExpertiseUser {
    id: number
    expertise_id: number
    interested: boolean
    value: number
    contact_me: boolean
    created_at: string
    user_id: number
}

export interface Language {
    id: number
    name: string
    identifier: string
    created_at: string
    updated_at: string
}

export interface Campus {
    id: number
    name: string
    time_zone: string
    language: Language
    users_count: number
    vogsphere_id: number
    country: string
    address: string
    zip: string
    city: string
    website: string
    facebook: string
    twitter: string
    active: boolean
    public: boolean
    email_extension: string
    default_hidden_phone: boolean
}

export interface Skill {
    id: number
    name: string
    level: number
}

export interface CampusUser {
    id: number
    user_id: number
    campus_id: number
    is_primary: boolean
    created_at: string
    updated_at: string
}

export interface UserDetail {
    id: number
    email: string
    login: string
    first_name: string
    last_name: string
    usual_full_name: string
    usual_first_name: string | null
    url: string
    phone: string
    displayname: string
    kind: string
    image: {
        link: string
        versions: Versions
    }
    'staff?': boolean
    correction_point: number
    pool_month: string
    pool_year: string
    location: string | null
    wallet: number
    anonymize_date: string
    data_erasure_date: string
    created_at: string
    updated_at: string
    alumnized_at: null
    'alumni?': boolean
    'active?': boolean
    groups: unknown[]
    cursus_users: CursusUser[]
    projects_users: ProjectUser[]
    languages_users: LanguageUser[]
    achievements: Achievement[]
    titles: unknown[]
    titles_users: unknown[]
    partnerships: unknown[]
    patroned: unknown[]
    patroning: unknown[]
    expertises_users: ExpertiseUser[]
    roles: unknown[]
    campus: Campus[]
    campus_users: CampusUser[]
}

export const SESSION_STORAGE_PASSWORD_KEY = 'password'
export const CORRECT_PASSWORD = 'tanama'
