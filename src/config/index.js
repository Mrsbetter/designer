import commonConfig from './common'
import baseConfigs from './base'

let globalId = 100

/**
 * 所有组件配置, 用于侧边栏展示
 */
export const configs = [
  {
    type: 'base',
    name: '基础组件',
    configs: Object.values(baseConfigs)
  }
]

/**
 * 获取相应tag的config信息
 * @param {*} tag
 */
export const getConfig = (tag) => {
  const baseConfig = { ...baseConfigs[tag] }
  return {
    __vModel__: globalId++,
    ... Object.keys(commonConfig).reduce((prev, curr) => {
      const extendConfig = baseConfig[curr]

      const config = {
        ...prev
      }

      if (extendConfig) {
        delete baseConfig[curr]
        config[curr] = Object.assign({ ...commonConfig[curr] }, extendConfig)
      }

      return config
    }, {}),
    ...baseConfig
  }
}
