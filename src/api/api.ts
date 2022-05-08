
import { Appwrite } from "appwrite";
import { appwriteServer } from "../utils/config";

interface API {
    sdk: Appwrite | null;
    provider(): Appwrite
    getUser() : Promise<any>
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
    getUser: () => {
        return api.provider().account.get();
    }

}
