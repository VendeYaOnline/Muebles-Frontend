import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useQuerySales } from "@/app/dashboard/api/queries";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Eye,
  PenLine,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import TableSkeleton from "../../skeleton/Skeleton";
import { User } from "@/app/dashboard/hooks/useUser";
import DatePicker from "react-datepicker";
import SelectId from "../../select-id/SelectId";
import {
  ModalChangeStatus,
  ModalDeleteSale,
  ModalDetailsSale,
} from "../../modals";
import { SaleTable } from "@/app/dashboard/interfaces";
import Pagination from "../../pagination/Pagination";

const headers = [
  "Fecha",
  "Ciudad",
  "Teléfono",
  "Estado",
  "Número de orden",
  "Método de pago",
];

interface Props {
  query: { date: Date | null; status: string };
  setQuery: Dispatch<SetStateAction<{ date: Date | null; status: string }>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  userLogin?: User;
}

const statusOptions = [
  { id: 1, name: "Pago pendiente" },
  { id: 2, name: "Gestionando pedido" },
  { id: 3, name: "En tránsito" },
  { id: 4, name: "Pedido entregado" },
];

// Badges separados
const PaymentMethodBadge = ({ method }: { method: string }) => {
  const labelMap: Record<string, string> = {
    bank_transfer: "Transferencia",
    credit_card: "Tarjeta de crédito",
    debit_card: "Tarjeta de débito",
    account_money: "Dinero en cuenta",
    cash: "Efectivo",
    ticket: "Efecty",
    other: "Otro medio de pago",
  };
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
      <CreditCard className="w-4 h-4 mr-1" />
      {labelMap[method] || "Otro medio de pago"}
    </span>
  );
};
const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<
    string,
    { bg: string; text: string; icon: JSX.Element }
  > = {
    "Pago pendiente": {
      bg: "bg-amber-100",
      text: "text-amber-800",
      icon: <Clock className="w-4 h-4 mr-1" />,
    },
    "Gestionando pedido": {
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: <ShoppingBag className="w-4 h-4 mr-1" />,
    },
    "En tránsito": {
      bg: "bg-purple-100",
      text: "text-purple-800",
      icon: <Truck className="w-4 h-4 mr-1" />,
    },
    "Pedido entregado": {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <CheckCircle className="w-4 h-4 mr-1" />,
    },
  };
  const { bg, text, icon } = config[status] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    icon: <Clock className="w-4 h-4 mr-1" />,
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}
    >
      {icon}
      {status}
    </span>
  );
};

const TableSales = ({
  query,
  setQuery,
  currentPage,
  setCurrentPage,
  userLogin,
}: Props) => {
  const [sale, setSale] = useState<SaleTable>();
  const idElement = useRef(0);
  const [activeDelete, setActiveDelete] = useState(false);
  const [activeStatusModal, setActiveStatusModal] = useState(false);

  const { data, refetch, isFetching } = useQuerySales(currentPage, query);

  const handleDate = (value: Date | null) => {
    setQuery((prev) => ({ ...prev, date: value }));
    setTimeout(refetch, 500);
  };

  const handleStatus = (value: string) => {
    setQuery((prev) => ({ ...prev, status: value }));
    setTimeout(refetch, 500);
  };

  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteSale
        currentPage={currentPage}
        active={activeDelete}
        onClose={() => setActiveDelete(false)}
        idElement={idElement.current}
        refetch={refetch}
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
      />

      <ModalDetailsSale sale={sale} onClose={() => setSale(undefined)} />

      <ModalChangeStatus
        active={activeStatusModal}
        idElement={idElement.current}
        onClose={() => {
          setActiveStatusModal(false);
          idElement.current = 0;
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
                    setValue={handleStatus}
                    data={statusOptions}
                    placeholder="Buscar por estado"
                  />
                </div>
                <DatePicker
                  disabled={isFetching}
                  selected={query.date}
                  onChange={handleDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Buscar por fecha"
                  locale="es"
                  className="border border-[#dbdbdb] focus:border-[#1b56fd] focus:outline-none rounded-[5px] p-[6px]"
                />
                {query.date && (
                  <X
                    size={16}
                    className="mx-2 cursor-pointer"
                    color="gray"
                    onClick={() =>
                      setQuery((prev) => ({ ...prev, date: null }))
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {!isFetching && data?.sales?.length ? (
            <div className="container-table">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-t border-gray-200 bg-gray-50/50">
                    {headers.map((h, i) => (
                      <th key={i} className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2 font-medium text-gray-500">
                          {h}
                        </div>
                      </th>
                    ))}
                    <th className="px-6 py-3 text-right text-gray-500 font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-600">
                        {sale.purchase_date}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{sale.city}</td>
                      <td className="px-6 py-4 text-gray-600">{sale.phone}</td>
                      <td className="py-4 min-w-48">
                        <StatusBadge status={sale.status} />
                      </td>
                      <td className="px-6 py-4">{sale.order_number}</td>
                      <td className="py-4 min-w-40">
                        <PaymentMethodBadge method={sale.payment_method} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        {userLogin?.role === "viewer" ? (
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
                              className="cursor-pointer text-gray-500"
                              onClick={() => setSale(sale)}
                            />
                            <PenLine
                              size={17}
                              className="cursor-pointer"
                              onClick={() => {
                                idElement.current = sale.id;
                                setActiveStatusModal(true);
                              }}
                            />
                            {sale.type_purchase === "local" && (
                              <Trash2
                                size={17}
                                className="cursor-pointer text-red-700"
                                onClick={() => {
                                  idElement.current = sale.id;
                                  setActiveDelete(true);
                                }}
                              />
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <TableSkeleton />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableSales;
