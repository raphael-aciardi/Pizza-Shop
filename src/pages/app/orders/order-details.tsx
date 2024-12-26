import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogDescription } from "@radix-ui/react-dialog";


export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido 7FadFA4fsf</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Detalhes do pedido
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Raphael Aciardi Fabricio
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (14) 99619-3248
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                14996193248ph@gmail.com
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Realizado há</TableCell>
              <TableCell className="flex justify-end">
                Há 3 minutos
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Qtd.</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Pizza de Peperoni Família</TableCell>
              <TableCell className="text-right">
                2
              </TableCell>
              <TableCell className="text-right">
                R$ 69,98
              </TableCell>
              <TableCell className="text-right">
                R$ 139,96
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pizza de Mussarela</TableCell>
              <TableCell className="text-right">
                2
              </TableCell>
              <TableCell className="text-right">
                R$ 59,98
              </TableCell>
              <TableCell className="text-right">
                R$ 119,80
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell className=" text-rightfont-medium">R$ 269,60</TableCell>
          </TableFooter>
        </Table>
      </div>

    </DialogContent>
  )
}