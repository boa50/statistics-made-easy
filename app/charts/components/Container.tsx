import type { Margin } from "~/aux/Interfaces"
import { useEffect, useState, useRef, forwardRef } from "react"

const ChartContainer = forwardRef<HTMLDivElement>(({
    // id = Math.random(),
    id = 1,
    title = undefined,
    subtitle = undefined,
    theme = 'light',
    outerContainerClass = undefined,
    innerContainerClass = undefined,
    titleClass = undefined,
    subtitleClass = undefined,
    containerPadding = 'px-4 py-2',
    containerAspectRatio = 'aspect-[4/3] md:aspect-video',
    titleSize = 'text-sm md:text-base',
    titleColour = undefined,
    titleWeight = 'font-medium',
    subtitleSize = 'text-xs md:text-sm',
    subtitleColour = undefined,
    subtitleWeight = '',
    margin,
    chartDimensions,
    children
}: Props, chartGroupRef) => {
    const chartId = `chart-${id}`
    let containerBackground = 'bg-neutral-50'
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [svgWidth, setSvgWidth] = useState(0)
    const [svgHeight, setSvgHeight] = useState(0)
    const [viewBoxWidth, setViewBoxWidth] = useState(0)
    const [viewBoxHeight, setViewBoxHeight] = useState(0)
    const innerContainer = useRef(null)

    useEffect(() => {
        if (chartDimensions === undefined) chartDimensions = getChartDimensions({ innerContainer: innerContainer })

        setSvgWidth(getSvgWidth(innerContainer))
        setSvgHeight(getSvgHeight(innerContainer))

        setViewBoxWidth(chartDimensions.width)
        setViewBoxHeight(chartDimensions.height)
    }, [innerContainer])

    useEffect(() => {
        setWidth(viewBoxWidth - margin.left - margin.right)
        setHeight(viewBoxHeight - margin.top - margin.bottom)
    }, [viewBoxWidth, viewBoxHeight, margin])

    switch (theme) {
        case 'light':
            titleColour = getValueIfUndefined(titleColour, 'text-gray-700')
            subtitleColour = getValueIfUndefined(subtitleColour, 'text-gray-500')
            break
        case 'dark':
            containerBackground = 'bg-neutral-900'
            titleColour = getValueIfUndefined(titleColour, 'text-neutral-200')
            subtitleColour = getValueIfUndefined(subtitleColour, 'text-neutral-400')
            break
        case 'darkGradient':
            containerBackground = 'bg-gradient-to-b from-gray-800 to-gray-950'
            titleColour = getValueIfUndefined(titleColour, 'text-neutral-200')
            subtitleColour = getValueIfUndefined(subtitleColour, 'text-neutral-400')
            break
    }

    outerContainerClass = getValueIfUndefined(outerContainerClass, `${containerBackground} ${containerPadding} rounded`)
    innerContainerClass = getValueIfUndefined(innerContainerClass, containerAspectRatio)
    titleClass = getValueIfUndefined(titleClass, `${titleSize} ${titleColour} ${titleWeight}`)
    subtitleClass = getValueIfUndefined(subtitleClass, `${subtitleSize} ${subtitleColour} ${subtitleWeight}`)

    return (
        <div className={outerContainerClass}>
            <div id={`${chartId}-container`} className={innerContainerClass} ref={innerContainer}>
                {
                    title !== undefined ?
                        <h3 id={`${chartId}-title`} className={titleClass}>{title}</h3>
                        : null
                }
                {
                    subtitle !== undefined ?
                        <h4 id={`${chartId}-subtitle`} className={subtitleClass}>{subtitle}</h4>
                        : null
                }
                <svg
                    id={chartId}
                    width={svgWidth}
                    height={svgHeight}
                    viewBox={`0 0  ${viewBoxWidth} ${viewBoxHeight}`}
                    preserveAspectRatio="xMinYMid meet"
                >
                    <g
                        id={`${chartId}-main-g`}
                        ref={chartGroupRef}
                        width={width}
                        height={height}
                        transform={`translate(${[margin.left, margin.top]})`}>
                        {children}
                    </g>
                </svg>
            </div>
        </div>
    )
})

ChartContainer.displayName = 'ChartContainer'

export default ChartContainer

function getValueIfUndefined(variable: any, value: any) {
    return variable === undefined ? value : variable
}

function getSvgWidth(innerContainer) {
    return innerContainer.current.offsetWidth
}

function getSvgHeight(innerContainer) {
    // const title = document.getElementById(`${chartId}-title`)
    // const subtitle = document.getElementById(`${chartId}-subtitle`)

    // return document.getElementById(`${chartId}-container`).offsetHeight
    //     - (title ? title.offsetHeight : 0) - (subtitle ? subtitle.offsetHeight : 0)
    return innerContainer.current.offsetHeight
}

function getChartScale(innerContainer) {
    return getSvgWidth(innerContainer) / getSvgHeight(innerContainer)
}

function getChartDimensions({
    innerContainer,
    sm = { width: 420, scale: undefined },
    md = { width: 700, scale: undefined },
    lg = { width: 700, scale: undefined },
    xl = { width: 622, scale: undefined },
    xl2 = { width: 875, scale: undefined }
}) {
    let width, height, scale

    if (window.matchMedia("(min-width: 1536px)").matches) {
        width = xl2.width
        scale = xl2.scale
    } else if (window.matchMedia("(min-width: 1280px)").matches) {
        width = xl.width
        scale = xl.scale
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
        width = lg.width
        scale = lg.scale
    } else if (window.matchMedia("(min-width: 768px)").matches) {
        width = md.width
        scale = md.scale
    } else {
        width = sm.width
        scale = sm.scale
    }

    if (scale === undefined) {
        scale = innerContainer !== undefined ? getChartScale(innerContainer) : (16 / 9)
    }

    height = width / scale

    return { width, height }
}

interface Props {
    id?: number
    title?: string | undefined
    subtitle?: string | undefined
    theme?: 'light' | 'dark' | 'darkGradient'
    outerContainerClass?: string | undefined
    innerContainerClass?: string | undefined
    titleClass?: string | undefined
    subtitleClass?: string | undefined
    containerPadding?: string
    containerAspectRatio?: string
    titleSize?: string
    titleColour?: string | undefined
    titleWeight?: string
    subtitleSize?: string
    subtitleColour?: string | undefined
    subtitleWeight?: string
    margin: Margin
    children: React.ReactNode
}