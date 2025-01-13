"use client";

import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./ModalImages.module.css";
import { CircleX, Images, MonitorUp } from "lucide-react";
import { useQueryImages } from "@/app/dashboard/api/queries";
import Image from "next/image";
import Input from "../../input/Input";
import Pagination from "../../pagination/Pagination";
import toast from "react-hot-toast";

interface Props {
  active: boolean;
  optionImage: number;
  setOptionImage: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  setImagePreview: (value: SetStateAction<string | null>) => void;
  typeImage: string;
  imagesUrls: MutableRefObject<string[]>;
  productImages: {
    url: string;
    name: string;
  }[];
  setProductImages: Dispatch<
    SetStateAction<
      {
        url: string;
        name: string;
      }[]
    >
  >;
}

const ModalImages = ({
  active,
  onClose,
  optionImage,
  setOptionImage,
  setImagePreview,
  setProductImages,
  productImages,
  typeImage,
  imagesUrls,
}: Props) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch, isFetching } = useQueryImages(currentPage, search, 10);
  const firstLoad = useRef(false);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setSearch("");
    setOptionImage(0);
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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

  const selectedImageGalery = (imageUrl: string) => {
    if (typeImage === "main_image") {
      setImagePreview(imageUrl);
    } else {
      imagesUrls.current = [...imagesUrls.current, imageUrl];
      const name = imageUrl.split("amazonaws.com/")[1];
      if (productImages.find((i) => i.name === name)) {
        toast.error("La imagen ya existe");
      } else {
        setProductImages((prev) => [...prev, { name, url: imageUrl }]);
      }
    }
    onClose();
    setOptionImage(0);
  };

  useEffect(() => {
    if (firstLoad.current) {
      const timeout = setTimeout(() => {
        refetch();
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [search, refetch, firstLoad.current]);

  const handleChange = (value: string) => {
    setSearch(value);
    firstLoad.current = true;
  };

  return (
    active && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div
          className={
            optionImage === 0
              ? classes["form-modal-1"]
              : classes["form-modal-2"]
          }
          onClick={handleFormClick}
        >
          <CircleX
            className="absolute right-5 cursor-pointer"
            onClick={() => {
              onClose();
              setSearch("");
              setOptionImage(0);
            }}
          />

          {optionImage === 0 && (
            <h1 className="text-xl m-auto">Elige una opción</h1>
          )}
          {optionImage === 2 && (
            <div className="flex gap-3 mt-8 mb-3">
              <Input
                placeholder="Buscar imagen"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          )}

          {optionImage === 2 ? (
            <div className={classes["container-images"]}>
              {isFetching && (
                <div className="w-full h-[100px] flex justify-center items-center">
                  <div className="loader-3" />
                </div>
              )}

              {!isFetching &&
                data &&
                data?.images.length > 0 &&
                data.images.map((image, index) => (
                  <div key={index} className={classes["skeleton-loader"]}>
                    <Image
                      className="rounded-[5px] bg-gray-300 cursor-pointer hover:opacity-[0.6]"
                      src={image.Url}
                      width={100}
                      height={100}
                      onClick={() => selectedImageGalery(image.Url)}
                      style={{
                        width: 100,
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 100,
                      }}
                      alt={`Imagen/${image.Key}`}
                      onLoad={() => {
                        const div = document.querySelector(`[key="${index}"]`);
                        if (div) {
                          div.classList.remove(classes["skeleton-loader"]);
                        }
                      }}
                    />
                  </div>
                ))}

              {!isFetching && data?.images.length === 0 && (
                <div className="w-full h-[150px] flex justify-center items-center flex-col gap-5">
                  <h2 className="text-lg">No hay imagenes</h2>
                  <Images size={50} />
                </div>
              )}

              {data && data.images.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  handleNextPage={handleNextPage}
                  handlePrevPage={handlePrevPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={data.totalPages}
                />
              )}
            </div>
          ) : (
            <div className="flex justify-center gap-5">
              <div
                className={classes["card-option"]}
                onClick={() => {
                  setOptionImage(1), onClose();
                }}
              >
                Computadora
                <MonitorUp size={40} />
              </div>
              <div
                className={classes["card-option"]}
                onClick={() => {
                  setOptionImage(2);
                }}
              >
                Galeria
                <Images size={40} />
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
};

export default ModalImages;
