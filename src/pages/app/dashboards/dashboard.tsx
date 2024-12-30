
import { Helmet } from "react-helmet-async";
import { MonthRevenueCard } from "./month-revenue-card";
import { MonthOrdersAmonthCard } from "./month-orders-amonth-card";
import { DayOrdersAmonthCard } from "./day-orders-amonth-card";
import { MonthCanceledOrdersAmonthCard } from "./month-canceled-orders-amonth";
import { RevenueChart } from "./revenue-chart";
import { PopularProdutsChart } from "./popular-produts-chart";


export function Dashboard() {
  
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmonthCard />
          <DayOrdersAmonthCard />
          <MonthCanceledOrdersAmonthCard />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProdutsChart />
        </div>
      </div>
    </>
  )
}