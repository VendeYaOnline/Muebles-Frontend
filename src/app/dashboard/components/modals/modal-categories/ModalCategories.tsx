"use client";

import Button from "../../button/Button";
import classes from "./ModalCategories.module.css";
import { CircleX } from "lucide-react";
import Input from "../../input/Input";
import { FormEvent, MutableRefObject, useEffect, useState } from "react";
import {
  useMutationCategory,
  useMutationUpdatedCategory,
} from "@/app/dashboard/api/mutations";
import toast from "react-hot-toast";
import { useQueryCategories } from "@/app/dashboard/api/queries";
interface Props {
  refetch: VoidFunction;
  selectedItem: MutableRefObject<
    | {
        id: number;
        name: string;
      }
    | undefined
  >;
  active: boolean;
  onClose: () => void;
}

const ModalCategories = ({ selectedItem, active, onClose, refetch }: Props) => {
  const { mutateAsync, isPending } = useMutationCategory();
  const { mutateAsync: mutateAsyncUpdated, isPending: isPendingUpdated } =
    useMutationUpdatedCategory();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (selectedItem.current?.name) {
      setValue(selectedItem.current.name);
    }
  }, [selectedItem.current]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedItem.current) {
      try {
        await mutateAsyncUpdated({ id: selectedItem.current.id, name: value });
        refetch();
        setValue("");
        onClose();
        toast.success("Categoría actualizada");
      } catch (error: any) {
        if (error?.response?.data?.code === "23505") {
          toast.error("Ya existe una categoría con ese nombre");
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
          toast.error("Error al actualizar el categoría");
        }
      }
    } else {
      try {
        await mutateAsync(value);
        refetch();
        setValue("");
        onClose();
        toast.success("Categoría creada");
      } catch (error: any) {
        if (error?.response?.data?.code === "23505") {
          toast.error("Ya existe una categoría con ese nombre");
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
          toast.error("Error al crear la categoría");
        }
      }
    }
  };

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form
          className={classes["form-modal"]}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                setValue("");
              }}
            />
            <h1 className="mb-2 font-bold text-xl">
              {selectedItem.current ? "Editar categoría" : "Crear categoría"}
            </h1>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label>Nombre de la categoría</label>
            <Input
              maxLength={40}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Button
            disabled={isPending || isPendingUpdated || value === ""}
            wFull
          >
            {isPending || isPendingUpdated ? (
              <div className="loader" />
            ) : selectedItem.current ? (
              "Guardar cambios"
            ) : (
              "Crear categoría"
            )}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalCategories;
