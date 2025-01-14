import { CircleX } from "lucide-react";
import classes from "./ModalUsers.module.css";
import { getRole, roles } from "@/app/dashboard/functions";
import { FormEvent, MutableRefObject, useEffect, useState } from "react";
import { Users } from "@/app/dashboard/interfaces";

import {
  useMutationUpdatedUser,
  useMutationUser,
} from "@/app/dashboard/api/mutations";
import { useQueryUsers } from "@/app/dashboard/api/queries";
import toast from "react-hot-toast";
import Input from "../../input/Input";
import Select from "../../select/Select";
import Button from "../../button/Button";
import { Tooltip } from "../../tooltip/Tooltip";

interface Props {
  currentPage: number;
  active: boolean;
  selectedItem: MutableRefObject<Users | undefined>;
  onClose: () => void;
  search: string;
}

const ModalUsers = ({
  currentPage,
  active,
  onClose,
  selectedItem,
  search,
}: Props) => {
  const [role, setRole] = useState("");
  const { refetch } = useQueryUsers(currentPage, search);
  const [isValid, setIsValid] = useState(false);
  const { mutateAsync: mutateAsyncCreate, isPending: isPendingCreate } =
    useMutationUser();
  const { mutateAsync: mutateAsyncUpdated, isPending: isPendingUpdated } =
    useMutationUpdatedUser();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedItem.current) {
      try {
        await mutateAsyncCreate({ ...values, role });
        setValues({ username: "", email: "", password: "" });
        setRole("");
        onClose();
        refetch();
        toast.success("Usuario creado");
      } catch (error: any) {
        if (error.response && error.response.data.code === "23505") {
          toast.error("Ya existe un usuario con este correo");
        } else if (error.response && error.response.data.code === 403) {
          toast.error("Acción denegada");
        } else {
          toast.error("Error al crear el usuario");
        }
      }
    } else {
      try {
        await mutateAsyncUpdated({
          id: selectedItem.current.id,
          data: { username: values.username, email: values.email, role },
        });
        setValues({ username: "", email: "", password: "" });
        setRole("");
        onClose();
        refetch();
        toast.success("Usuario editado");
      } catch (error: any) {
        if (error.response && error.response.data.code === "23505") {
          toast.error("Ya existe un usuario con este correo");
        } else if (error.response && error.response.data.code === 403) {
          toast.error("Acción denegada");
        } else {
          toast.error("Error al editar el usuario");
        }
      }
    }
  };

  useEffect(() => {
    if (selectedItem.current) {
      setValues({ ...selectedItem.current, password: "" });
      setRole(getRole(selectedItem.current.role));
    }
  }, [selectedItem.current]);

  useEffect(() => {
    if (selectedItem.current) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        values.username.length > 3 && // Valida el nombre de usuario
        role !== "" && // Valida que el rol no esté vacío
        emailRegex.test(values.email) // Valida el correo electrónico
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; // Al menos una minúscula, una mayúscula y un número

      if (
        values.username.length > 3 && // Valida el nombre de usuario
        role !== "" && // Valida que el rol no esté vacío
        emailRegex.test(values.email) && // Valida el correo electrónico
        passwordRegex.test(values.password) // Valida la contraseña
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [role, values]);

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form className={classes["form-modal"]} onSubmit={handleSubmit}>
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                setRole("");
                setValues({ username: "", email: "", password: "" });
              }}
            />
            <h1 className="mb-2 font-bold text-xl">
              {selectedItem.current ? "Editar un usuario" : "Crear un usuario"}{" "}
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-slate-600">Nombre del usuario</label>
            <Tooltip text="El campo debe contener al menos 4 caracteres para asegurar que la información ingresada sea suficientemente descriptiva" />
          </div>
          <Input
            value={values.username}
            type="string"
            maxLength={15}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />

          <div className="flex gap-2 items-center">
            <label className="text-slate-600">Email</label>
            <Tooltip text="El correo electrónico debe ser válido para garantizar una comunicación efectiva y segura" />
          </div>
          <Input
            value={values.email}
            type="email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <div className="flex gap-2 items-center">
            <label className="text-slate-600">Contraseña</label>
            <Tooltip text="Por razones de seguridad, la contraseña debe incluir al menos un carácter en mayúscula, un carácter en minúscula y un número" />
          </div>

          <Input
            value={values.password}
            type="password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <label className="text-slate-600">Rol</label>
          <Select
            data={roles}
            value={role}
            setValue={setRole}
            placeholder="Selecciona un rol"
          />
          <br />
          <Button disabled={isValid || isPendingCreate || isPendingUpdated}>
            {isPendingCreate || isPendingUpdated ? (
              <div className="loader" />
            ) : selectedItem.current ? (
              "Guardar cambios"
            ) : (
              "Crear usuario"
            )}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalUsers;
