import { FieldPacket, ResultSetHeader } from "mysql2"

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T


export type SelectResults<T> = Promise<ExpandRecursively<Array<T>>>

export type SelectOneResults<T> = Promise<ExpandRecursively<T>>

export type SelectOriginResults<T> = Promise<[T, FieldPacket[]]>

export type DeleteResults = Promise<ResultSetHeader>

export type InsertResults = Promise<ResultSetHeader>

export type UpdateResults = Promise<ResultSetHeader>