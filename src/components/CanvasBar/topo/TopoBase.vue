<script>
import ViewText from './control/ViewText'
import ViewImage from './control/ViewImage'

import ViewCircular from './control/canvas/ViewCircular'
import ViewLine from './control/canvas/ViewLine'
import ViewLineArrow from './control/canvas/ViewLineArrow'
import ViewLineWave from './control/canvas/ViewLineWave'
import ViewBizierCurveArrow from './control/canvas/ViewBizierCurveArrow'
import ViewRect from './control/canvas/ViewRect'
import ViewTriangle from './control/canvas/ViewTriangle'

import ViewChart from './control/chart/ViewChart'
import ViewChartPie from './control/chart/ViewChartPie'
import ViewChartGauge from './control/chart/ViewChartGauge'
import ViewChartMap from './control/chart/ViewChartMap'

import ViewSvgImage from './control/svg/ViewSvgImage'
import ViewSvgStatic from './control/svg/ViewSvgStatic'

import ViewSearch from './control/modules/ViewSearch'
import ViewTable from './control/modules/ViewTable'

export default {
  name: 'TopoBase',
  components: {
    ViewText,
    ViewImage,
    ViewCircular,
    ViewLine,
    ViewLineArrow,
    ViewLineWave,
    ViewBizierCurveArrow,
    ViewRect,
    ViewTriangle,
    ViewChart,
    ViewChartPie,
    ViewChartGauge,
    ViewChartMap,
    ViewSvgImage,
    ViewSvgStatic,
    ViewSearch,
    ViewTable
  }
}
</script>
