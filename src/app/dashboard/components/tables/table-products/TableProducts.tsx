"use client";

import { useQueryProducts } from "@/app/dashboard/api/queries";
import { PenLine, Trash2 } from "lucide-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ProductTable } from "@/app/dashboard/interfaces";
import TableSkeleton from "../../skeleton/Skeleton";
import Image from "next/image";
import ModalDeleteProduct from "../../modals/modal-delete-product/ModalDeleteProduct";
import Input from "../../input/Input";
import { User } from "@/app/dashboard/hooks/useUser";
import Pagination from "../../pagination/Pagination";

const headers = [
  "Imagen",
  "Título",
  "Stock",
  "Precio",
  "Precio con descuento",
  "Descuento",
  /*   "Referencia", */
  /*   "Atributos", */
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
  const idElement = useRef(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const firstLoad = useRef(false);

  const [noResults, setNoResults] = useState(true);
  /*   const [attributeSelect, setAttributeSelect] = useState<
    Record<string | number, string>
  >({}); */

  const { data, refetch, isFetching } = useQueryProducts(currentPage, search);

  /*   const addDynamicProperty = useCallback(
    (key: string | number, value: string) => {
      setAttributeSelect((prev) => ({ ...prev, [key]: value }));
    },
    []
  ); */

  /*   const attributesProducts = useCallback(
    (id: number) => attributeSelect[id] as TpeValue,
    [attributeSelect]
  ); */

  useEffect(() => {
    const total = data?.grandTotal;
    setNoResults(!total);
    if (!total) setSearch("");
  }, [data?.grandTotal, setSearch]);

  const handleChange = useCallback(
    (value: string) => {
      setSearch(value);
      firstLoad.current = true;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        refetch();
      }, 500);
    },
    [refetch, setSearch]
  );

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
  const openModal = (product: ProductTable) => {
    selectedItem.current = product;
    setActiveModal(true);
  };

  /*   const attributeList = useCallback((attribute: string) => {
    const parsed: ValuesAttributes = JSON.parse(attribute);
    return Object.values(parsed).every(
      (val) => Array.isArray(val) && val.length === 0
    );
  }, []); */

  /*   const renderAttributes = (product: ProductTable) => {
    const attrKey = attributesProducts(product.id);
    if (!attrKey)
      return (
        <span className="text-sm text-gray-600">Selecciona un atributo</span>
      );

    const parsedAttributes = JSON.parse(product.attributes);
    const values = parsedAttributes[attrKey];

    if (!values || !values.length) {
      return <span className="text-sm text-gray-600">Sin atributos</span>;
    }

    if (attrKey === "Color") {
      return values.map((item: { color: string }, idx: number) => (
        <div
          key={idx}
          style={{ backgroundColor: item.color }}
          className="rounded-full w-4 h-4"
        />
      ));
    }

    return values.map((item: string, idx: number) => (
      <div key={idx} className="burble-table">
        {item}
      </div>
    ));
  }; */

  return (
    <div className="min-h-screen bg-gray-50">
      <ModalDeleteProduct
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={() => setActive(false)}
        idElement={idElement.current}
        search={search}
      />

      <div className="mx-auto">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Productos</h2>
            <div className="flex items-center gap-2">
              <Input
                disabled={noResults}
                placeholder="Buscar por título"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
              />
              {data && `${data.total}/100`}
            </div>
          </div>

          {!isFetching && (
            <div className="container-table">
              {data?.products?.length ? (
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-t border-gray-200 bg-gray-50/50">
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          className="px-6 py-3 text-left text-gray-500 font-light text-sm"
                        >
                          <div>{header}</div>
                        </th>
                      ))}
                      <th className="px-6 py-3 text-right text-gray-500 font-light text-sm">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.products
                      .sort((a, b) => a.id - b.id)
                      .map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50/50 transition"
                        >
                          <td className="px-6 py-4">
                            <Image
                              src={product.image_product}
                              alt="Imagen del producto"
                              width={80}
                              height={80}
                              className="rounded-[5px] object-cover"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.title}
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className={`w-20 text-white rounded-lg text-sm p-1 text-center ${
                                product.stock ? "bg-[#118B50]" : "bg-[#e22451]"
                              }`}
                            >
                              {product.stock ? "Si stock" : "No stock"}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.discount_price || "No aplica"}
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {product.discount}%
                          </td>
                          {/*         <td className="px-6 py-4 text-gray-600">
                            {product.reference || "---"}
                          </td> */}
                          {/*                           <td className="px-3 w-0">
                            <div className="flex gap-2 items-center">
                              {attributeList(product.attributes) ? (
                                <span className="text-sm text-gray-600 ml-3">
                                  Sin atributos
                                </span>
                              ) : (
                                <>
                                  <div className="container-attributes">
                                    {renderAttributes(product)}
                                  </div>
                                  <DropdownMenu
                                    id={product.id}
                                    addDynamicProperty={addDynamicProperty}
                                    itemSelected={attributesProducts(
                                      product.id
                                    )}
                                    menuItems={menuAttribute(
                                      JSON.parse(product.attributes)
                                    )}
                                  />
                                </>
                              )}
                            </div>
                          </td> */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3 overflow-auto">
                              {product.images.length ? (
                                product.images.map((img, i) => (
                                  <Image
                                    key={i}
                                    src={img}
                                    alt={"Imagen " + i}
                                    width={40}
                                    height={40}
                                    className="rounded-lg object-cover"
                                  />
                                ))
                              ) : (
                                <span>Sin imágenes</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {userLogin?.role === "viewer" ? (
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
                                  onClick={() => {
                                    setActive(true);
                                    idElement.current = product.id;
                                  }}
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
            {isFetching ? (
              <TableSkeleton columns={10} />
            ) : (
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
      </div>
    </div>
  );
};

export default TableProducts;
