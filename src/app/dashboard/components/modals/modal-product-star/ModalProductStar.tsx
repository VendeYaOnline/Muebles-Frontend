import { CircleX } from "lucide-react";
import classes from "./ModalProductStar.module.css";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { useMutationCreateFeaturedProduct } from "@/app/dashboard/api/mutations";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { Products } from "@/app/dashboard/interfaces";
import SelectProducts from "../../select-products/SelectProducts";
import { useQueryProductsSearch } from "@/app/dashboard/api/queries";
import toast from "react-hot-toast";

interface Props {
  active: boolean;
  refetch: () => void;
  onClose: () => void;
}

const ModalProductStar = ({
  active,
  refetch: refetchFeatured,
  onClose,
}: Props) => {
  const [selectedProduct, setSelectProduct] = useState<Products>();
  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { mutateAsync, isPending } = useMutationCreateFeaturedProduct();
  const { data, refetch, isFetching } = useQueryProductsSearch(
    currentPage,
    searchInput
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (selectedProduct) {
        await mutateAsync(selectedProduct.id);
        refetchFeatured();
        onClose();
        setSearchInput("");
        setSelectProduct(undefined);
        toast.success("Producto destacado creado");
      }
    } catch (error: any) {
      if (
        error?.response?.data?.message === "This product is already featured"
      ) {
        toast.error("Este producto ya está destacado");
      } else if (error?.response?.data?.code === 403) {
        toast.error("Acción denegada");
      } else if (error?.message === "Network Error") {
        toast.error(
          "No se pudo conectar al servidor. Verifica tu conexión a internet."
        );
      } else if (error?.code === "ECONNABORTED") {
        toast.error(
          "La conexión está tardando demasiado. Inténtalo nuevamente."
        );
      } else if (error?.response?.status) {
        toast.error(
          `Error ${error.response.status}: ${
            error.response.statusText || "Error desconocido"
          }`
        );
      } else {
        toast.error("Error inesperado al crear el producto destacado");
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 30) {
      setSearchInput(e.target.value);
      firstLoad.current = true;

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        refetch();
        setSelectProduct(undefined);
      }, 500);
    }
  };

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form className={classes["form-modal"]} onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap gap-5">
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                setSearchInput("");
                setSelectProduct(undefined);
              }}
            />
            <h1 className="font-bold text-xl">Crear destacado</h1>
          </div>
          <label className="text-slate-600">Buscar por titulo</label>
          <Input value={searchInput} onChange={onChange} />
          {data && data.totalPages > 1 && (
            <nav className="flex items-center space-x-2">
              {Array.from({ length: data?.totalPages || 0 }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-5 h-5 rounded-md text-xs font-medium ${
                    currentPage === index + 1
                      ? "text-white bg-indigo-600"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          )}
          <label className="text-slate-600">Productos</label>
          <SelectProducts
            data={data}
            value={selectedProduct}
            setValue={setSelectProduct}
            placeholder="Selecciona un producto"
          />
          <div>{isFetching && <div className="loader-mini" />}</div>
          <br />
          <Button disabled={!selectedProduct || isPending}>
            {isPending ? (
              <div className="loader" />
            ) : (
              "Crear producto destacado"
            )}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalProductStar;
