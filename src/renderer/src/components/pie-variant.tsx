import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from "recharts"

import { formatPercentage } from "@renderer/lib/utils"
import { CategoryTooltip } from "./category-tooltip"

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354", "#00C49F", "#FFBB28"]

type Props = {
    data: {
        name: string
        value: number
    }[]
}

export const PieVariant = ({ data }: Props) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)

    const chartData = data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
        percent: total === 0 ? 0 : item.value / total,
    }))

    return (
        <>
            <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                    <Tooltip content={CategoryTooltip} />
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                    />
                </PieChart>
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
                            {formatPercentage(item.percent * 100)}
                        </span>
                    </div>
                ))}
            </div>
        </>
    )
}
