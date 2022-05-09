
import { Appwrite } from "appwrite";
import { User } from "../models/User";
import { appwriteServer } from "../utils/config";

interface API {
    sdk: Appwrite | null;
    provider(): Appwrite
    createAccount(
        email: string,
        password: string,
        name: string
    ): Promise<any>
    getAccount() : Promise<any>
    createSession(email: string,
        password: string): Promise<any>
    deleteCurrentSession(): Promise<any>
}

const api: API = {
    sdk: null,
    provider: () => {
        if (api.sdk) {
            return api.sdk;
        }
        const appwrite = new Appwrite()
            .setEndpoint(appwriteServer.endpoint)
            .setProject(appwriteServer.project);
        api.sdk = appwrite;
        return appwrite;
    },
    createAccount: (email, password, name) => {
        return api.provider().account.create("unique()", email, password, name);
    },
    getAccount: () => {
        return api.provider().account.get();
    },
    createSession: (email, password) => {
        return api.provider().account.createSession(email, password)
    },
    deleteCurrentSession: () => {
        return api.provider().account.deleteSession("current")
    }
}

export default api