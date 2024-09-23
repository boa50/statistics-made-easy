import type { MetaFunction } from "@vercel/remix"
import Histogram from "~/charts/Histogram"

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
            <h1>Mean Median Mode</h1>
            <Histogram data={scores} />
        </div>
    )
}
