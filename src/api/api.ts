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
    lectures: Lecture[];
} & Models.Document

export type Lecture = {
    title: string;
    description: string;
}

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
        return user
    },

    async deleteCurrentSession(): Promise<void> {
        await sdk.account.deleteSession("current")
    },

    async uploadImage(file: File): Promise<Models.File> {
        return await sdk.storage.createFile("userUploads", "unique()", file, ["*"]);
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
    async getAllClasses(): Promise<Models.DocumentList<AppwriteClass>> {
        const classes = await sdk.database.listDocuments<AppwriteClass>("classes")
        return classes
    }

}
