export interface IProductEditData {
    title: string;
    description: string;
    price: string;
    mainImage: string;
    newImages?: string;
    commentsToRemove: string | string[];
    imagesToRemove: string | string[];
    itemsToRemove: string | string[];
    itemsToAdd: string | string[];
    itemsIdsToAdd: string[];
}

export interface IAuthRequisites {
    username: string;
    password: string;
}

declare module 'express-session' {
    export interface SessionData {
        username?: string;
    }
}

export interface IProductNew {
    title: string;
    description: string;
    price: string;
}