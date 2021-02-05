/*
 * Created by YanShen on 2019/08/08
 * Modified by: YanShen on 2019/08/09
 */

/**
 * @param {string} value
 * @returns {map} mapList
 */
export function filterValue(value, mapList) {
  const filterMap = mapList
  return filterMap[value]
}

export function jsonParse(value) {
  let data
  try {
    data = JSON.parse(value)
  } catch (e) {
    try {
      data = new Function('return ' + value)()
    } catch (e) {
      data = value
    }
  }
  return data
}

// /**
//  * @param {object} value
//  */
export function copyObject(value) {
  return JSON.parse(JSON.stringify(value))
}

// /**
//  * @param {array} list
//  */
export function selectParseArray(list, value, label) {
  const res = []
  if (list && list.length > 0) {
    list.forEach((arr) => {
      res.push({
        value: arr[value],
        label: arr[label]
      })
    })
  }
  return res
}
// /**
//  * @param {HTMLElement} element
//  * @param {string} className
//  */
// export function toggleClass(element, className) {
//   if (!element || !className) {
//     return
//   }
//   let classString = element.className
//   const nameIndex = classString.indexOf(className)
//   if (nameIndex === -1) {
//     classString += '' + className
//   } else {
//     classString =
//       classString.substr(0, nameIndex) +
//       classString.substr(nameIndex + className.length)
//   }
//   element.className = classString
// }
