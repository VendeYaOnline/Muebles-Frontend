import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useQuerySales } from "@/app/dashboard/api/queries";
import { Eye, PenLine, Trash2, X } from "lucide-react";

import TableSkeleton from "../../skeleton/Skeleton";
import { User } from "@/app/dashboard/hooks/useUser";
import DatePicker from "react-datepicker";
import SelectId from "../../select-id/SelectId";
import IconCreditCard from "./imgs/credit_card.png";
import IconDebitCard from "./imgs/debit_card.png";
import IconaAcountMoney from "./imgs/account_money.png";
import IconBankTransfer from "./imgs/bank_transfer.png";
import IconTicket from "./imgs/ticket.png";
import IconCash from "./imgs/cash.png";
import IconOther from "./imgs/other.png";
import IconBbva from "./imgs/bbva.svg";
import IconBancolombia from "./imgs/bancolombia.svg";
import {
  ModalChangeStatus,
  ModalDeleteSale,
  ModalDetailsSale,
} from "../../modals";
import { SaleTable } from "@/app/dashboard/interfaces";
import Image from "next/image";

const headers = [
  "Fecha",
  "Ciudad",
  "Teléfono",
  "Estado",
  "Número de orden",
  "Método de pago",
];
interface Props {
  query: {
    date: Date | null;
    status: string;
  };
  setQuery: Dispatch<
    SetStateAction<{
      date: Date | null;
      status: string;
    }>
  >;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  userLogin?: User;
}

const TableSales = ({
  query,
  setQuery,
  currentPage,
  setCurrentPage,
  userLogin,
}: Props) => {
  const [active, setActive] = useState(false);
  const idElement = useRef(0);
  const [sale, setSale] = useState<SaleTable>();
  const isRemoveDate = useRef(false);
  const { data, refetch, isFetching } = useQuerySales(currentPage, query);
  const [activeModalStatus, setActiveModalStatus] = useState(false);
  // * Lógica para cambiar de página
  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClose = () => {
    setActive(false);
  };

  const onOpen = (id: number) => {
    setActive(true);
    idElement.current = id;
  };

  const onOpenStatus = (id: number) => {
    setActiveModalStatus(true);
    idElement.current = id;
  };

  const handleDate = (value: Date | null) => {
    setQuery((prev) => ({
      ...prev,
      date: value,
    }));
  };

  const handleStatus = (value: string) => {
    setQuery((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const paymentMethod = (type: string) => {
    switch (type) {
      case "ticket":
        return "Efecty";
      case "bank_transfer":
        return "PSE";
      case "bank_transfer_bancolombia":
        return "Transferencia Bancolombia";
      case "bank_transfer_bbva":
        return "Transferencia BBVA";
      case "account_money":
        return "Cuenta de mercado pago";
      case "debit_card":
        return "Tarjeta de débito";
      case "credit_card":
        return "Tarjeta de crédito";
      case "cash":
        return "Efectivo";
      default:
        return "Otro medio de pago";
    }
  };

  // ** Optimización del useEffect para refetch con cambios en los filtros
  useEffect(() => {
    refetch();
  }, [query, currentPage, refetch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteSale
        refetch={refetch}
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={onClose}
        idElement={idElement.current}
      />
      <ModalDetailsSale sale={sale} onClose={() => setSale(undefined)} />
      <ModalChangeStatus
        active={activeModalStatus}
        idElement={idElement.current}
        onClose={() => {
          idElement.current = 0;
          setActiveModalStatus(false);
        }}
        refetch={refetch}
      />
      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Ventas</h2>
              <div className="flex items-center">
                <div className="w-56 mr-5">
                  <SelectId
                    id="status-search"
                    value={query.status}
                    setValue={(value) => handleStatus(value)}
                    data={[
                      { id: 1, name: "Pago pendiente" },
                      { id: 2, name: "Gestionando pedido" },
                      { id: 3, name: "En tránsito" },
                      { id: 4, name: "Pedido entregado" },
                    ]}
                    placeholder="Buscar por estado"
                  />
                </div>

                <DatePicker
                  disabled={isFetching || !data?.sales.length}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Buscar por fecha"
                  locale="es"
                  popperClassName="custom-datepicker-popup"
                  selected={query.date}
                  onChange={handleDate}
                  className="border border-[#7350f381] focus:border-[#6439ff] focus:outline-none rounded-[5px] p-[6px]"
                />
                {query.date && (
                  <X
                    className="mx-2 cursor-pointer"
                    size={16}
                    color="gray"
                    onClick={() => {
                      setQuery((prev) => ({ ...prev, date: null }));
                      isRemoveDate.current = true;
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {!isFetching && (
            <div className="container-table">
              {data && !isFetching && data?.sales.length ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-t border-gray-200 bg-gray-50/50">
                      {headers.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-left">
                          <div className="flex items-center gap-2 font-medium text-gray-500">
                            {header}
                          </div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right">
                        <span className="font-medium text-gray-500">
                          Acciones
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {data.sales.map((sale) => (
                      <tr
                        key={sale.id}
                        className="group hover:bg-gray-50/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="text-gray-600">
                            {sale.purchase_date}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-gray-600">{sale.city}</span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-gray-600">{sale.phone}</span>
                        </td>

                        <td className="px-6 py-4">
                          {sale.status === "Pago pendiente" && (
                            <span
                              className="bg-red-100 text-red-800
 text-sm p-1 px-2 rounded-lg block w-[127.5px] text-center"
                            >
                              {sale.status}
                            </span>
                          )}

                          {sale.status === "Gestionando pedido" && (
                            <span
                              className="bg-orange-100 text-orange-800
 text-sm p-1 px-2 rounded-lg block w-40"
                            >
                              {sale.status}
                            </span>
                          )}

                          {sale.status === "En tránsito" && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm p-1 px-2 rounded-lg">
                              {sale.status}
                            </span>
                          )}

                          {sale.status === "Pedido entregado" && (
                            <span
                              className="bg-green-100 text-green-800
 text-sm p-1 px-2 rounded-lg"
                            >
                              {sale.status}
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">{sale.order_number}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          {paymentMethod(sale.payment_method)}
                          {sale.payment_method === "credit_card" && (
                            <Image
                              src={IconCreditCard}
                              width={25}
                              alt="credit_card"
                            />
                          )}

                          {sale.payment_method === "debit_card" && (
                            <Image
                              src={IconDebitCard}
                              width={25}
                              alt="debit_card"
                            />
                          )}

                          {sale.payment_method === "bank_transfer" && (
                            <Image
                              src={IconBankTransfer}
                              width={25}
                              alt="bank_transfer"
                            />
                          )}

                          {sale.payment_method ===
                            "bank_transfer_bancolombia" && (
                            <Image
                              src={IconBancolombia}
                              width={25}
                              alt="bank_transfer_bancolombia"
                            />
                          )}

                          {sale.payment_method === "bank_transfer_bbva" && (
                            <Image
                              src={IconBbva}
                              width={30}
                              alt="bank_transfer_bbva"
                            />
                          )}

                          {sale.payment_method === "ticket" && (
                            <Image src={IconTicket} width={45} alt="ticket" />
                          )}

                          {sale.payment_method === "account_money" && (
                            <Image
                              src={IconaAcountMoney}
                              width={25}
                              alt="account_money"
                            />
                          )}

                          {sale.payment_method === "cash" && (
                            <Image src={IconCash} width={20} alt="cash" />
                          )}

                          {sale.payment_method === "other" && (
                            <Image src={IconOther} width={23} alt="other" />
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          {userLogin?.role &&
                          ["viewer"].includes(userLogin.role) ? (
                            <div className="flex justify-end gap-3">
                              <Eye size={17} color="#3d530047" />
                              {sale.type_purchase === "local" && (
                                <Trash2 size={17} color="#fa3f3282" />
                              )}
                            </div>
                          ) : (
                            <div className="flex justify-end gap-3">
                              <Eye
                                size={17}
                                className="cursor-pointer"
                                onClick={() => setSale(sale)}
                              />
                              <PenLine
                                size={17}
                                color="#3D5300"
                                className="cursor-pointer"
                                onClick={() => onOpenStatus(sale.id)}
                              />
                              {sale.type_purchase === "local" && (
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                  onClick={() => onOpen(sale.id)}
                                />
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 h-10">
                  <h1 className="text-slate-400">No hay ventas</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton columns={10} />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.sales.length || 0} de {data?.total || 0} ventas
            </p>
          </div>
        </div>
        {!isFetching && data && data.totalPages > 0 && (
          <nav className="flex items-center justify-center space-x-2 mt-4">
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Anterior
            </button>

            {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
              <button
                key={index}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? "text-white bg-indigo-600"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none"
              onClick={handleNextPage}
              disabled={currentPage === data.totalPages}
            >
              Siguiente
            </button>
          </nav>
        )}
      </div>
    </div>
  );
};

export default TableSales;
