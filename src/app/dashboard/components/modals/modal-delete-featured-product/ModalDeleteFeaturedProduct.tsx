"use client";

import classes from "../ModalDelete.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryFeaturedProducts } from "@/app/dashboard/api/queries";
import { useMutationDeleteFeaturedProduct } from "@/app/dashboard/api/mutations";
import { calculatePageAfterDeletion } from "@/app/dashboard/functions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  active: boolean;
  onClose: () => void;
  idElement: number;
  refetch: VoidFunction;
  currentPage: number;
}

const ModalDeleteFeaturedProduct = ({
  setCurrentPage,
  totalItems,
  active,
  onClose,
  idElement,
  currentPage,
  refetch,
}: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteFeaturedProduct();

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync(idElement);
      refetch();
      setCurrentPage(
        calculatePageAfterDeletion(totalItems - 1, 10, currentPage)
      );
      toast.success("Producto destacado eliminado");
      onClose();
    } catch (error: any) {
      if (error?.response?.data?.code === 403) {
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
        toast.error("Error al eliminar el producto destacado");
      }
    }
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div className={classes["form-modal"]} onClick={handleFormClick}>
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={() => {
              onClose();
            }}
          />
          <h1 className="mb-2 font-bold">Eliminar producto destacado</h1>
          <p>¿Deseas eliminar este producto destacado?</p>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteFeaturedProduct;
