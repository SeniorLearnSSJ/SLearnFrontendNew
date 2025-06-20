

const BASE_URL = "http://192.168.1.244:3001";

export const API_Endpoint = {
    Auth: {
        SignIn: `${BASE_URL}/api/auth/sign-in`,
        Register:`${BASE_URL}/api/auth/register`
    },
    Member:`${BASE_URL}/api/bulletins/member`,
    Official:`${BASE_URL}/api/bulletins/official`,
    User: `${BASE_URL}/api/profile`,
    Settings:`${BASE_URL}/api/profile/settings`
}