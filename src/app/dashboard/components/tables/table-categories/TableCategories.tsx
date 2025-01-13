import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import TableSkeleton from "../../skeleton/Skeleton";
import { User } from "@/app/dashboard/hooks/useUser";

import { ModalDeleteCategory } from "../../modals";
import Input from "../../input/Input";
import { PenLine, Trash2 } from "lucide-react";
import { CategoriesFind } from "@/app/dashboard/interfaces";

const headers = ["Nombre de la categoría"];
interface Props {
  data?: CategoriesFind;
  refetch: VoidFunction;
  isFetching: boolean;
  search: string;
  selectedItem: MutableRefObject<
    | {
        id: number;
        name: string;
      }
    | undefined
  >;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  userLogin?: User;
}

const TableCategories = ({
  data,
  refetch,
  isFetching,
  search,
  setSearch,
  selectedItem,
  currentPage,
  setActiveModal,
  userLogin,
  setCurrentPage,
}: Props) => {
  const [active, setActive] = useState(false);
  const idElement = useRef(0);
  const firstLoad = useRef(false);
  const [noResults, setNoResults] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  const openModal = (category: { id: number; name: string }) => {
    setActiveModal(true);
    selectedItem.current = category;
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

  useEffect(() => {
    if (data?.grandTotal) {
      setNoResults(false);
    } else {
      setNoResults(true);
      setSearch("");
    }
  }, [data?.grandTotal]);

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteCategory
        refetch={refetch}
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={onClose}
        idElement={idElement.current}
      />
      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Categorias
              </h2>
              <div className="flex gap-2 items-center">
                <Input
                  disabled={noResults}
                  placeholder="Buscar por nombre"
                  value={search}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {data && data?.total + "/" + 50}
              </div>
            </div>
          </div>
          {!isFetching && (
            <div className="container-table">
              {data && !isFetching && data?.categories.length ? (
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
                    {data.categories.map((category) => (
                      <tr
                        key={category.id}
                        className="group hover:bg-gray-50/50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="text-gray-600">{category.name}</span>
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
                                onClick={() => openModal(category)}
                              />
                              <Trash2
                                size={17}
                                color="#FA4032"
                                className="cursor-pointer"
                                onClick={() => onOpen(category.id)}
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
                  <h1 className="text-slate-400">No hay categorias</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton columns={2} />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.categories.length || 0} de {data?.total || 0}{" "}
              categorias
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

export default TableCategories;
