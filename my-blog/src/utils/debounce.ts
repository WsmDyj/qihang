export default function debounce (this: any, fnc: Function, debTime: number) {
  let timer:any = null
  return (...args:any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fnc.apply(this, args)
      }, debTime)
    }
  }
}
