import { api } from "@/lib/axios";

export interface GetMonthOrdersamountResponse {
    amount: number
    diffFromYesterday: number
}
export async function getDayOrdersAmount() {
    const response = await api.get<GetMonthOrdersamountResponse>('/metrics/month-orders-amount') 
    return response.data
}