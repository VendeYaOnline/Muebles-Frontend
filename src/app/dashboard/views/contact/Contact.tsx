import { useRef, useState } from "react";
import { Contacts } from "../../interfaces";
import { useUser } from "../../hooks";
import TableContact from "../../components/tables/table-contacts/TableContact";

const Contact = () => {
  const [activeModal, setActiveModal] = useState(false);
  const { user: userLogin } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  // const { data } = useQueryContacts(currentPage, search);
  const selectedItem = useRef<Contacts | undefined>(undefined);

  return (
    <section>
      {/*       <ModalUsers
        currentPage={currentPage}
        active={activeModal}
        selectedItem={selectedItem}
        search={search}
        onClose={() => {
          setActiveModal(false);
          selectedItem.current = undefined;
        }}
      /> */}
      <TableContact
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

export default Contact;
