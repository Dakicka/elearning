interface Lecture {
    id: number
    title: string,
    description: string
    video_url: string
    xp: number
}

export interface Course {
    id: number
    title: string,
    description: string,
    thumbnail: string
    lectures: Lecture[]
}