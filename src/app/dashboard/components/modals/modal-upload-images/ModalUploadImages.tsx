"use client";

import classes from "./ModalUploadImages.module.css";
import { CircleX, ImagePlus, ImageUp } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../../button/Button";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import IconDelete from "../../../assets/icon-delete.png";
import Image from "next/image";
import { AxiosResponse } from "axios";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface ValueImage {
  url: string;
  name: string;
}

interface Props {
  images: ValueImage[];
  isPending: boolean;
  valid: boolean;
  mutateAsync: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    FormData,
    unknown
  >;
  setImages: Dispatch<SetStateAction<ValueImage[]>>;
  refImages: MutableRefObject<File[]>;
  active: boolean;
  onClose: () => void;
  refetch: () => void;
}

const ModalUploadImages = ({
  active,
  onClose,
  images,
  setImages,
  refImages,
  isPending,
  mutateAsync,
  refetch,
  valid,
}: Props) => {
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const deleteImageProduct = (image: { url: string; name: string }) => {
    const result = images.filter((i) => i.name !== image.name);
    setImages(result);
    const imagenRemove = refImages.current.filter((i) => i.name !== image.name);
    refImages.current = imagenRemove;
  };

  useEffect(() => {
    if (!images.length && active) {
      onClose();
    }
  }, [images, active, onClose]);

  const handleSubmit = async () => {
    if (refImages.current.length) {
      try {
        const formData = new FormData();
        refImages.current.forEach((file) => {
          formData.append("images", file);
        });
        await mutateAsync(formData);
        refetch();
        onClose();
        toast.success("Imagenes subidas con exito");
      } catch (error: any) {
        if (error?.response?.data?.message?.includes("La imagen con el nombre")) {
          toast.error(
            "Una o algunas de las imágenes que intentas subir ya existen en tu galería"
          );
        } else if (error?.response?.data?.code === 403) {
          toast.error("Acción denegada");
        } else if (error?.message === "Network Error") {
          toast.error("No se pudo conectar al servidor. Verifica tu conexión a internet.");
        } else if (error?.code === "ECONNABORTED") {
          toast.error("La conexión está tardando demasiado. Inténtalo nuevamente.");
        } else if (error?.response?.status) {
          toast.error(`Error ${error.response.status}: ${error.response.statusText || "Error desconocido"}`);
        } else {
          toast.error("Error inesperado al crear el producto");
        }
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
          <h1 className="mb-2 font-bold">Imagenes cargadas</h1>
          <div className="flex gap-3 flex-wrap max-h-[500px] overflow-auto p-3">
            {images.length ? (
              images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    className="rounded-[5px] bg-[#EEEEEE] p-1 opacity-60"
                    src={image.url}
                    width={100}
                    height={100}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                    alt={`Imagen/${image.name}`}
                  />

                  <img
                    src={IconDelete.src}
                    width={18}
                    height={18}
                    onClick={() => deleteImageProduct(image)}
                    alt="icono de eliminar imagen"
                    className={classes["icon-delete-image"]}
                  />
                </div>
              ))
            ) : (
              <div className="mt-[150px] m-auto flex flex-col gap-4 justify-center text-center text-white bg-[#6439ff] p-7 rounded-lg">
                <ImagePlus size={60} strokeWidth={1} className="m-auto" />
                <h1>Sin imagenes</h1>
              </div>
            )}
          </div>

          <Button onClick={handleSubmit} disabled={valid || isPending}>
            {isPending ? (
              <div className="loader" />
            ) : (
              <>
                Subir imagenes <ImageUp />
              </>
            )}
          </Button>
        </div>
      </section>
    )
  );
};

export default ModalUploadImages;
