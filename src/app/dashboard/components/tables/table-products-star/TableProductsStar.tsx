import { BadgePercent, Trash2 } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
  useMemo,
} from "react";
import {
  FeaturedProductRequest,
  TpeValue,
  ValuesAttributes,
} from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import Image from "next/image";
import DropdownMenu from "../../dropdown-menu/DropdownMenu";
import Input from "../../input/Input";
import ModalDeleteFeaturedProduct from "../../modals/modal-delete-featured-product/ModalDeleteFeaturedProduct";
import { menuAttribute } from "@/app/dashboard/functions";
import { User } from "@/app/dashboard/hooks/useUser";
import Pagination from "../../pagination/Pagination";

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
  search: string;
  data?: FeaturedProductRequest;
  setSearch: Dispatch<SetStateAction<string>>;
  refetch: () => void;
  userLogin?: User;
  isFetching: boolean;
}

const TableProductsStar = memo(
  ({
    currentPage,
    setCurrentPage,
    setSearch,
    isFetching,
    search,
    data,
    userLogin,
    refetch,
  }: Props) => {
    const [active, setActive] = useState(false);
    const idElement = useRef(0);
    const [attributeSelect, setAttributeSelect] = useState<
      Record<string | number, string>
    >({});
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
      if (!data?.grandTotal) setSearch("");
    }, [data?.grandTotal, setSearch]);

    const attributesProducts = useCallback(
      (id: any) => attributeSelect[id] as TpeValue,
      [attributeSelect]
    );

    const handleNextPage = useCallback(() => {
      if (currentPage < (data?.totalPages || 1)) {
        setCurrentPage(currentPage + 1);
      }
    }, [currentPage, data?.totalPages]);

    const handlePrevPage = useCallback(() => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }, [currentPage]);

    const onClose = () => setActive(false);

    const onOpen = (id: number) => {
      setActive(true);
      idElement.current = id;
    };

    const isEmptyAttributes = useCallback((attribute: string) => {
      const attributes: ValuesAttributes = JSON.parse(attribute);
      return Object.values(attributes).every(
        (value) => Array.isArray(value) && value.length === 0
      );
    }, []);

    const handleChange = useCallback(
      (value: string) => {
        setSearch(value);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => refetch(), 500);
      },
      [refetch, setSearch]
    );

    const addDynamicProperty = useCallback(
      (key: string | number, value: string) => {
        setAttributeSelect((prevState) => ({ ...prevState, [key]: value }));
      },
      []
    );

    const sortedProducts = useMemo(
      () => (data?.products || []).slice().sort((a, b) => a.id - b.id),
      [data?.products]
    );
    return (
      <div className="min-h-screen bg-gray-50">
        <ModalDeleteFeaturedProduct
          setCurrentPage={setCurrentPage}
          totalItems={data?.total || 0}
          active={active}
          onClose={onClose}
          idElement={idElement.current}
          currentPage={currentPage}
          refetch={refetch}
        />

        <div className="mx-auto">
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Productos
                </h2>
                <div className="flex gap-2 items-center">
                  <Input
                    disabled={!data?.grandTotal}
                    placeholder="Buscar por título"
                    value={search}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  {data && `${data?.total}/8`}
                </div>
              </div>
            </div>

            {!isFetching && (
              <div className="container-table">
                {sortedProducts.length ? (
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
                      {sortedProducts.map(({ product, id }) => (
                        <tr
                          key={id}
                          className="group hover:bg-gray-50/50 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <Image
                              src={product.image_product}
                              alt="Imagen del producto"
                              width={80}
                              height={80}
                              sizes="(max-width: 768px) 60px, 80px"
                              className="rounded-[5px] object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600 w-36 block">
                              {product.title}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-600">
                              <div
                                className={`w-20 text-white rounded-lg text-sm p-1 ${
                                  product.stock
                                    ? "bg-[#118B50]"
                                    : "bg-[#F72C5B]"
                                }`}
                              >
                                {product.stock ? "Con stock" : "Sin stock"}
                              </div>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.discount_price || "---"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.discount}%
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.reference || "---"}
                          </td>
                          <td className="px-3 w-0">
                            <div className="flex items-center justify-between gap-2">
                              {isEmptyAttributes(product.attributes) ? (
                                <div className="w-[150px] ml-3 text-sm text-gray-600">
                                  Sin atributos
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  {attributesProducts(id) ? (
                                    <div className="container-attributes">
                                      {JSON.parse(product.attributes)[
                                        attributesProducts(id)
                                      ]?.map((item: any, index: number) => (
                                        <div
                                          key={index}
                                          className={
                                            attributesProducts(id) === "Color"
                                              ? "rounded-full w-4 h-4"
                                              : "burble-table"
                                          }
                                          style={
                                            attributesProducts(id) === "Color"
                                              ? { backgroundColor: item.color }
                                              : {}
                                          }
                                        >
                                          {attributesProducts(id) !== "Color" &&
                                            item}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="w-[150px] ml-3 text-sm text-gray-600">
                                      Selecciona un atributo
                                    </div>
                                  )}
                                  <DropdownMenu
                                    id={id}
                                    addDynamicProperty={addDynamicProperty}
                                    itemSelected={attributesProducts(id)}
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
                                  (img: string, index: number) => (
                                    <Image
                                      src={img}
                                      key={index}
                                      alt={"Imagen" + index}
                                      width={40}
                                      height={40}
                                      sizes="(max-width: 768px) 32px, 40px"
                                      className="rounded-lg"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                      }} // 👈 Evita el warning
                                    />
                                  )
                                )
                              ) : (
                                <span>Sin imágenes</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-3">
                              <Trash2
                                size={17}
                                color={
                                  userLogin?.role === "viewer"
                                    ? "#fa3f3282"
                                    : "#FA4032"
                                }
                                className={
                                  userLogin?.role !== "viewer"
                                    ? "cursor-pointer"
                                    : ""
                                }
                                onClick={
                                  userLogin?.role !== "viewer"
                                    ? () => onOpen(id)
                                    : undefined
                                }
                              />
                            </div>
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
                productos destacados
              </p>
            </div>
          </div>
          {!isFetching && data && data.totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 1}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    );
  }
);

TableProductsStar.displayName = "TableProductsStar";

export default TableProductsStar;
