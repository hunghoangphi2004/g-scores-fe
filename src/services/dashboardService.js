import { get } from "../utils/request"

export const getTop10GroupA = async() => {
    const result = await get(`/statistics/get-top-10-group-A`);
    return result;
}