export default function  GenNonDuplicateID():string {
  return Number(Math.random().toString().substr(3,8) + Date.now()).toString(36)
}