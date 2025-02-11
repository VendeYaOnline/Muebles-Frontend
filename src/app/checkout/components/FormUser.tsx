"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Props {
  formData: {
    first_name: string;
    last_name: string;
    phone: string;
    department: string;
    city: string;
    address: string;
    additional_info: string;
    email: string;
    id_number: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      first_name: string;
      last_name: string;
      phone: string;
      department: string;
      city: string;
      address: string;
      additional_info: string;
      email: string;
      id_number: string;
    }>
  >;
}

const FormUser = ({ formData, setFormData }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Detalles del comprador</CardTitle>
        <CardDescription>
          Por favor, complete sus datos a continuación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">Nombre</Label>
              <Input
                maxLength={20}
                id="first_name"
                name="first_name"
                placeholder="Andres Felipe"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Apellido</Label>
              <Input
                maxLength={20}
                id="last_name"
                name="last_name"
                placeholder="Parrado"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              maxLength={10}
              id="phone"
              name="phone"
              placeholder="3204173434"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input
                maxLength={20}
                id="department"
                name="department"
                placeholder="Cundinamarca"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                maxLength={20}
                id="city"
                name="city"
                placeholder="Bogotá"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              maxLength={20}
              id="address"
              name="address"
              placeholder="Cra 100A 3 141-10"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additional_info">Información Adicional</Label>
            <Input
              maxLength={20}
              id="additional_info"
              name="additional_info"
              placeholder="Apartamento 804 Torre D"
              value={formData.additional_info}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              maxLength={30}
              placeholder="andresparrado@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id_number">Número de Identificación</Label>
            <Input
              maxLength={12}
              id="id_number"
              name="id_number"
              placeholder="1118203462"
              value={formData.id_number}
              onChange={handleChange}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormUser;
