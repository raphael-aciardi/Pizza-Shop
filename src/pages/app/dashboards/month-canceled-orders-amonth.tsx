import { getCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amont";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function MonthCanceledOrdersAmonthCard() {

  const { data: amonthCanceledOrdersAmount } = useQuery({
    queryFn: getCanceledOrdersAmount,
    queryKey: ['metrics', 'month-canceled-orders-amount']
  })

  return (
    <Card>
      <CardHeader className="flex-row  items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Cancelamentos (mês)</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-2">
        {amonthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {amonthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              {amonthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {amonthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{amonthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                </>
              )}
              em relação ao mês passado
            </p>

          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}