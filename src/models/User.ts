export interface User {
    id: number
    email: string
    name: string
    avatar: string
    grade: number
    xp: number
}

export interface Profile extends Pick<User, "name" | "avatar" | "grade" | "xp"> {}