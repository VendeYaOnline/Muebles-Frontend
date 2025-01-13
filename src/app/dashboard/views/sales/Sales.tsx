import { useRef, useState } from "react";
import { ModalSales } from "../../components/modals";
import { ProductTable } from "@/app/dashboard/interfaces";
import { HandCoins } from "lucide-react";
import Button from "../../components/button/Button";
import { TableSales } from "../../components/tables";
import { useUser } from "../../hooks";

const Sales = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { user: userLogin } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState<{
    date: Date | null;
    status: string;
  }>({ date: null, status: "" });
  const selectedItem = useRef<ProductTable | undefined>(undefined);

  return (
    <section>
      <div className="mb-5">
        <Button
          onClik={() => setActiveModal(true)}
          disabled={userLogin?.role === "viewer"}
        >
          Crear venta
          <HandCoins size={18} />
        </Button>
      </div>
      <ModalSales
        currentPage={currentPage}
        query={query}
        active={activeModal}
        selectedItem={selectedItem}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableSales
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setQuery={setQuery}
        query={query}
        userLogin={userLogin}
      />
    </section>
  );
};

export default Sales;
