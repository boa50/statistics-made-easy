import type { SvgDims, Margin } from "~/aux/Interfaces"

interface Props {
    title: string
    children: React.ReactNode
    svgDims: SvgDims
    width: number
    height: number
    margin: Margin
}

const ChartContainer = ({ title, svgDims, width, height, margin, children }: Props) => {
    return (
        <div>
            <h2 className='font-semibold text-neutral-200 ml-4'>{title}</h2>
            <div style={{ position: 'relative' }}>
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