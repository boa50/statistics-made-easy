import type { SvgDims, Margin } from "~/aux/Interfaces"

interface Props {
    title: string
    svgDims: SvgDims
    width: number
    height: number
    margin: Margin
    children: React.ReactNode
}

const ChartContainer = ({
    id = Math.random(),
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
    svgDims,
    width,
    height,
    margin,
    children
}: Props) => {
    const chartId = `chart-${id}`
    let containerBackground = 'bg-neutral-50'

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
            <div id={`${chartId}-container`} className={innerContainerClass}>
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
                <svg width={svgDims.width} height={svgDims.height} id={`barchart-${title}`}>
                    <g
                        width={width}
                        height={height}
                        transform={`translate(${[margin.left, margin.top].join(',')})`}>
                        {children}
                    </g>
                </svg>
            </div>
        </div>
    )
}

export default ChartContainer

// export const appendChartContainer = ({
//     idNum = 0,
//     chartTitle,
//     chartSubtitle,
//     outerContainerClass,
//     innerContainerClass,
//     titleClass,
//     subtitleClass,
//     chartsContainerId = 'charts',
//     theme = 'light',
//     containerPadding = 'px-4 py-2',
//     containerAspectRatio = 'aspect-[4/3] md:aspect-video',
//     titleSize = 'text-sm md:text-base',
//     titleColour,
//     titleWeight = 'font-medium',
//     subtitleSize = 'text-xs md:text-sm',
//     subtitleColour,
//     subtitleWeight = ''
// }) => {
//     const chartId = `chart${idNum}`
//     let containerBackground = 'bg-neutral-50'

//     switch (theme) {
//         case 'light':
//             titleColour = getValueIfUndefined(titleColour, 'text-gray-700')
//             subtitleColour = getValueIfUndefined(subtitleColour, 'text-gray-500')
//             break
//         case 'dark':
//             containerBackground = 'bg-neutral-900'
//             titleColour = getValueIfUndefined(titleColour, 'text-neutral-200')
//             subtitleColour = getValueIfUndefined(subtitleColour, 'text-neutral-400')
//             break
//         case 'darkGradient':
//             containerBackground = 'bg-gradient-to-b from-gray-800 to-gray-950'
//             titleColour = getValueIfUndefined(titleColour, 'text-neutral-200')
//             subtitleColour = getValueIfUndefined(subtitleColour, 'text-neutral-400')
//             break
//     }

//     outerContainerClass = getValueIfUndefined(outerContainerClass, `${containerBackground} ${containerPadding} rounded`)
//     innerContainerClass = getValueIfUndefined(innerContainerClass, containerAspectRatio)
//     titleClass = getValueIfUndefined(titleClass, `${titleSize} ${titleColour} ${titleWeight}`)
//     subtitleClass = getValueIfUndefined(subtitleClass, `${subtitleSize} ${subtitleColour} ${subtitleWeight}`)

//     d3
//         .select(`#${chartsContainerId}`)
//         .append('div')
//         .attr('class', outerContainerClass)
//         .append('div')
//         .attr('id', `${chartId}-container`)
//         .attr('class', innerContainerClass)
//         .call(g =>
//             chartTitle !== undefined ?
//                 g
//                     .append('h3')
//                     .attr('id', `${chartId}-title`)
//                     .attr('class', titleClass)
//                     .html(chartTitle)
//                 : g
//         )
//         .call(g =>
//             chartSubtitle !== undefined ?
//                 g
//                     .append('h4')
//                     .attr('id', `${chartId}-subtitle`)
//                     .attr('class', subtitleClass)
//                     .html(chartSubtitle)
//                 : g
//         )
//         .call(g =>
//             g
//                 .append('svg')
//                 .attr('id', chartId)
//         )

//     return chartId
// }

function getValueIfUndefined(variable: any, value: any) {
    return variable === undefined ? value : variable
}