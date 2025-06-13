import { useQueryUsers } from "@/app/dashboard/api/queries";
import { PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Users } from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import Input from "../../input/Input";
import { ModalDeleteUser } from "../../modals";
import { User } from "@/app/dashboard/hooks/useUser";
import Pagination from "../../pagination/Pagination";
const headers = ["Nombre del usuario", "Email", "Rol"];
interface Props {
  currentPage: number;
  userLogin?: User;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItem: MutableRefObject<Users | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TableUsers = ({
  currentPage,
  setCurrentPage,
  selectedItem,
  setActiveModal,
  userLogin,
  setSearch,
  search,
}: Props) => {
  const [active, setActive] = useState(false);

  const firstLoad = useRef(false);
  const idElement = useRef(0);
  const { data, refetch, isFetching } = useQueryUsers(currentPage, search);
  const [noResults, setNoResults] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

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

  const openModal = (product: Users) => {
    setActiveModal(true);
    selectedItem.current = product;
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
      <ModalDeleteUser
        currentPage={currentPage}
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
              <h2 className="text-lg font-semibold text-gray-900">Usuarios</h2>
              <div className="flex gap-2 items-center">
                <Input
                  disabled={noResults}
                  placeholder="Buscar por nombre"
                  value={search}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {data && data?.total + "/" + 20}
              </div>
            </div>
          </div>
          {!isFetching && (
            <div className="container-table">
              {data && !isFetching && data?.users.length ? (
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
                    {data.users
                      .sort((a, b) => a.id - b.id)
                      .map((user) => (
                        <tr
                          key={user.id}
                          className="group hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {user.username}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">{user.email}</span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {user.role === "editor" && (
                                <div className="w-14 text-center bg-[#FF8000] text-white rounded-lg text-sm p-1">
                                  Editor
                                </div>
                              )}

                              {user.role === "viewer" && (
                                <div className="w-24 text-center bg-[#118B50] text-white rounded-lg text-sm p-1">
                                  Espectador
                                </div>
                              )}

                              {user.role === "admin" && (
                                <div className="w-28 text-center bg-[#254ed5] text-white rounded-lg text-sm p-1">
                                  Administrador
                                </div>
                              )}
                            </span>
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
                                  onClick={() => openModal(user)}
                                />
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                  onClick={() => onOpen(user.id)}
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
                  <h1 className="text-slate-400">No hay usuarios</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton columns={4} />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.users.length || 0} de {data?.total || 0} usuarios
            </p>
          </div>
        </div>
        {!isFetching && data && data.totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            setCurrentPage={setCurrentPage}
            totalPages={data?.totalPages || 0}
          />
        )}
      </div>
    </div>
  );
};

export default TableUsers;
