// @ts-nocheck

import { Column, HumpColumn } from "../../dist/index";

export class Article {

    @HumpColumn()
    articleId: number

    @Column()
    title: string

    @HumpColumn()
    userId: string

    @Column()
    content: string
}