<script>
import { mapState } from 'vuex'

export default {
  name: 'TopoProperties',
  data() {
    return {
      tabIndex: 0,
      fontFamilyOptions: [
        'Arial',
        'Helvetica',
        'sans-serif',
        '宋体',
        '黑体',
        '微软雅黑'
      ],
      textAlignOptions: ['left', 'right', 'center', 'justify'],
      borderStyleOptions: ['solid', 'dashed', 'dotted'],
      whOptions: [
        '1024x768',
        '1366x768',
        '1280x800',
        '1440x900',
        '1600x900',
        '1920x1080',
        'custom'
      ],
      layerWHTemp: ''
    }
  },
  computed: {
    layerWH: {
      get: function() {
        const layerWidth = this.topoData.layer.width || 1600
        const layerHeight = this.topoData.layer.height || 900
        let layerWHTemp = this.layerWHTemp
        if (layerWHTemp === '') {
          const wh = layerWidth + 'x' + layerHeight
          if (this.whOptions.indexOf(wh, 0) === -1) {
            layerWHTemp = 'custom'
          } else {
            layerWHTemp = wh
          }
        } else {
          const wh = layerWidth + 'x' + layerHeight
          if (this.whOptions.indexOf(wh, 0) === -1) {
            layerWHTemp = 'custom'
          }
        }
        return layerWHTemp
      },
      set: function(val) {
        this.layerWHTemp = val
        if (val === 'custom') {
          console.log('custom')
        } else {
          var wh = val.split('x')
          this.topoData.layer.width = parseInt(wh[0])
          this.topoData.layer.height = parseInt(wh[1])
        }
      }
    },
    ...mapState({
      topoData: state => state.topoEditor.topoData,
      selectedComponents: state => state.topoEditor.selectedComponents,
      selectedComponentMap: state => state.topoEditor.selectedComponentMap,
      isLayer: state => state.topoEditor.selectedIsLayer,
      configObject: state => state.topoEditor.selectedComponent
    })
  },
  mounted() {},
  methods: {
    initPage(configData) {
      this.configData = configData
    },
    changeTab(tabIndex) {
      this.tabIndex = tabIndex
    },
    bindData(configObject, index, isLayer) {
      this.configObject = configObject
      this.isLayer = isLayer
      if (isLayer === false) {
        console.log('isLayer')
      }
    },
    generateTargetComponentOptions() {
      var options = []
      this.topoData.components.forEach(component => {
        if (this.configObject.identifier !== component.identifier) {
          options.push({
            label: component.name || component.type,
            value: component.identifier
          })
        }
      })
      return options
    },
    removeAction(index) {
      this.configObject.action.splice(index, 1)
    },
    addAction() {
      var action = {
        type: 'click',
        action: 'visible',
        showItems: [],
        hideItems: []
      }
      this.configObject.action.push(action)
    }
  }
}
</script>

<style lang="scss">
.topo-properties {
  border: #ccc solid 1px;
  background-color: white;
  height: 100%;

  .topo-properties-tabs {
    height: 35px;
    display: flex;
    border-bottom: #ccc solid 1px;
    background-color: white;

    .topo-properties-tab {
      height: 35px;
      text-align: center;
      line-height: 35px;
      flex: 1;
      color: #666;
    }

    .topo-properties-tab + .topo-properties-tab {
      border-left: #ccc solid 1px;
    }

    .topo-properties-tab:hover {
      cursor: pointer;
    }

    .topo-properties-tab-active {
      color: #000;
      border-bottom: #3388ff solid 2px;
      font-weight: bold;
    }
  }

  .topo-properties-table {
    overflow-x: hidden;
    overflow-y: auto;
    height: calc(100% - 92px);

    table {
      width: 100%;
      border-collapse: collapse;

      td {
        text-align: center;
        padding: 0px;
        border: #ccc solid 1px;
      }

      .q-input {
        border: none;
      }

      .q-select {
        border: none;
        margin-right: 0px;
      }
    }
  }

  .not-surpport {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
