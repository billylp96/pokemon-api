import { Character } from './character-interface';

export interface CharactersResponse {
    items: Character[],
    meta: Meta,
    links:Links
}

export interface Meta {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
}

export interface Links {
    first: string
    previous: string
    next: string
    last: string
}