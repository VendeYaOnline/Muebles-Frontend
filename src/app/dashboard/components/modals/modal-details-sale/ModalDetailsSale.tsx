"use client";

import classes from "./ModalDetailsSale.module.css";
import { ArrowLeft, Eye, X } from "lucide-react";
import { SaleTable } from "@/app/dashboard/interfaces";
import { useState } from "react";
import { convertPrice } from "@/app/dashboard/functions";

interface Props {
  sale?: SaleTable;
  onClose: () => void;
}

const ModalDetailsSale = ({ sale, onClose }: Props) => {
  const [viewProducts, setViewProducts] = useState(false);
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setViewProducts(false);
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const getStatusStyles = (status: string): string => {
    switch (status) {
      case "En tránsito":
        return "bg-yellow-100 text-yellow-800";
      case "Gestionando pedido":
        return "bg-red-100 text-red-800";
      case "Pedido entregado":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    sale && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div className={classes["form-modal"]} onClick={handleFormClick}>
          {/* Header */}
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-white">
              Detalles de la venta
            </h2>
          </div>

          {/* Content */}
          {viewProducts ? (
            <div className={classes["container-details"]}>
              <div className="p-6 space-y-6">
                <div className="flex gap-2 items-center border-b pb-2">
                  <ArrowLeft
                    size={23}
                    strokeWidth={1.5}
                    onClick={() => setViewProducts(false)}
                    color="#35374B"
                    className="cursor-pointer"
                  />
                  <h3 className="text-lg font-medium text-gray-900">
                    Productos
                  </h3>
                </div>
                <div className="block text-sm">
                  {sale.products.map((product, index) => (
                    <div key={index} className="flex flex-col">
                      <img src={product.image_product} width={30} />
                      <span>
                        <strong>Producto: </strong>

                        {product.title}
                      </span>
                      <span>
                        <strong>Precio: </strong>

                        {product.price}
                      </span>
                      <span>
                        <strong>Descuento: </strong>

                        {product.discount + "%"}
                      </span>
                      <span>
                        <strong>Precio con descuento: </strong>

                        {product.discount_price
                          ? product.discount_price
                          : "No aplica"}
                      </span>
                      <span>
                        <strong>Cantidad: </strong>

                        {product.quantity}
                      </span>
                      <span>
                        <strong>Total de compra: </strong>
                        {convertPrice(product.purchase_total)}
                      </span>

                      {index < sale.products.length - 1 ? (
                        <hr className="my-3" />
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={classes["container-details"]}>
              <div className="p-6 space-y-6">
                {/* Grid layout for details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                      Información del cliente
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500">
                          Fecha de compra
                        </label>
                        <p className="text-gray-900">{sale.purchase_date}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">Nombres</label>
                        <p className="text-gray-900">{sale.first_name}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">
                          Apellidos
                        </label>
                        <p className="text-gray-900">{sale.last_name}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <p className="text-gray-900">{sale.email}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">
                          Número de cédula
                        </label>
                        <p className="text-gray-900">{sale.id_number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                      Ubicación
                    </h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">
                            Departamento
                          </label>
                          <p className="text-gray-900">{sale.department}</p>
                        </div>

                        <div>
                          <label className="text-sm text-gray-500">
                            Ciudad
                          </label>
                          <p className="text-gray-900">{sale.city}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">
                          Dirección
                        </label>
                        <p className="text-gray-900">{sale.address}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">
                          Referencias adicionales
                        </label>
                        <p className="text-gray-900">{sale.additional_info}</p>
                      </div>

                      <div>
                        <label className="text-sm text-gray-500">
                          Teléfono móvil
                        </label>
                        <p className="text-gray-900">{sale.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                    Detalles del pedido
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-gray-500">
                        Número de orden
                      </label>
                      <p className="text-gray-900 font-mono">
                        {sale.order_number}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Productos</label>
                      <Eye
                        size={16}
                        className="cursor-pointer"
                        onClick={() => setViewProducts(true)}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Cantidad</label>
                      <p className="text-gray-900">{sale.quantity}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Estado</label>
                      <br />
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${getStatusStyles(
                          sale.status
                        )}`}
                      >
                        {sale.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
};

export default ModalDetailsSale;
