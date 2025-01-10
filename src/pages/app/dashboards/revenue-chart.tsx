import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import color from "tailwindcss/colors";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid
} from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getDailyRevenueInPeriod } from "@/api/get-daily-revenue-in-period";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Loader2 } from "lucide-react";

export function RevenueChart() {

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () => getDailyRevenueInPeriod({
      from: dateRange?.from,
      to: dateRange?.to
    }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map(chartItem => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>
            Receita diária no período
          </CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>
            Preíodo
          </Label>
          <DateRangePicker date={dateRange} onDateChange={setDateRange} />
        </div>

      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={dailyRevenueInPeriod} style={{ fontSize: "12px" }}>
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                width={90}
                stroke="#888"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })
                }
              />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                stroke={color.purple[400]}
                type="linear"
                strokeWidth={2}
                dataKey="receipt"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
