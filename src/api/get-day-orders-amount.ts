import { api } from "@/lib/axios";

export interface GetDayOrdersamountResponse {
    amount: number
    diffFromYesterday: number
}
export async function getDayOrdersAmount() {
    const response = await api.get<GetDayOrdersamountResponse>('/metrics/day-orders-amount') 
    return response.data
}