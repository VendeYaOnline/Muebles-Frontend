import { useQueryAttribute } from "@/app/dashboard/api/queries";
import { PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AttributeData } from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import { ModalDeleteAttribute } from "../../modals";
import Input from "../../input/Input";
import { User } from "@/app/dashboard/hooks/useUser";

const headers = ["Nombre del atributo", "Tipo", "Valores"];
interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItem: MutableRefObject<AttributeData | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  userLogin?: User;
}

const TableAttribute = ({
  currentPage,
  setCurrentPage,
  selectedItem,
  setActiveModal,
  setSearch,
  userLogin,
  search,
}: Props) => {
  const { data, isFetching, refetch } = useQueryAttribute(currentPage, search);
  const [active, setActive] = useState(false);
  const idElement = useRef(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const firstLoad = useRef(false);
  const [noResults, setNoResults] = useState(true);

  useEffect(() => {
    if (data?.grandTotal) {
      setNoResults(false);
    } else {
      setNoResults(true);
      setSearch("");
    }
  }, [data?.grandTotal]);

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

  const openModal = (attribute: AttributeData) => {
    setActiveModal(true);
    selectedItem.current = attribute;
  };

  const handleChange = (value: string) => {
    setSearch(value);
    firstLoad.current = true;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetch();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteAttribute
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={onClose}
        idElement={idElement.current}
        search={search}
      />
      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Atributos</h2>

              <div className="flex gap-2 items-center">
                <Input
                  disabled={noResults}
                  placeholder="Buscar por nombre"
                  value={search}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {data && data?.total + "/" + 30}
              </div>
            </div>
          </div>

          {!isFetching && (
            <div className="overflow-x-auto">
              {data && data?.attributes.length ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-t border-gray-200 bg-gray-50/50">
                      {headers.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-left">
                          <div className="flex items-center gap-2 font-medium text-gray-500">
                            {header}
                            {/*   <ArrowUpDown className="h-4 w-4" /> */}
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
                    {data.attributes
                      .sort((a, b) => a.id - b.id)
                      .map((attribute) => (
                        <tr
                          key={attribute.id}
                          className="group hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">
                                {attribute.attribute_name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {attribute.attribute_type}
                            </span>
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            {attribute.value.map((item: any, index) => {
                              if (typeof item === "string") {
                                return (
                                  <div key={index} className="burble">
                                    {item}
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    key={index}
                                    style={{ backgroundColor: item.color }}
                                    className={`rounded-full w-4 h-4`}
                                  />
                                );
                              }
                            })}
                          </td>

                          <td className="px-6 py-4 text-right">
                            {userLogin?.role &&
                            ["viewer"].includes(userLogin.role) ? (
                              <div className="flex justify-end gap-3">
                                <PenLine size={17} color="#3d530047" />
                                <Trash2 size={17} color="#fa3f3282" />
                              </div>
                            ) : (
                              <div className="flex justify-end gap-3">
                                <PenLine
                                  size={17}
                                  color="#3D5300"
                                  className="cursor-pointer"
                                  onClick={() => openModal(attribute)}
                                />
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                  onClick={() => onOpen(attribute.id)}
                                />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 h-10">
                  <h1 className="text-slate-400">No hay atributos</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.attributes.length || 0} de {data?.total || 0}{" "}
              atributos
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

export default TableAttribute;
