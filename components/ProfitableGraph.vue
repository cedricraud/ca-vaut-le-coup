<template>
  <div class="profitable-graph">
    <svg ref="svgNode" :height="viewport.height" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import debounce from 'lodash.debounce'
import { computeGraphModel } from '@/utils/duration.ts'

function initGraph (svg, viewport) {
  const node = {}

  node.svg = d3.select(svg)
  node.viewport = node.svg.append('g')
    .attr('class', 'viewport')
  node.periods = node.viewport.append('g')
    .attr('class', 'periods')
  node.line = node.viewport.append('line')
    .attr('class', 'line')
  node.x = d3.scaleLinear()
  node.y = d3.scaleLinear()

  return {
    node,
    viewport,
    data: []
  }
}

function renderGraph (graph) {
  const viewport = graph.viewport
  const node = graph.node

  // Viewport
  viewport.width = graph.node.svg.node().getBoundingClientRect().width
  viewport.innerWidth = viewport.width - viewport.padding.left - viewport.padding.right
  viewport.innerHeight = viewport.height - viewport.padding.top - viewport.padding.bottom

  node.viewport.attr('transform', `translate(${viewport.padding.left},${viewport.padding.top})`)

  node.x.domain([0, d3.max(graph.data, d => d.x) || 0])
    .range([0.25 * viewport.innerWidth, 0.75 * viewport.innerWidth])
  node.y.domain([d3.max(graph.data, d => d.y + d.height) || 0, 0])
    .rangeRound([0, viewport.innerHeight])

  const periods = node.periods.selectAll('.period')
    .data(graph.data, d => d.x)
  periods
    .enter().append('rect')
    .attr('class', 'period')
    .attr('x', d => node.x(d.x))
    .attr('y', d => -100)
    .attr('width', d => viewport.innerWidth - node.x(d.x))
    .attr('height', d => node.y(0) - node.y(d.height))
    .merge(periods)
    .transition()
    .attr('x', d => node.x(d.x))
    .attr('y', d => node.y(d.y + d.height))
    .attr('width', d => viewport.innerWidth - node.x(d.x))
    .attr('height', d => node.y(0) - node.y(d.height))
  periods.exit()
    .remove()

  node.line
    .transition()
    .attr('x1', 0)
    .attr('y1', node.y(graph.optimisation.y))
    .attr('x2', viewport.innerWidth)
    .attr('y2', node.y(graph.optimisation.y))
}

export default {
  props: {
    model: {
      type: Object,
      default () {}
    },
    height: {
      type: Number,
      default: 150
    },
    padding: {
      type: Number,
      default: 0
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
          left: 0,
          right: 0,
          top: this.padding,
          bottom: this.padding
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
  @apply max-w-lg m-auto mt-4 border border-gray-500 rounded-lg overflow-hidden;
}

svg {
  width: 100%;
}

svg::v-deep .period {
  @apply text-indigo-600 fill-current rounded-lg;
}

svg::v-deep .line {
  @apply stroke-current text-pink-700;
  shape-rendering: crispedges;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
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
