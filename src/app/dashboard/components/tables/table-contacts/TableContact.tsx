import { useQueryContacts } from "@/app/dashboard/api/queries";
import { Eye, PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Contacts } from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import { ModalDeleteAttribute } from "../../modals";
import Input from "../../input/Input";
import { User } from "@/app/dashboard/hooks/useUser";
import Pagination from "../../pagination/Pagination";
import ModalDeleteContact from "../../modals/modal-delete-contact/ModalDeleteContact";

const headers = ["Asunto", "Email", "Mensaje"];
interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItem: MutableRefObject<Contacts | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  userLogin?: User;
}

const TableContact = ({
  currentPage,
  setCurrentPage,
  selectedItem,
  setActiveModal,
  setSearch,
  userLogin,
  search,
}: Props) => {
  const { data, isFetching, refetch } = useQueryContacts(currentPage, search);
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

  /*   const openModal = (attribute: AttributeData) => {
    setActiveModal(true);
    selectedItem.current = attribute;
  }; */

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
      <ModalDeleteContact
        currentPage={currentPage}
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
              <h2 className="text-lg font-semibold text-gray-900">Mensajes</h2>

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
              {data && data?.contacts.length ? (
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
                    {data.contacts
                      .sort((a, b) => a.id - b.id)
                      .map((contact) => (
                        <tr
                          key={contact.id}
                          className="group hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="font-medium text-gray-900">
                                {contact.subject}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {contact.email}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {contact.message.slice(0, 30)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {userLogin?.role &&
                            ["viewer"].includes(userLogin.role) ? (
                              <div className="flex justify-end gap-3">
                                <Eye size={17} color="#3d530047" />
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                />
                              </div>
                            ) : (
                              <div className="flex justify-end gap-3">
                                <Eye
                                  size={17}
                                  color="#3D5300"
                                  className="cursor-pointer"
                                />
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                  onClick={() => onOpen(contact.id)}
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
                  <h1 className="text-slate-400">No hay mensajes</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.contacts.length || 0} de {data?.total || 0}{" "}
              mensajes
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

export default TableContact;
