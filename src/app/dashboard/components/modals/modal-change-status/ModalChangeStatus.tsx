"use client";

import classes from "./ModalChangeStatus.module.css";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { useMutationUpdatedSale } from "@/app/dashboard/api/mutations";
import { useState } from "react";
import SelectId from "../../select-id/SelectId";

interface Props {
  active: boolean;
  refetch: VoidFunction;
  onClose: () => void;
  idElement: number;
}

const ModalChangeStatus = ({ active, refetch, onClose, idElement }: Props) => {
  const { mutateAsync, isPending } = useMutationUpdatedSale();
  const [value, setValue] = useState("");

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setValue("");
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    try {
      await mutateAsync({ id: idElement, status: value });
      refetch();

      toast.success("venta actualizada");
      onClose();
      setValue("");
    } catch (error: any) {
      if (error.response && error.response.data.code === 403) {
        toast.error("Acción denegada");
      } else {
        toast.error("Error al actualizar la venta");
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
              setValue("");
            }}
          />
          <h1 className="mb-2 font-bold">Cambiar estado</h1>
          <SelectId
            id="status-edit"
            value={value}
            setValue={(e) => setValue(e)}
            data={[
              { id: 1, name: "Pago pendiente" },
              { id: 2, name: "Gestionando pedido" },
              { id: 3, name: "En tránsito" },
              { id: 4, name: "Pedido entregado" },
            ]}
            placeholder="Seleciona un estado"
          />

          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? <div className="loader" /> : "Actualizar"}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalChangeStatus;
