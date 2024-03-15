export type DictItem = {
    value:string
    label:string
    elTagType?:string
    elTagClass?:string
}
export type SingleResponse<T> ={
    msg?:string
    code:number
    data?:T
  }
export type PageResponse<T> ={
    total:number
    rows:T[]
    msg?:string
    code:number
}