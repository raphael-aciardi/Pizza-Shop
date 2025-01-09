import { api } from "@/lib/axios";

export interface GetMonthCancledOrdersAmountResponse {
    amount: number
    diffFromLastMonth: number
}
export async function getDayOrdersAmount() {
    const response = await api.get<GetMonthCancledOrdersAmountResponse>('/metrics/month-canceled-orders-amount') 
    return response.data
}