import base from './base'

/**
 *
 * @param {*} component
 * @param {string} type preview | editing
 */
const transform = (component, type) => {
  return Object.keys(component).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: component[curr][type]
    }
  }, {})
}

export const previews = {

  ...transform(base, 'preview')

}
