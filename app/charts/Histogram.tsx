'use client'

import * as d3 from 'd3'
import { useMemo, useRef, useEffect, useState } from 'react'
import ChartContainer from './components/Container'

interface HistogramProps {
    data: Array<Number>
}

const Histogram = ({ data }: HistogramProps) => {
    const chartGroupRef = useRef<SVGGElement>()
    const [width, setWidth] = useState(1)
    const [height, setHeight] = useState(1)
    const isWidthChange = chartGroupRef.current !== undefined ? chartGroupRef.current.getAttribute('width') : null

    useEffect(() => {
        if (chartGroupRef.current) {
            setWidth(parseFloat(chartGroupRef.current.getAttribute('width') as string))
            setHeight(parseFloat(chartGroupRef.current.getAttribute('height') as string))
        }
    }, [isWidthChange])

    const margin = {
        bottom: 8,
        left: 8,
        top: 8,
        right: 8
    }

    const x = useMemo(() => {
        return d3
            .scaleLinear()
            .domain(d3.extent(data, d => d))
            .range([0, width])
    }, [data, width])

    const bins = useMemo(() => {
        return d3
            .bin()
            .value(d => d)
            .domain(x.domain())
            .thresholds(x.ticks(20))
            (data)
    }, [data, x]) as unknown as [{ length: number, x0: number, x1: number }]


    const y = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([0, Math.max(...bins.map(bin => bin.length)) * 1.05])
            .range([height, 0])
    }, [bins, height])

    const rects = bins.map((bin, i) => {
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
        <ChartContainer margin={margin} title='vouty' theme='light' ref={chartGroupRef}>
            {rects}
        </ChartContainer>
    )
}

export default Histogram