import {
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

import { formatCurrency } from "@renderer/lib/utils"
import { CategoryTooltip } from "./category-tooltip"

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354", "#00C49F", "#FFBB28"]

type Props = {
    data: {
        name: string
        value: number
    }[]
}

export const RadioVariant = ({ data }: Props) => {   
    const chartData = data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
    }))

    return (
        <>
            <ResponsiveContainer width="100%" height={280}>
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    barSize={10}
                    innerRadius="90%"
                    outerRadius="40%"
                    data={chartData}
                >
                    <Tooltip content={CategoryTooltip} />
                    <RadialBar
                        label={{
                            position: "insideStart",
                            fill: "#fff",
                            fontSize: "12px",
                        }}
                        background
                        dataKey="value"
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4">
                {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <span
                            className="size-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-sm text-muted-foreground">
                            {item.name}
                        </span>
                        <span className="text-sm font-medium">
                            {formatCurrency(item.value)}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}
