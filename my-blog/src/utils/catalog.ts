export default function toToc(data: any[]) {
  let levelStack: string[] = []
  let result:string = ''
  const addStartUL = () => { result += '<ul class="catalog-list">'; }
  const addEndUL = () => { result += '</ul>\n'; }
  const addLI = (index: number,itemText: string) => { result += '<li><a class="toc-link" href="#' + index + '">' + itemText + "<a></li>\n"; }
  data.forEach(function (item: any, index: number) {
    let itemText: string = item.replace(/<[^>]+>/g, '')
    let itemLabel: string = item.match(/<\w+?>/)[0]
    let levelIndex = levelStack.indexOf(itemLabel)
    if (levelIndex === -1) {
      levelStack.unshift(itemLabel);
      addStartUL();
      addLI(index, itemText)
    }
    else if (levelIndex === 0) {
      addLI(index, itemText)
    }
    else {
      while (levelIndex--) {
        levelStack.shift()
        addEndUL()
      }
      addLI(index, itemText)
    }
  })
  addEndUL()
  return result
}