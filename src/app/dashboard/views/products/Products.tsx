import { useRef, useState } from "react";
import { ModalProduct } from "../../components/modals";
import { ProductTable } from "@/app/dashboard/interfaces";
import { Package } from "lucide-react";
import { useQueryProducts } from "@/app/dashboard/api/queries";
import Button from "../../components/button/Button";
import { TableProducts } from "../../components/tables";
import { useUser } from "../../hooks";

const Products = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { user: userLogin } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useQueryProducts(currentPage, search);
  const selectedItem = useRef<ProductTable | undefined>(undefined);

  return (
    <section>
      <div className="mb-5">
        <Button
          onClik={() => setActiveModal(true)}
          disabled={
            (data && data?.grandTotal >= 100) || userLogin?.role === "viewer"
          }
        >
          {data && data?.grandTotal >= 100
            ? "Límite alcanzado"
            : "Crear producto"}
          <Package size={18} />
        </Button>
      </div>

      <ModalProduct
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false);
          selectedItem.current = undefined;
        }}
      />
      <TableProducts
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        setSearch={setSearch}
        search={search}
        userLogin={userLogin}
      />
    </section>
  );
};

export default Products;
