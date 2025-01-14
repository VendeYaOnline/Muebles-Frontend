import classes from "./Login.module.css";
import Input from "../input/Input";
import Button from "../button/Button";
import { useMutationLoginUser } from "../../api/mutations";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../../hooks";
import { verifyToken } from "../../api/request";

const Login = () => {
  const { mutateAsync, isPending } = useMutationLoginUser();
  const [isLoading, setIsloading] = useState(true);
  const [values, setValues] = useState({ email: "", password: "" });
  const { setUser } = useUser();

  const verify = async () => {
    try {
      const token = localStorage.getItem("token-vendeyaonline");
      const user = localStorage.getItem("user-vendeyaonline");

      if (!token || !user) {
        setUser(undefined);
        return;
      }

      await verifyToken();
      setUser(JSON.parse(user));
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("No se pudo conectar. Verifica tu conexión a internet.");
      } else if (error?.code === "ECONNABORTED") {
        toast.error(
          "La conexión está tardando demasiado. Inténtalo nuevamente."
        );
      }
      localStorage.removeItem("token-vendeyaonline");
      localStorage.removeItem("user-vendeyaonline");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await mutateAsync(values);
      const { token, user } = response.data;

      localStorage.setItem("token-vendeyaonline", JSON.stringify(token));
      localStorage.setItem("user-vendeyaonline", JSON.stringify(user));
      setValues({ email: "", password: "" });
      toast.success("Login exitoso");
      setUser(user);
    } catch (error: any) {
      if (error?.response?.data?.message === "Invalid credentials") {
        toast.error("Credenciales no válidas");
      } else if (error?.response?.data?.message === "User not found") {
        toast.error("Credenciales no válidas");
      } else if (error?.message === "Network Error") {
        toast.error("No se pudo conectar. Verifica tu conexión a internet.");
      } else if (error?.code === "ECONNABORTED") {
        toast.error(
          "La conexión está tardando demasiado. Inténtalo nuevamente."
        );
      } else if (error?.response?.status) {
        toast.error(
          `Error ${error.response.status}: ${
            error.response.statusText || "Error desconocido"
          }`
        );
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  const isButtonDisabled = !values.email || !values.password || isPending;

  return (
    <section className={classes["container-login"]}>
      {isLoading ? (
        <div className="loader-3" />
      ) : (
        <form className={classes["form-modal"]} onSubmit={handleSubmit}>
          <h1 className="font-bold text-xl">Acceso de usuario</h1>
          <label className="text-slate-600">Correo electrónico</label>
          <Input
            type="string"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <label className="text-slate-600">Contraseña</label>
          <Input
            type="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <br />
          <Button disabled={isButtonDisabled}>
            {isPending ? <div className="loader" /> : "Iniciar de sesión"}
          </Button>
        </form>
      )}
    </section>
  );
};

export default Login;
