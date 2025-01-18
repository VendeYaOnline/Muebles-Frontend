import { CircleX } from "lucide-react";
import classes from "./ModalCarousel.module.css";
import {
  ChangeEvent,
  FormEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useMutationCarousel,
  useMutationUpdatedCarousel,
} from "@/app/dashboard/api/mutations";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { Products } from "@/app/dashboard/interfaces";
import { useQueryProductsSearchByCategory } from "@/app/dashboard/api/queries";
import toast from "react-hot-toast";
import { Tooltip } from "../../tooltip/Tooltip";
import SelectCategories from "../../select-categories/SelectCategories";
import SelectProductsDiscount from "../../select-products-discount/SelectProductsDiscount";

interface Props {
  currentPage: number;
  selectedItem?: MutableRefObject<
    | {
        id: number;
        name: string;
        products: Products[];
      }
    | undefined
  >;
  active: boolean;
  refetch: () => void;
  onClose: () => void;
}

const ModalCarousel = ({
  selectedItem,
  active,
  onClose,
  refetch: refetchTable,
}: Props) => {
  const [selectedProduct, setSelectProduct] = useState<Products[]>([]);
  const firstLoad = useRef(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { mutateAsync, isPending } = useMutationCarousel();
  const { mutateAsync: mutateAsyncUpdated, isPending: isPendingUpdated } =
    useMutationUpdatedCarousel();
  const { data, refetch, isFetching } = useQueryProductsSearchByCategory(
    currentPage,
    searchInput,
    categories
  );

  useEffect(() => {
    if (selectedProduct.length > 2 && name !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedProduct, name]);

  useEffect(() => {
    if (selectedItem?.current) {
      setName(selectedItem.current.name);
      setSelectProduct(selectedItem.current.products);
      data?.products.concat(selectedItem.current.products);
    }
  }, [selectedItem?.current]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItem?.current) {
      try {
        const idsProducts = selectedProduct.map((i) => i.id);
        await mutateAsyncUpdated({
          id: selectedItem.current.id,
          name,
          idsProducts,
        });
        refetchTable();
        onClose();
        setSearchInput("");
        setSelectProduct([]);
        setCategories([]);
        setProducts([]);
        setName("");
        toast.success("Carrusel actualizado");
      } catch (error: any) {
        if (
          error?.response?.data?.message === "This product is already featured"
        ) {
          toast.error("Este carrusel ya está creado");
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
          toast.error("Error inesperado al crear el carrusel");
        }
      }
    } else {
      try {
        const idsProducts = selectedProduct.map((i) => i.id);
        await mutateAsync({
          name,
          idsProducts,
        });
        refetchTable();
        onClose();
        setSearchInput("");
        setSelectProduct([]);
        setCategories([]);
        setProducts([]);
        setName("");
        toast.success("Carrusel creado");
      } catch (error: any) {
        if (
          error?.response?.data?.message === "This product is already featured"
        ) {
          toast.error("Este carrusel ya está creado");
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
          toast.error("Error inesperado al crear el carrusel");
        }
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 30) {
      setSearchInput(e.target.value);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        refetch();
      }, 500);
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      refetch();
    } else {
      firstLoad.current = true;
    }
  }, [categories, refetch]);

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
                setCategories([]);
                setSelectProduct([]);
                setProducts([]);
                setName("");
              }}
            />
            <h1 className="font-bold text-xl">
              {selectedItem?.current
                ? "Editar carrusel de promociones"
                : "Crear carrusel de promociones"}
            </h1>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-600">Nombre de carrusel</label>
            <Input
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-600">Buscar por título</label>
            <Input value={searchInput} onChange={onChange} />
          </div>

          <SelectCategories
            label="Buscar por categorias"
            categories={categories}
            setCategories={setCategories}
          />

          <div className="flex gap-1 flex-col">
            <div className="flex gap-2 items-center">
              <label className="text-slate-600">Productos</label>
              <Tooltip text="Solo se mostrarán los productos que tengan un descuento aplicado y que no estén asociados previamente a un carrusel" />
            </div>

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
            <SelectProductsDiscount
              data={data}
              products={products}
              setProducts={setProducts}
              selectedItem={selectedItem}
              value={selectedProduct}
              setValue={setSelectProduct}
              isFetching={isFetching}
              placeholder="Selecciona un producto"
            />
          </div>
          <p className="text-xs text-slate-600">
            Mínimo 3 productos y máximo 8 productos por carrusel
          </p>
          <Button disabled={disabled || isPending}>
            {isPending || isPendingUpdated ? (
              <div className="loader" />
            ) : selectedItem?.current ? (
              "Guardar cambios"
            ) : (
              "Crear carrusel"
            )}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalCarousel;
