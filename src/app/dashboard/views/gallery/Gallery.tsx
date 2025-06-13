import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Images } from "lucide-react";
import Button from "../../components/button/Button";
import toast from "react-hot-toast";
import IconDelete from "../../assets/icon-delete.png";

import { useMutationImages } from "@/app/dashboard/api/mutations";
import { useQueryImages } from "@/app/dashboard/api/queries";
import { ModalDeleteImage, ModalUploadImages } from "../../components/modals";
import Pagination from "../../components/pagination/Pagination";
import Input from "../../components/input/Input";
import { useUser } from "../../hooks";
import classes from "./Gallery.module.css";

const Gallery = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userLogin } = useUser();
  const { mutateAsync, isPending } = useMutationImages();
  const [openModal, setOpenModal] = useState(false);
  const idElement = useRef("");
  const [active, setActive] = useState(false);
  const [images, setImages] = useState<{ url: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [noResults, setNoResults] = useState(true);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [valid, setValid] = useState(true);

  const firstLoad = useRef(false);
  const {
    data,
    refetch,
    isFetching,
    isPending: isPending2,
  } = useQueryImages(currentPage, search, 60);
  const refImages = useRef<File[]>([]);
  const canRenderImages =
    !isFetching && !isPending2 && data && data?.images.length > 0;

  const handleButtonClick = useCallback(async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef.current]);

  const validateImages = () => {
    const result = refImages.current.some((i) => i.size > 2000000);
    setValid(result);
  };

  const handleDeleteClick = (key: string) => {
    if (userLogin?.role !== "viewer") {
      onOpen(key);
    }
  };

  useEffect(() => {
    if (data?.grandTotal) {
      setNoResults(false);
    } else {
      setNoResults(true);
      setSearch("");
    }
  }, [data?.grandTotal]);

  const handleUpImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles: File[] = [];

      Array.from(event.target.files).forEach((file) => {
        // Validar extensión de archivo
        if (file.size > 2000000) {
          toast.error(
            `La imagen ${file.name} no se subió porque supera el tamaño máximo, que son 2 MB`
          );
        } else if (refImages.current.some((i) => i.name === file.name)) {
          toast.error(`La imagen ${file.name} ya existe.`);
        } else {
          refImages.current = [...refImages.current, file];
          newFiles.push(file);
        }
        setOpenModal(true);
      });

      // Actualizar el estado con las nuevas imágenes
      if (newFiles.length > 0) {
        const newImages = newFiles.map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...newImages]);
      }

      // Resetear el valor del input
      event.target.value = "";
    }
    validateImages();
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (data?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onOpen = (id: string) => {
    setActive(true);
    idElement.current = id;
  };

  const onClose = () => {
    setOpenModal(false);
    refImages.current = [];
    setImages([]);
  };

  const onCloseDelete = () => {
    setActive(false);
  };

  const handleChange = (value: string) => {
    setSearch(value);
    firstLoad.current = true;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      refetch();
    }, 500);
  };

  const renderedImages = useMemo(() => {
    if (!canRenderImages || !data?.images) return null;

    return data.images.map((image) => (
      <div key={image.Key} className={classes["skeleton-loader"]}>
        <Image
          src={IconDelete.src}
          width={15}
          height={15}
          alt="Eliminar"
          className={`${classes["icon-delete-image"]} z-20`}
          onClick={() => handleDeleteClick(image.Key)}
        />
        <Image
          src={image.Url}
          alt={`Imagen/${image.Key}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-[5px] z-20"
        />
      </div>
    ));
  }, [data?.images, handleDeleteClick, canRenderImages]);

  return (
    <>
      <ModalUploadImages
        images={images}
        setImages={setImages}
        refImages={refImages}
        active={openModal}
        onClose={onClose}
        isPending={isPending}
        mutateAsync={mutateAsync}
        refetch={refetch}
        valid={valid}
      />
      <ModalDeleteImage
        currentPage={currentPage}
        refetch={refetch}
        setCurrentPage={setCurrentPage}
        totalItems={data?.total || 0}
        active={active}
        onClose={onCloseDelete}
        idElement={idElement.current}
      />
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <input
            type="file"
            multiple
            accept=".jpg, .jpeg, .png, .webp"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUpImages}
          />
          <Button
            onClick={handleButtonClick}
            disabled={
              (data && data?.grandTotal >= 600) || userLogin?.role === "viewer"
            }
          >
            {data && data?.grandTotal >= 600
              ? "Límite alcanzado"
              : "Cargar imagenes"}

            <ImagePlus />
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Input
            disabled={noResults}
            placeholder="Buscar imagen"
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />

          {data && data?.total + "/" + 600}
        </div>
      </div>

      <div
        className={classes["container-gallery"]}
        style={{
          justifyContent: images.length ? "flex-start" : "center",
          alignItems: images.length ? "flex-start" : "center",
        }}
      >
        {isFetching && (
          <div className="w-full flex justify-center items-center box-border h-[60vh]">
            <div className="loader-3" />
          </div>
        )}
        {(!isFetching || !isPending2) && data?.images.length === 0 && (
          <div className="w-full h-[60vh] flex justify-center items-center flex-col gap-5">
            <h2 className="text-lg">No hay imagenes</h2>
            <Images size={50} />
          </div>
        )}

        <div className={classes["container-images"]}>{renderedImages}</div>
      </div>
      {canRenderImages && (
        <Pagination
          currentPage={currentPage}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          setCurrentPage={setCurrentPage}
          totalPages={data.totalPages}
        />
      )}
    </>
  );
};

export default Gallery;
