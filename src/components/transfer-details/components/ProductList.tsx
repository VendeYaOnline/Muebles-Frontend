"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductSale } from "@/app/dashboard/interfaces";
import { calculateTotal } from "@/utils";

interface Props {
  products: ProductSale[];
  total: string;
}

const ProductList = ({ products, total }: Props) => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead className="text-right">Precio</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead className="text-right">Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.title}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">{product.quantity}</TableCell>
              <TableCell className="text-right">
                {calculateTotal(
                  product.discount_price
                    ? product.discount_price
                    : product.price,
                  product.quantity
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="text-right font-semibold text-lg">Total: {total}</div>
    </div>
  );
};

export default ProductList;
