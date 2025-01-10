import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { approveOrder } from "@/api/approve-order";
import { deliverOrder } from "@/api/deliver-order";
import { dispatchOrder } from "@/api/dispatch-order";

interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {

  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"]
    })
    ordersListCache?.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map(order => {
          if (order.orderId === orderId) {
            return {
              ...order, status
            }
          }
          return order
        }

        )
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusOnCache(orderId, 'canceled')
    },
  })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } = useMutation({
    mutationFn: approveOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusOnCache(orderId, 'processing')
    },
  })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } = useMutation({
    mutationFn: dispatchOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivering')
    },
  })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
    mutationFn: deliverOrder,
    onSuccess(_data, { orderId }) {
      updateOrderStatusOnCache(orderId, 'delivered')
    },
  })



  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button size={"xs"} variant={"outline"}>
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="text-xs font-mono font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(order.createdAt), {
        locale: ptBR,
        addSuffix: true
      })}</TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">{(order.total / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })}</TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button disabled={isApprovingOrder} onClick={() => approveOrderFn({ orderId: order.orderId })} variant={"outline"} size={"xs"}>
            <ArrowRight className="h-3 w-3 mr-2" />
            Aprovar
          </Button>
        )}
        {order.status === 'processing' && (
          <Button disabled={isDispatchingOrder} onClick={() => dispatchOrderFn({ orderId: order.orderId })} variant={"outline"} size={"xs"}>
            <ArrowRight className="h-3 w-3 mr-2" />
            Em entrega
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button disabled={isDeliveringOrder} onClick={() => deliverOrderFn({ orderId: order.orderId })} variant={"outline"} size={"xs"}>
            <ArrowRight className="h-3 w-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button onClick={() => cancelOrderFn({ orderId: order.orderId })} disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder} variant={"ghost"} size={"xs"}>
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}