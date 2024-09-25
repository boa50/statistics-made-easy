import type { MetaFunction } from "@vercel/remix"
import Histogram from "~/charts/Histogram"
import Header from "~/components/Header"

export const meta: MetaFunction = () => {
    return [
        { title: "Mean Median Mode" },
        { name: "description", content: "Mean Median Mode" },
    ]
}

export default function Index() {
    const scores = [...Array(1000).keys()].map(d => Math.random() * 100)

    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <Header title={'Mean Median Mode'} />
            <div id="charts" className="grid lg:grid-cols-2 gap-4">
                <div className="mx-2 md:mx-8">
                    <Histogram data={scores} />
                </div>
            </div>
            <div id="caption" className="leading-none flex justify-end m-2">
                <span className="text-sm text-gray-500">Source: </span>
            </div>
        </div>
    )
}
