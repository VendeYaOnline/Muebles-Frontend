import { useRef, useState } from "react";
import { useQueryUsers } from "../../api/queries";
import { Users as UsersIcon } from "lucide-react";
import { Users as IUsers } from "../../interfaces";
import Button from "../../components/button/Button";
import { ModalUsers } from "../../components/modals";
import { TableUsers } from "../../components/tables";
import { useUser } from "../../hooks";

const Users = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { user: userLogin } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data } = useQueryUsers(currentPage, search);
  const selectedItem = useRef<IUsers | undefined>(undefined);

  return (
    <section>
      <div className="mb-5">
        <Button
          onClick={() => setActiveModal(true)}
          disabled={
            (data && data?.grandTotal >= 20) || userLogin?.role === "viewer"
          }
        >
          {data && data?.grandTotal >= 20
            ? "Límite alcanzado"
            : "Crear usuario"}
          <UsersIcon size={18} />
        </Button>
      </div>

      <ModalUsers
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false);
          selectedItem.current = undefined;
        }}
      />
      <TableUsers
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

export default Users;
