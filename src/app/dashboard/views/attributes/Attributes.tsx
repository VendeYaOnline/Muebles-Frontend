import { PencilRuler } from "lucide-react";
import Button from "../../components/button/Button";
import { useRef, useState } from "react";
import { AttributeUpdated } from "@/app/dashboard/interfaces";
import { TableAttribute } from "../../components/tables";
import { ModalAttribute } from "../../components/modals";
import { useQueryAttribute } from "@/app/dashboard/api/queries";
import { useUser } from "../../hooks";

const Attributes = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { user: userLogin } = useUser();
  const [search, setSearch] = useState("");
  const { data } = useQueryAttribute(currentPage, search);
  const selectedItem = useRef<AttributeUpdated | undefined>(undefined);
  return (
    <section>
      <div className="mb-5">
        <Button
          onClik={() => setActiveModal(true)}
          disabled={
            (data && data?.grandTotal >= 30) || userLogin?.role === "viewer"
          }
        >
          {data && data?.grandTotal >= 30
            ? "Límite alcanzado"
            : "Crear atributo"}{" "}
          <PencilRuler size={18} />
        </Button>
      </div>
      <ModalAttribute
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false), (selectedItem.current = undefined);
        }}
      />
      <TableAttribute
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedItem={selectedItem}
        setActiveModal={setActiveModal}
        search={search}
        setSearch={setSearch}
        userLogin={userLogin}
      />
    </section>
  );
};

export default Attributes;
