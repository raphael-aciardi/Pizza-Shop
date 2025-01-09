import { api } from "@/lib/axios";

export interface GetMonthOrdersamountResponse {
    amount: number
    diffFromLastMonth: number
}
export async function getMonthOrdersAmount() {
    const response = await api.get<GetMonthOrdersamountResponse>('/metrics/month-orders-amount') 
    return response.data
}