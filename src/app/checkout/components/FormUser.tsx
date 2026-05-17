"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "@/hooks";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Mail, CreditCard, Info, ChevronRight } from "lucide-react";

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

const schema = yup.object().shape({
  first_name: yup.string().required("El nombre es obligatorio").max(20, "Máximo 20 caracteres"),
  last_name: yup.string().required("El apellido es obligatorio").max(20, "Máximo 20 caracteres"),
  phone: yup.string().required("El teléfono es obligatorio").matches(/^\d{10}$/, "Debe ser un número de 10 dígitos"),
  department: yup.string().required("El departamento es obligatorio").max(20, "Máximo 20 caracteres"),
  city: yup.string().required("La ciudad es obligatoria").max(20, "Máximo 20 caracteres"),
  address: yup.string().required("La dirección es obligatoria").max(20, "Máximo 20 caracteres"),
  additional_info: yup.string().max(20, "Máximo 20 caracteres").default(""),
  email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  id_number: yup.string().required("El número de identificación es obligatorio").matches(/^\d{8,12}$/, "Debe tener entre 8 y 12 dígitos"),
});

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const FormField = ({
  label,
  id,
  error,
  required,
  icon: Icon,
  index,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
  children: React.ReactNode;
}) => (
  <motion.div custom={index} variants={fieldVariants} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs text-charcoal flex items-center gap-1.5" style={{ fontFamily: "var(--font-semibold)" }}>
      <Icon className="w-3.5 h-3.5 text-gold" />
      {label}
      {required && <span className="text-gold">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
        {error}
      </p>
    )}
  </motion.div>
);

const inputClass = "w-full bg-cream border border-warm-border rounded-xl px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold transition-all duration-200";

const FormUser = ({ setCurrentStep }: Props) => {
  const [isFilled, setIsFilled] = useState(false);
  const { user, setUser } = useUser();

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    defaultValues: user,
    resolver: yupResolver<FormData>(schema),
  });

  const formValues = useWatch({ control });

  useEffect(() => {
    if (Object.keys(formValues).length) {
      setIsFilled(
        Object.entries(formValues)
          .filter(([key]) => key !== "additional_info")
          .every(([, value]) => value?.trim() !== "")
      );
    }
  }, [formValues]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setUser(data);
    setCurrentStep(2);
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-ivory border border-warm-border rounded-2xl overflow-hidden">
        {/* Card header */}
        <div className="px-8 py-6 border-b border-warm-border">
          <div className="gold-line mb-3" />
          <h2 className="text-xl text-charcoal" style={{ fontFamily: "var(--font-semibold)" }}>
            Detalles del comprador
          </h2>
          <p className="text-sm text-warm-gray mt-1">
            Completa tus datos para continuar con el pedido.
          </p>
        </div>

        <div className="px-8 py-8 flex flex-col gap-5">
          {/* Name row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Nombre" id="first_name" error={errors.first_name?.message} required icon={User} index={0}>
              <input id="first_name" {...register("first_name")} placeholder="Andres" className={inputClass} />
            </FormField>
            <FormField label="Apellido" id="last_name" error={errors.last_name?.message} required icon={User} index={1}>
              <input id="last_name" {...register("last_name")} placeholder="Parrado" className={inputClass} />
            </FormField>
          </div>

          <FormField label="Teléfono móvil" id="phone" error={errors.phone?.message} required icon={Phone} index={2}>
            <input id="phone" {...register("phone")} placeholder="3204173434" className={inputClass} />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label="Departamento" id="department" error={errors.department?.message} required icon={MapPin} index={3}>
              <input id="department" {...register("department")} placeholder="Cundinamarca" className={inputClass} />
            </FormField>
            <FormField label="Ciudad" id="city" error={errors.city?.message} required icon={MapPin} index={4}>
              <input id="city" {...register("city")} placeholder="Bogotá" className={inputClass} />
            </FormField>
          </div>

          <FormField label="Dirección" id="address" error={errors.address?.message} required icon={MapPin} index={5}>
            <input id="address" {...register("address")} placeholder="Cra 100A 3 141-10" className={inputClass} />
          </FormField>

          <FormField label="Información adicional" id="additional_info" error={errors.additional_info?.message} icon={Info} index={6}>
            <input id="additional_info" {...register("additional_info")} placeholder="Apartamento 804 Torre D" className={inputClass} />
          </FormField>

          <FormField label="Correo electrónico" id="email" error={errors.email?.message} required icon={Mail} index={7}>
            <input id="email" type="email" {...register("email")} placeholder="andres@gmail.com" className={inputClass} />
          </FormField>

          <FormField label="Número de identificación" id="id_number" error={errors.id_number?.message} required icon={CreditCard} index={8}>
            <input id="id_number" {...register("id_number")} placeholder="1118203462" className={inputClass} />
          </FormField>
        </div>

        {/* Footer actions */}
        <div className="px-8 py-5 border-t border-warm-border bg-cream flex justify-end">
          <motion.button
            type="submit"
            disabled={!isFilled}
            whileHover={isFilled ? { scale: 1.02, backgroundColor: "#c9a86a" } : {}}
            whileTap={isFilled ? { scale: 0.98 } : {}}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm tracking-wide transition-all duration-200 ${
              isFilled
                ? "bg-gold text-white cursor-pointer"
                : "bg-warm-border text-warm-gray cursor-not-allowed"
            }`}
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
};

export default FormUser;
