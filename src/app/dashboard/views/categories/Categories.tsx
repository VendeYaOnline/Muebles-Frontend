import { useRef, useState } from "react";
import { ModalCategories } from "../../components/modals";
import { ChartBarStacked } from "lucide-react";
import Button from "../../components/button/Button";
import { TableCategories } from "../../components/tables";
import { useUser } from "../../hooks";
import { useQueryCategories } from "../../api/queries";

const Categories = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { user: userLogin } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, refetch, isFetching } = useQueryCategories(currentPage, search);
  const selectedItem = useRef<{ id: number; name: string } | undefined>(
    undefined
  );

  return (
    <section>
      <div className="mb-5">
        <Button
          onClik={() => setActiveModal(true)}
          disabled={
            (data && data?.grandTotal >= 50) || userLogin?.role === "viewer"
          }
        >
          {data && data?.grandTotal >= 50
            ? "Límite alcanzado"
            : "Crear categoría"}
          <ChartBarStacked size={18} />
        </Button>
      </div>
      <ModalCategories
        refetch={refetch}
        active={activeModal}
        selectedItem={selectedItem}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableCategories
        data={data}
        refetch={refetch}
        isFetching={isFetching}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSearch={setSearch}
        search={search}
        userLogin={userLogin}
      />
    </section>
  );
};

export default Categories;
