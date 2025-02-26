"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks";

interface Props {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  additional_info: string;
  email: string;
  id_number: string;
}

// Esquema de validación con Yup
const schema = yup.object().shape({
  first_name: yup
    .string()
    .required("El nombre es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  last_name: yup
    .string()
    .required("El apellido es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^\d{10}$/, "Debe ser un número de 10 dígitos"),
  department: yup
    .string()
    .required("El departamento es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  city: yup
    .string()
    .required("La ciudad es obligatoria")
    .max(20, "Máximo 20 caracteres"),
  address: yup
    .string()
    .required("La dirección es obligatoria")
    .max(20, "Máximo 20 caracteres"),
  additional_info: yup.string().max(20, "Máximo 20 caracteres").default(""),
  email: yup
    .string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  id_number: yup
    .string()
    .required("El número de identificación es obligatorio")
    .matches(/^\d{8,12}$/, "Debe tener entre 8 y 12 dígitos"),
});

const FormUser = ({ setCurrentStep }: Props) => {
  const [isFilled, setIsFilled] = useState(false);
  const { user, setUser } = useUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: user,
    resolver: yupResolver<FormData>(schema),
  });
  const formValues = useWatch({ control });

  useEffect(() => {
    if (Object.keys(formValues).length) {
      setIsFilled(
        Object.entries(formValues)
          .filter(([key]) => key !== "additional_info") // Excluir additional_info
          .every(([, value]) => value.trim() !== "")
      );
    }
  }, [formValues]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUser(data);
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Detalles del comprador</CardTitle>
          <CardDescription>
            Por favor, complete sus datos a continuación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">
                Nombre <span className="text-red-600">*</span>
              </Label>
              <Input
                id="first_name"
                {...register("first_name")}
                placeholder="Andres Felipe"
              />
              <p className="text-red-500 text-sm">
                {errors.first_name?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">
                Apellido <span className="text-red-600">*</span>
              </Label>
              <Input
                id="last_name"
                {...register("last_name")}
                placeholder="Parrado"
              />
              <p className="text-red-500 text-sm">
                {errors.last_name?.message}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Teléfono móvil <span className="text-red-600">*</span>
            </Label>
            <Input id="phone" {...register("phone")} placeholder="3204173434" />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">
                Departamento <span className="text-red-600">*</span>
              </Label>
              <Input
                id="department"
                {...register("department")}
                placeholder="Cundinamarca"
              />
              <p className="text-red-500 text-sm">
                {errors.department?.message}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">
                Ciudad <span className="text-red-600">*</span>
              </Label>
              <Input id="city" {...register("city")} placeholder="Bogotá" />
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              Dirección <span className="text-red-600">*</span>
            </Label>
            <Input
              id="address"
              {...register("address")}
              placeholder="Cra 100A 3 141-10"
            />
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional_info">Información Adicional</Label>
            <Input
              id="additional_info"
              {...register("additional_info")}
              placeholder="Apartamento 804 Torre D"
            />
            <p className="text-red-500 text-sm">
              {errors.additional_info?.message}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              Correo Electrónico <span className="text-red-600">*</span>
            </Label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="andresparrado@gmail.com"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="id_number">
              Número de Identificación <span className="text-red-600">*</span>
            </Label>
            <Input
              id="id_number"
              {...register("id_number")}
              placeholder="1118203462"
            />
            <p className="text-red-500 text-sm">{errors.id_number?.message}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-2 w-full justify-center mt-10">
        <Button
          disabled
          className="text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Anterior
        </Button>
        <Button
          disabled={!isFilled}
          className="text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Siguiente
        </Button>
      </div>
    </form>
  );
};

export default FormUser;
