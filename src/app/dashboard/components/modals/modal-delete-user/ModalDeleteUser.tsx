"use client";

import classes from "../ModalDelete.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useQueryUsers } from "@/app/dashboard/api/queries";
import { useMutationDeleteUser } from "@/app/dashboard/api/mutations";
import { calculatePageAfterDeletion } from "@/app/dashboard/functions";
import { Dispatch, SetStateAction } from "react";

interface Props {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  active: boolean;
  onClose: () => void;
  idElement: number;
  refetch: VoidFunction;
}

const ModalDeleteUser = ({
  currentPage,
  refetch,
  setCurrentPage,
  totalItems,
  active,
  onClose,
  idElement,
}: Props) => {
  const { mutateAsync, isPending } = useMutationDeleteUser();

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
        calculatePageAfterDeletion(totalItems - 1, 60, currentPage)
      );
      toast.success("Usuario eliminado");
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data.code === 403) {
        toast.error("Acción denegada");
      } else {
        toast.error("Error al eliminar el usuario");
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
          <h1 className="mb-2 font-bold">Eliminar usuario</h1>
          <p>¿Deseas eliminar este usuario?</p>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Si, eliminar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalDeleteUser;
