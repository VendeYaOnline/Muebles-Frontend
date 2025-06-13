import { CircleX } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

import classes from "./ModalProductStar.module.css";
import { useMutationCreateFeaturedProduct } from "@/app/dashboard/api/mutations";
import { useQueryProductsSearch } from "@/app/dashboard/api/queries";
import { Products } from "@/app/dashboard/interfaces";

import Input from "../../input/Input";
import Button from "../../button/Button";
import SelectProducts from "../../select-products/SelectProducts";

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
  const [selectedProduct, setSelectedProduct] = useState<Products>();
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { mutateAsync, isPending } = useMutationCreateFeaturedProduct();
  const { data, refetch, isFetching } = useQueryProductsSearch(
    currentPage,
    searchInput
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      await mutateAsync(selectedProduct.id);
      refetchFeatured();
      handleClose();
      toast.success("Producto destacado creado");
    } catch (error: any) {
      const message = error?.response?.data?.message;
      const code = error?.response?.data?.code;
      const status = error?.response?.status;
      const statusText = error?.response?.statusText;

      if (message === "This product is already featured") {
        toast.error("Este producto ya está destacado");
      } else if (code === 403) {
        toast.error("Acción denegada");
      } else if (error?.message === "Network Error") {
        toast.error(
          "No se pudo conectar al servidor. Verifica tu conexión a internet."
        );
      } else if (error?.code === "ECONNABORTED") {
        toast.error(
          "La conexión está tardando demasiado. Inténtalo nuevamente."
        );
      } else if (status) {
        toast.error(`Error ${status}: ${statusText || "Error desconocido"}`);
      } else {
        toast.error("Error inesperado al crear el producto destacado");
      }
    }
  };

  const handleClose = () => {
    onClose();
    setSearchInput("");
    setSelectedProduct(undefined);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 30) return;

    setSearchInput(value);
    firstLoad.current = true;
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      refetch();
      setSelectedProduct(undefined);
    }, 500);
  };

  if (!active) return null;
  return (
    <section className={classes["container-modal"]}>
      <form className={classes["form-modal"]} onSubmit={handleSubmit}>
        <div className="flex justify-between flex-wrap gap-5">
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={handleClose}
          />
          <h1 className="font-bold text-xl">Crear producto destacado</h1>
        </div>

        <label className="text-slate-600">Buscar por título</label>
        <Input value={searchInput} onChange={onChange} />

        {data && data.totalPages > 1 && (
          <nav className="flex items-center space-x-2">
            {Array.from({ length: data.totalPages }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`w-5 h-5 rounded-md text-xs font-medium ${
                  currentPage === index + 1
                    ? "text-white bg-blue-600"
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
          setValue={setSelectedProduct}
          placeholder="Selecciona un producto"
        />

        {isFetching && <div className="loader-mini" />}

        <br />
        <Button disabled={!selectedProduct || isPending}>
          {isPending ? <div className="loader" /> : "Crear producto"}
        </Button>
      </form>
    </section>
  );
};

export default ModalProductStar;
