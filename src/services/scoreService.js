import { get } from "../utils/request"

export const getScoreBySbd = async(sbd) => {
    const result = await get(`/scores/${sbd}`);
    return result;
}