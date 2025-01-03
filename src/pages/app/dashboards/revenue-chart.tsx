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

export function RevenueChart() {
  const data = [
    { date: '10/12', revenue: 1200 },
    { date: '11/12', revenue: 800 },
    { date: '12/12', revenue: 900 },
    { date: '13/12', revenue: 400 },
    { date: '14/12', revenue: 2300 },
    { date: '15/12', revenue: 800 },
    { date: '16/12', revenue: 640 },
  ];

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
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: "12px" }}>
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
              dataKey="revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
