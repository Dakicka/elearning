export const appwriteServer = {
    endpoint: import.meta.env.VITE_APPWRITE_API_ENDPOINT,
    project: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    collections: {
        classes: import.meta.env.VITE_APPWRITE_COLLECTION_CLASSES,
        profiles: import.meta.env.VITE_APPWRITE_COLLECTION_PROFILES
    }
}