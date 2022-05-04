export function FreezeClass(constructor: Function){
    Object.freeze(constructor)
    Object.freeze(constructor.prototype)
}