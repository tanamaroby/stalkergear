export interface User {
    id: number
    email: string
    login: string
    first_name: string
    last_name: string
    url: string
    displayname: string
    kind: string
    image: {
        link: string
    }
}