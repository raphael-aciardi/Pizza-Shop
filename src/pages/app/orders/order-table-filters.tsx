import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { string, z } from "zod";

const orderFilterSchema = z.object({
  orderId: string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional()
})

type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters() {

  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { control, register, handleSubmit, reset } = useForm<OrderFilterSchema>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customerName: customerName ?? '',
      status: status ?? 'all',
    }
  })

  function handleFilter( { orderId, customerName: customerName, status } : OrderFilterSchema) {
    setSearchParams(state => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customerName) {
        state.set('customerName', customerName)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')

      return state
    })
  }

  function handlerClearFilters() {
    setSearchParams(state => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')
      return state
    })

    reset({
      orderId: '',
      customerName: '',
      status: 'all'
  })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="font-semibold text-sm">Filtros</span>
      <Input placeholder="ID do pedido" className="h-8 w-[320px]" {...register('orderId')} />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register('customerName')} />

      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select defaultValue="all" name={name} value={value} onValueChange={onChange} disabled={disabled}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="canceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em entrega</SelectItem>
              <SelectItem value="delivred">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      >

      </Controller>

      <Button variant={"secondary"} type="submit" className="h-8 ml-1" size={"xs"}>
        <Search className="h-4 w-4 mr-2" />
        Filtrar Resultados
      </Button>
      <Button onClick={handlerClearFilters} variant={"outline"} type="button" className="h-8 ml-1" size={"xs"}>
        <X className="h-4 w-4 mr-2" />
        Remover Filtros
      </Button>
    </form>
  )
}