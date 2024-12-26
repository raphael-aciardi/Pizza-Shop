import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";

// interface OrderTableRowProps {

// }

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
          <Button size={"xs"} variant={"outline"}>
            <Search className="h-3 w-3" />
            <span className="sr-only">Detalhes do pedido</span>
          </Button>
          </DialogTrigger>
            <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="text-xs font-mono font-medium">
        dvrh874fsg5rfa8ew64ret
      </TableCell>
      <TableCell className="text-muted-foreground">Há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Raphael Aciardi Fabricio</TableCell>
      <TableCell className="font-medium">R$ 149,98</TableCell>
      <TableCell>
        <Button variant={"outline"} size={"xs"}>
          <ArrowRight className="h-3 w-3 mr-2" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={"ghost"} size={"xs"}>
          <X className="h-3 w-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  )
}