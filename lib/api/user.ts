const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getUserPremuimById = async (userId:string) => {
    const res = await fetch(`${BASE_URL}/user/${userId}/premium`);
    return res.json();
}