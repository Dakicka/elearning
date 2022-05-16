import { Appwrite, Models, Query } from "appwrite";
import { appwriteServer } from "../utils/config";

const sdk = new Appwrite()
sdk.setEndpoint(appwriteServer.endpoint).setProject(appwriteServer.project);


export type AppwriteProfile = {
    userId: string;
    grade: number;
    exp: number;
    avatarId: string;
} & Models.Document

export type AppwriteClass = {
    title: string;
    description: string;
    thumbnailId: string;
} & Models.Document

export type AppwriteLecture = {
    title: string;
    description: string;
    videoUrl: string;
    classId: string;
    exp: number;
} & Models.Document

export type AppwriteWatchedClass = {
    userId: string;
    lectureId: string;
    date: number;
    xp: number
} & Models.Document

export const api = {
    // Create a new session for the user / loggin in 
    async login(email: string, password: string): Promise<Models.Session> {
        const session = await sdk.account.createSession(email, password)
        return session
    },

    async getAccount(): Promise<any> {
        const user = await sdk.account.get()
        return user
    },

    async createAccount(email: string, password: string, name: string): Promise<any> {
        const user = await sdk.account.create("unique()", email, password, name);
        await sdk.account.createSession(email, password)
        return user
    },

    async deleteCurrentSession(): Promise<void> {
        await sdk.account.deleteSession("current")
    },

    async uploadFile(file: File): Promise<string> {
        const uploadResponse = await sdk.storage.createFile("userUploads","unique()", file)
        return uploadResponse.$id
    },

    async updateAvatar(file: File, oldId: string): Promise<string> {
        sdk.storage.deleteFile("userUploads", oldId)
        const uploadResponse = await sdk.storage.createFile("userUploads","unique()", file)
        return uploadResponse.$id
    },

    async getProfile(userId: string): Promise<Models.DocumentList<AppwriteProfile>> {
        const profileResponse = await sdk.database.listDocuments<AppwriteProfile>(
            "profiles",
            [Query.equal("userId", userId)],
            1        
          );
        return profileResponse
    },

    async updateProfile(documentId: string, data: any): Promise<AppwriteProfile> {
        const profile = await sdk.database.updateDocument<AppwriteProfile>("profiles", documentId, data)
        return profile
    },

    async getUserAvatarInitials(name: string): Promise<any> {
        const initials = await sdk.avatars.getInitials(name)
        return initials.href
    },

    async getUserAvatar(fileId: string): Promise<string>{
    return sdk.storage.getFilePreview(
        'userUploads',
        fileId, 
        150, 
        150, 
        "center", 
        undefined,
        undefined,
        undefined,
        250,
        undefined,
        undefined,
        undefined,
        "webp"
        ).toString();
    
},
    async getClassThumbnail(fileId: string): Promise<string>{
    return sdk.storage.getFilePreview(
        'assets',
        fileId, 
        400, 
        200, 
        "center", 
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "webp"
        ).toString();
    
},
    async getAllClasses(): Promise<Models.DocumentList<AppwriteClass>> {
        const classes = await sdk.database.listDocuments<AppwriteClass>("classes")
        return classes
    },

    async getLecturesForClass(classId: string): Promise<Models.DocumentList<AppwriteLecture>>{
        const lectures = await sdk.database.listDocuments<AppwriteLecture>("lectures",[Query.equal("classId", classId)],)
        return lectures
    },

    async getLecture(lectureId: string): Promise<Models.DocumentList<AppwriteLecture>>{

        const lecture = await await sdk.database.listDocuments<AppwriteLecture>(
            "lectures",
            [Query.equal("$id", lectureId)],
            1        
          );
        return lecture
    },

    async markAsWatched(lectureId: string, userId: string, xp: number): Promise<void> {
        const date = Date.now().toString()
        await sdk.database.createDocument("watchedLectures","unique()",{userId,lectureId, date, xp})

    },

    async getUserXp(userId: string): Promise<number>{
        const watchedLectures = await sdk.database.listDocuments<AppwriteWatchedClass>("watchedLectures",[Query.equal("userId", userId)],)
        
        let xp = 0
        watchedLectures.documents.forEach((row) => xp += row.xp )

        return xp
    }

}
