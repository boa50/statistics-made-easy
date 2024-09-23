'use client'

import * as d3 from 'd3'
import { useMemo } from 'react'

interface ChartProps {
    data: Array<number>
}

const Histogram = ({ data }): ChartProps => {
    const svgDims = {
        width: 400,
        height: 400
    }

    const margin = {
        bottom: 64,
        left: 72,
        top: 8,
        right: 8
    }
    const width = 300
    const height = 300

    const x = useMemo(() => {
        return d3
            .scaleLinear()
            .domain(d3.extent(data, d => d))
            .range([0, width])
    }, [data, width])

    const binGenerator = d3
        .bin()
        .value(d => d)
        .domain(x.domain())
        .thresholds(x.ticks(20))

    const bins = binGenerator(data)


    const y = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, Math.max(...bins.map(bin => bin.length)) * 1.05])
            .range([height, 0])
    }, [bins, height])

    const allRects = bins.map((bin, i) => {
        return (
            <rect
                key={i}
                fill="#69b3a2"
                stroke="black"
                x={x(bin.x0)}
                width={x(bin.x1) - x(bin.x0)}
                y={y(bin.length)}
                height={height - y(bin.length)}
            />
        );
    });

    return (
        <div>
            <svg width={width} height={height}>
                {allRects}
            </svg>
        </div>
    )

}

export default Histogram