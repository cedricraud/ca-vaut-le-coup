<template>
  <div class="profitable-graph">
    <svg ref="svgNode" :height="viewport.height" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import debounce from 'lodash.debounce'
import { computeGraphModel, formatSimpleDuration } from '@/utils/duration.ts'

function formatXTick (graph) {
  return (d) => {
    return d && formatSimpleDuration(d, graph.profitable.period)
  }
}

function initGraph (svg, viewport) {
  const node = {}

  // Init d3
  d3.formatDefaultLocale({
    decimal: ',',
    thousands: '\u00A0',
    grouping: [3],
    currency: ['', '\u00A0€'],
    minus: '\u2212',
    percent: '\u202F%'
  })

  node.svg = d3.select(svg)
  node.viewport = node.svg.append('g')
    .attr('class', 'viewport')
  node.yAxis = node.viewport.append('g')
    .attr('class', 'y-axis')
  node.yText = node.viewport.append('text')
    .attr('class', 'y-text')
    .text('Temps passé')
  node.xAxis = node.viewport.append('g')
    .attr('class', 'x-axis')
  node.profitableRect = node.viewport.append('rect')
    .attr('class', 'rect profitable')
  node.durationPath = node.viewport.append('path')
    .attr('class', 'path duration')
  node.profitablePath = node.viewport.append('path')
    .attr('class', 'path profitable')
  node.futureDurationLine = node.viewport.append('line')
    .attr('class', 'line future-duration')
  node.durationLine = node.viewport.append('line')
    .attr('class', 'line duration')
  node.profitablePeriodLine = node.viewport.append('line')
    .attr('class', 'line profitable-period')
  node.profitableLine = node.viewport.append('line')
    .attr('class', 'line profitable')
  node.profitableText = node.viewport.append('text')
    .attr('class', 'profitable-text')
  node.profitableDurationIntroText = node.viewport.append('text')
    .attr('class', 'profitable-duration-intro-text')
  node.profitableDurationText = node.viewport.append('text')
    .attr('class', 'profitable-duration-text')

  node.x = d3.scaleLinear()
  node.y = d3.scaleLinear()

  return {
    node,
    viewport,
    data: [],
    isInitialRendering: true
  }
}

function generateClosedPath (pointA, pointB, pointC, pointD) {
  const path = d3.path()
  path.moveTo(pointA[0], pointA[1])
  path.lineTo(pointB[0], pointB[1])
  path.lineTo(pointC[0], pointC[1])
  if (pointD) {
    path.lineTo(pointD[0], pointD[1])
  }
  path.closePath()
  return path
}

function renderGraph (graph) {
  const viewport = graph.viewport
  const node = graph.node

  // Viewport
  viewport.width = graph.node.svg.node().getBoundingClientRect().width
  viewport.innerWidth = viewport.width - viewport.padding.left - viewport.padding.right
  viewport.innerHeight = viewport.height - viewport.padding.top - viewport.padding.bottom

  node.viewport.attr('transform', `translate(${viewport.padding.left},${viewport.padding.top})`)

  const maxX = d3.max(graph.data, d => d.x) || 0
  const maxY = d3.max(graph.data, d => d.y + d.height) || 0
  node.x.domain([0, maxX])
  node.y.domain([maxY * 0.8, 0])
  node.x.range([0, viewport.innerWidth])
  node.y.range([0, viewport.innerHeight])

  const xAxisGenerator = d3.axisBottom(node.x)
    .ticks(4)
    .tickSize(7)
    .tickFormat(formatXTick(graph))
  node.xAxis
    .attr('transform', `translate(0,${viewport.innerHeight})`)
    .transition()
    .call(xAxisGenerator)

  const yAxisGenerator = d3.axisLeft(node.y)
    .tickSize(-viewport.innerWidth)
    .tickFormat('')
  node.yAxis
    .attr('transform', 'translate(0,0)')
    .transition()
    .call(yAxisGenerator)

  if (graph.isInitialRendering) {
    node.durationPath
      .attr('d', generateClosedPath(
        [node.x(0), node.y(0)],
        [node.x(graph.data[graph.data.length - 1].x), node.y(0)],
        [node.x(graph.data[graph.data.length - 1].x), node.y(0)]
      ))

    node.profitableRect
      .attr('x', node.x.range()[0])
      .attr('y', node.y(0))
      .attr('width', node.x.range()[1])
      .attr('height', 0)

    node.profitableLine
      .attr('x1', node.x.range()[0])
      .attr('x2', node.x.range()[1])
      .attr('y1', node.y(0))
      .attr('y2', node.y(0))

    node.durationLine
      .attr('x1', node.x.range()[0])
      .attr('x2', node.x(graph.profitable.x))
      .attr('y1', node.y(0))
      .attr('y2', node.y(0))

    node.futureDurationLine
      .attr('x1', node.x(graph.data[0].x))
      .attr('x2', node.x(graph.data[graph.data.length - 1].x))
      .attr('y1', node.y(0))
      .attr('y2', node.y(0))

    node.profitableText
      .attr('y', node.y(0))

    node.profitableDurationIntroText
      .attr('x', node.x.range()[1])
      .attr('y', node.y(graph.profitable.y))

    node.profitableDurationText
      .attr('x', node.x.range()[1])
      .attr('y', node.y(graph.profitable.y))
  }

  node.durationPath
    .transition()
    .attr('d', generateClosedPath(
      [node.x(0), node.y(0)],
      [node.x(graph.data[graph.data.length - 1].x), node.y(graph.data[graph.data.length - 1].y)],
      [node.x(graph.data[graph.data.length - 1].x), node.y(0)]
    ))

  node.profitableRect
    .transition()
    .attr('x', node.x.range()[0])
    .attr('y', node.y(graph.profitable.y))
    .attr('width', node.x.range()[1])
    .attr('height', node.y(0) - node.y(graph.profitable.y))

  node.profitablePath
    .transition()
    .attr('d', generateClosedPath(
      [node.x(0), node.y(0)],
      [node.x(graph.profitable.x), node.y(graph.profitable.y)],
      [node.x.range()[1], node.y(graph.profitable.y)],
      [node.x.range()[1], node.y(0)]
    ))

  node.profitableLine
    .transition()
    .attr('x1', node.x.range()[0])
    .attr('x2', node.x.range()[1])
    .attr('y1', node.y(graph.profitable.y))
    .attr('y2', node.y(graph.profitable.y))

  node.durationLine
    .transition()
    .attr('x1', node.x.range()[0])
    .attr('x2', node.x(graph.profitable.x))
    .attr('y1', node.y(0))
    .attr('y2', node.y(graph.profitable.y))

  node.futureDurationLine
    .transition()
    .attr('x1', node.x(graph.data[0].x))
    .attr('x2', node.x(graph.data[graph.data.length - 1].x))
    .attr('y1', node.y(0))
    .attr('y2', node.y(graph.data[graph.data.length - 1].y))

  node.profitablePeriodLine
    .transition()
    .attr('x1', node.x(graph.profitable.x))
    .attr('x2', node.x(graph.profitable.x))
    .attr('y1', node.y(graph.profitable.y))
    .attr('y2', node.y(0))

  node.profitableText
    .transition()
    .attr('y', node.y(graph.profitable.y))
    .text(formatSimpleDuration(graph.profitable.optimizationValue, graph.profitable.optimizationPeriod))

  node.profitableDurationIntroText
    .transition()
    .attr('x', node.x(graph.profitable.x))
    .attr('y', node.y(graph.profitable.y))
    .text('Rentable à partir de')

  node.profitableDurationText
    .transition()
    .attr('x', node.x(graph.profitable.x))
    .attr('y', node.y(graph.profitable.y))
    .text(formatSimpleDuration(graph.profitable.x, graph.profitable.period))

  graph.isInitialRendering = false
}

export default {
  props: {
    model: {
      type: Object,
      default () { }
    },
    height: {
      type: Number,
      default: 150
    }
  },
  data () {
    return {
      // Options
      viewport: {
        width: 0, // Computed
        height: this.height,
        innerWidth: 0, // Computed
        innerHeight: 0, // Computed
        padding: {
          left: 35,
          right: 0,
          top: 0,
          bottom: 30
        }
      },
      // State
      graph: null,
      resizeFn: null
    }
  },
  watch: {
    model: 'render',
    height: 'render',
    padding: 'render'
  },
  mounted () {
    this.init()
    this.render()
    this.resizeFn = this.render
    window.addEventListener('resize', this.resizeFn)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeFn)
  },
  methods: {
    init () {
      this.graph = initGraph(this.$refs.svgNode, this.viewport)
    },
    render: debounce(function () {
      computeGraphModel(this.graph, this.model)
      renderGraph(this.graph)
    }, 300)
  }
}

</script>

<style lang="scss" scoped>
.profitable-graph {
  @apply max-w-lg m-auto mt-5 mb-1 border border-gray-400 rounded-lg overflow-hidden;
}

svg {
  width: 100%;

  &::v-deep {
    .y-axis {
      .domain {
        display: none;
      }

      .tick {
        @apply stroke-current text-gray-300;
        stroke-dasharray: 2 2;
      }
    }

    .y-text {
      @apply fill-current text-sm text-gray-700;
      transform: translate(-13px, 105px) rotate(-90deg);
    }

    .x-axis {
      .domain {
        @apply stroke-current text-gray-400;
        stroke-width: 1px;
      }

      .tick line {
        @apply stroke-current text-gray-400;
      }

      text {
        @apply text-sm text-gray-700;
        transform: translate(0, 2px);
      }
    }

    .path.duration {
      @apply fill-current text-purple-200 text-opacity-25;
    }

    .rect.profitable {
      @apply fill-current text-indigo-200 text-opacity-25;
    }

    .path.profitable {
      @apply fill-current text-indigo-200 text-opacity-50;
    }

    .line {
      @apply stroke-current;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2px;
    }

    .duration {
      @apply text-gray-600;
    }

    .future-duration {
      @apply text-gray-500;
      stroke-dasharray: 8 8;
    }

    .profitable {
      @apply text-blue-600;
    }

    .profitable-period {
      @apply text-blue-600 text-opacity-25;
      display: none;
    }

    .profitable-text {
      @apply fill-current text-sm font-medium text-blue-700;
      transform: translate(0, -7px);
    }

    .profitable-duration-intro-text {
      @apply fill-current text-xs font-semibold text-blue-700 uppercase;
      transform: translate(10px, 20px);
    }

    .profitable-duration-text {
      @apply fill-current text-3xl font-medium text-blue-700;
      transform: translate(10px, 48px);
    }
  }
}

// svg::v-deep .cursor {
//   stroke: $graph-purple-color;
//   stroke-linecap: round;
//   stroke-linejoin: round;
//   stroke-width: 5px;
//   cursor: col-resize;
//   opacity: 0.8;

//   &:hover {
//     stroke-width: 7px;
//   }
// }

// svg::v-deep .abscissa .hTick  {
//   shape-rendering: crispedges;
//   stroke: $graph-inner-border-color;
//   stroke-linecap: round;
//   stroke-linejoin: round;
//   stroke-width: 1px;
// }

// svg::v-deep .abscissa .tick {
//   shape-rendering: crispedges;
//   stroke: $graph-outer-border-color;
//   stroke-linecap: round;
//   stroke-linejoin: round;
//   stroke-width: 1px;

//   &.major {
//     stroke: darken($graph-accentblue-color, 10);
//     stroke-width: 2px;
//   }
// }

// svg::v-deep .abscissa .label {
//   cursor: pointer;
// }

// svg::v-deep .label.name {
//   @include font-semibold;
// }

// svg::v-deep .cursor-container .label.name {
//   fill: $graph-purple-color;
// }
</style>
