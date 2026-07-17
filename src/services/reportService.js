import { get } from "../utils/request"

export const getSubjectStatistic = async(subject) => {
    const result = await get(`/statistics/${subject}`);
    return result;
}