import { useQueryProducts } from "@/app/dashboard/api/queries";
import { BadgePercent, PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ProductTable,
  TpeValue,
  ValuesAttributes,
} from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import Image from "next/image";
import ModalDeleteProduct from "../../modals/modal-delete-product/ModalDeleteProduct";
import DropdownMenu from "../../dropdown-menu/DropdownMenu";
import Input from "../../input/Input";
import { menuAttribute } from "@/app/dashboard/functions";
import { User } from "@/app/dashboard/hooks/useUser";

const headers = [
  "Imagen",
  "Título",
  "Stock",
  "Precio",
  "Precio",
  "Descuento",
  "Referencia",
  "Atributos",
  "Imagenes",
];
interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedItem: MutableRefObject<ProductTable | undefined>;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  search: string;
  userLogin?: User;
  setSearch: Dispatch<SetStateAction<string>>;
}

const TableProducts = ({
  currentPage,
  setCurrentPage,
  selectedItem,
  setActiveModal,
  setSearch,
  userLogin,
  search,
}: Props) => {
  const [active, setActive] = useState(false);
  const firstLoad = useRef(false);
  const idElement = useRef(0);
  const { data, refetch, isFetching } = useQueryProducts(currentPage, search);
  const [noResults, setNoResults] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [attributeSelect, setAttributeSelect] = useState<
    Record<string | number, string>
  >({});

  const addDynamicProperty = (key: string | number, value: string) => {
    setAttributeSelect((prevState) => ({ ...prevState, [key]: value }));
  };

  useEffect(() => {
    if (data?.grandTotal) {
      setNoResults(false);
    } else {
      setNoResults(true);
      setSearch("");
    }
  }, [data?.grandTotal]);

  const attributesProducts = useCallback(
    (id: number) => {
      return attributeSelect[id] as TpeValue;
    },
    [attributeSelect]
  );

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

  const openModal = (product: ProductTable) => {
    setActiveModal(true);
    selectedItem.current = product;
  };

  const attributeList = (attribute: string) => {
    const attributes: ValuesAttributes = JSON.parse(attribute);
    const areAllPropertiesEmpty = Object.values(attributes).every(
      (value) => Array.isArray(value) && value.length === 0
    );
    return areAllPropertiesEmpty;
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
      <ModalDeleteProduct
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
              <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
              <div className="flex gap-2 items-center">
                <Input
                  disabled={noResults}
                  placeholder="Buscar por título"
                  value={search}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {data && data?.total + "/" + 100}
              </div>
            </div>
          </div>
          {!isFetching && (
            <div className="container-table">
              {data && !isFetching && data?.products.length ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-t border-gray-200 bg-gray-50/50">
                      {headers.map((header, index) => (
                        <th key={index} className="px-6 py-3 text-left">
                          <div className="flex items-center gap-2 font-medium text-gray-500">
                            {header}
                            {index === 4 && <BadgePercent size={15} />}
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
                    {data.products
                      .sort((a, b) => a.id - b.id)
                      .map((product) => (
                        <tr
                          key={product.id}
                          className="group hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="skeleton-loader-image">
                              <img
                                src={product.image_product}
                                alt="Imagen del producto"
                                width={80}
                                height={80}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                className="rounded-[5px]"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600 w-36 block">
                              {product.title}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.stock ? (
                                <div className="w-20 bg-[#118B50] text-white rounded-lg text-sm p-1">
                                  Con stock
                                </div>
                              ) : (
                                <div className="w-20 bg-[#F72C5B] text-white rounded-lg text-sm p-1">
                                  Sin stock
                                </div>
                              )}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.price}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.discount_price !== ""
                                ? product.discount_price
                                : "---"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.discount + "%"}
                            </span>
                          </td>

                          {/*       <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.description.length < 60
                                ? product.description
                                : product.description.slice(0, 60) + " ..."}
                            </span>
                          </td> */}

                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              {product.reference !== ""
                                ? product.reference
                                : "---"}
                            </span>
                          </td>

                          <td className="px-3 w-0">
                            <div className="flex items-center justify-between gap-2">
                              {attributeList(product.attributes) ? (
                                <div className="w-[150px] ml-3">
                                  <span className="text-gray-600 text-sm">
                                    Sin atributos
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  {attributesProducts(product.id) ? (
                                    <div className="container-attributes">
                                      {attributesProducts(product.id) ===
                                      "Color"
                                        ? JSON.parse(product.attributes)[
                                            attributesProducts(product.id)
                                          ]?.map(
                                            (
                                              item: { color: string },
                                              index: number
                                            ) => (
                                              <div
                                                key={index}
                                                style={{
                                                  backgroundColor: item.color,
                                                }}
                                                className={`rounded-full w-4 h-4`}
                                              />
                                            )
                                          )
                                        : JSON.parse(product.attributes)[
                                            attributesProducts(product.id)
                                          ]?.map(
                                            (item: string, index: number) => (
                                              <div
                                                key={index}
                                                className="burble-table"
                                              >
                                                {item}
                                              </div>
                                            )
                                          )}
                                    </div>
                                  ) : (
                                    <div className="w-[150px] ml-3">
                                      <span className="text-gray-600 text-sm">
                                        Selecciona un atributo
                                      </span>
                                    </div>
                                  )}

                                  <DropdownMenu
                                    id={product.id}
                                    addDynamicProperty={addDynamicProperty}
                                    itemSelected={attributesProducts(
                                      product.id
                                    )}
                                    menuItems={menuAttribute(
                                      JSON.parse(
                                        product.attributes
                                      ) as ValuesAttributes
                                    )}
                                  />
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 overflow-auto">
                              {product.images.length ? (
                                product.images.map(
                                  (image: string, index: number) => (
                                    <div
                                      className="skeleton-loader-image-table"
                                      key={index}
                                    >
                                      <Image
                                        priority
                                        src={image}
                                        alt="Imagen del producto"
                                        width={40}
                                        height={40}
                                        style={{
                                          width: 40,
                                          height: 40,
                                          objectFit: "cover",
                                        }}
                                        className="rounded-lg"
                                      />
                                    </div>
                                  )
                                )
                              ) : (
                                <span>Sin imagenes</span>
                              )}
                            </div>
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
                                  onClick={() => openModal(product)}
                                />
                                <Trash2
                                  size={17}
                                  color="#FA4032"
                                  className="cursor-pointer"
                                  onClick={() => onOpen(product.id)}
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
                  <h1 className="text-slate-400">No hay productos</h1>
                </div>
              )}
            </div>
          )}

          <div className="border-t border-gray-200 px-6 py-4">
            {isFetching && <TableSkeleton columns={10} />}
            <p className="text-sm text-gray-500">
              Mostrando {data?.products.length || 0} de {data?.total || 0}{" "}
              productos
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

export default TableProducts;
