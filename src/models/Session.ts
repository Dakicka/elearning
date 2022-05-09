export interface Session {
    $id: string;
    userId: string;
    expire: number;
    provider: string;
    providerUid: string;
    providerAccessToken: string;
    providerAccessTokenExpiry: number;
    providerRefreshToken: string;
    ip: string;
    osCode: string;
    osName: string;
    osVersion: string;
    clientType: string;
    clientCode: string;
    clientName: string;
    clientVersion: string;
    clientEngine: string;
    clientEngineVersion: string;
    deviceName: string;
    deviceBrand: string;
    deviceModel: string;
    countryCode: string;
    countryName: string;
    current: boolean;
}
