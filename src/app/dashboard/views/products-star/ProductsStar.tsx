import { Star } from "lucide-react";
import Button from "../../components/button/Button";
import { useRef, useState } from "react";
import { useQueryFeaturedProducts } from "../../api/queries";
import { ProductTable } from "../../interfaces";
import { TableProductsStar } from "../../components/tables";
import ModalProductStar from "../../components/modals/modal-product-star/ModalProductStar";
import { useUser } from "../../hooks";

const ProductsStar = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userLogin } = useUser();
  const [search, setSearch] = useState("");
  const { data, refetch, isFetching } = useQueryFeaturedProducts(
    currentPage,
    search
  );
  const selectedItem = useRef<ProductTable | undefined>(undefined);

  return (
    <section>
      <div className="mb-5">
        <Button
          onClick={() => setActiveModal(true)}
          disabled={
            (data && data?.grandTotal >= 8) || userLogin?.role === "viewer"
          }
        >
          {data && data?.grandTotal >= 8
            ? "Límite alcanzado"
            : "Crear producto destacado"}
          <Star size={18} />
        </Button>
      </div>

      <ModalProductStar
        active={activeModal}
        refetch={refetch}
        onClose={() => {
          setActiveModal(false);
          selectedItem.current = undefined;
        }}
      />
      <TableProductsStar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearch={setSearch}
        isFetching={isFetching}
        search={search}
        data={data}
        userLogin={userLogin}
        refetch={refetch}
      />
    </section>
  );
};

export default ProductsStar;
