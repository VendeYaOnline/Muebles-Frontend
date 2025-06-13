import { GalleryHorizontal } from "lucide-react";
import Button from "../../components/button/Button";
import { useRef, useState } from "react";
import { Products } from "@/app/dashboard/interfaces";
import { TableCarousel } from "../../components/tables";
import { ModalCarousel } from "../../components/modals";
import { useQueryCarousel } from "@/app/dashboard/api/queries";
import { useUser } from "../../hooks";

const Carousel = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const { data, refetch, isFetching } = useQueryCarousel(currentPage, search);
  const selectedItem = useRef<
    | {
        id: number;
        name: string;
        products: Products[];
      }
    | undefined
  >(undefined);
  return (
    <section>
      <div className="mb-5">
        <Button
          onClick={() => setActiveModal(true)}
          disabled={(data && data?.grandTotal >= 5) || user?.role === "viewer"}
        >
          {data && data?.grandTotal >= 5
            ? "Límite alcanzado"
            : "Crear carrusel"}
          <GalleryHorizontal size={18} />
        </Button>
      </div>
      <ModalCarousel
        refetch={refetch}
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        onClose={() => {
          setActiveModal(false);
          selectedItem.current = undefined;
        }}
      />
      <TableCarousel
        data={data}
        refetch={refetch}
        isFetching={isFetching}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        search={search}
        setSearch={setSearch}
        user={user}
      />
    </section>
  );
};

export default Carousel;
