import type { Route } from "@/types/ruoyi";

export function findRoute(name:string,routes?:Route[]):Route|undefined{
    if(!routes)return undefined
    for(let i=0;i<routes.length;i++){
        if(routes[i].name===name)return routes[i]
        const child=findRoute(name,routes[i].children)
       
        if(child)return child
    }
    return undefined
}