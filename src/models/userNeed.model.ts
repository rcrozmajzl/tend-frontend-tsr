export interface UserNeed {
    "id": number,
    "details_personal": string,
    "rating_importance": number,
    "rating_frequency": number,
    "need": IUserNeed
}

export interface IUserNeed {
    "id": number,
    "category": string,
    "title": string,
    "details_general": string
}