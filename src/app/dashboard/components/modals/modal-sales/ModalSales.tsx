"use client";

import Button from "../../button/Button";
import classes from "./ModalSales.module.css";
import { CirclePlus, CircleX } from "lucide-react";
import Input from "../../input/Input";
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { useMutationSales } from "@/app/dashboard/api/mutations";
import { ProductSale, ProductTable, Sale } from "@/app/dashboard/interfaces";
import DatePicker, { registerLocale } from "react-datepicker";
import { colombia } from "@/app/dashboard/utils";
import SelectId from "../../select-id/SelectId";
import { es } from "date-fns/locale";
import SelectSearchProducts from "../../select-search-products/SelectSearchProducts";
import toast from "react-hot-toast";
import { useQuerySales } from "@/app/dashboard/api/queries";
import { convertCurrencyToNumber } from "@/app/dashboard/functions";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es);
interface Props {
  currentPage: number;
  query: {
    date: Date | null;
    status: string;
  };
  selectedItem: MutableRefObject<ProductTable | undefined>;
  active: boolean;
  onClose: () => void;
}

const ModalSales = ({
  currentPage,
  query,
  selectedItem,
  active,
  onClose,
}: Props) => {
  const [product, setProduct] = useState<undefined | ProductSale>();
  const { mutateAsync, isPending } = useMutationSales();
  const { refetch } = useQuerySales(currentPage, query);
  const quantity = useRef(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [valuesForm, setValuesForm] = useState<Sale>({
    type_purchase: "local",
    first_name: "",
    last_name: "",
    phone: "",
    department: "",
    city: "",
    address: "",
    additional_info: "",
    email: "",
    order_number: "",
    products: [],
    quantity: "",
    status: "",
    id_number: "",
    payment_method: "",
    purchase_date: new Date(),
  });

  const paymentMethod = (type: string) => {
    switch (type) {
      case "Efecty":
        return "ticket";
      case "PSE":
        return "bank_transfer";
      case "Mercado pago":
        return "account_money";
      case "Tarjeta de débito":
        return "debit_card";
      case "Tarjeta de crédito":
        return "credit_card";
      case "Efectivo":
        return "cash";
      default:
        return "other";
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productsWithoutId = valuesForm.products.map(
        ({ id, ...rest }) => rest
      );
      const updatedValuesForm = {
        ...valuesForm,
        payment_method: paymentMethod(valuesForm.payment_method),
        quantity: quantity.current + "",
        products: productsWithoutId,
      };

      await mutateAsync(updatedValuesForm);
      refetch();
      setValuesForm({
        type_purchase: "local",
        first_name: "",
        last_name: "",
        phone: "",
        department: "",
        city: "",
        address: "",
        additional_info: "",
        email: "",
        order_number: "",
        products: [],
        quantity: "",
        status: "",
        id_number: "",
        payment_method: "",
        purchase_date: new Date(),
      });
      onClose();
      toast.success("Venta creada");
    } catch {
      toast.error("Error al crear la venta");
    }
  };
  const removeProduct = (title: string) => {
    const productToRemove = valuesForm.products.find(
      (product) => product.title === title
    );

    if (productToRemove) {
      quantity.current -= Number(productToRemove.quantity);

      const result = valuesForm.products.filter(
        (product) => product.title !== title
      );

      setValuesForm({ ...valuesForm, products: result });
    }
  };

  return (
    active && (
      <section className={classes["container-modal"]}>
        <form
          className={classes["form-modal"]}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <CircleX
              className="absolute right-5 cursor-pointer"
              onClick={() => {
                onClose();
                quantity.current = 0;
                setValuesForm({
                  first_name: "",
                  type_purchase: "local",
                  last_name: "",
                  phone: "",
                  department: "",
                  city: "",
                  address: "",
                  additional_info: "",
                  email: "",
                  order_number: "",
                  products: [],
                  quantity: "",
                  status: "",
                  id_number: "",
                  payment_method: "",
                  purchase_date: new Date(),
                });
              }}
            />
            <h1 className="mb-2 font-bold text-xl">Crear venta</h1>
          </div>

          <div className="flex justify-between relative gap-5">
            <div className="flex flex-col">
              <label className="mb-1">Fecha</label>
              <DatePicker
                popperPlacement="bottom"
                dateFormat="dd/MM/yyyy"
                locale="es"
                popperClassName="custom-datepicker-popup"
                selected={valuesForm.purchase_date}
                onChange={(date) =>
                  setValuesForm({ ...valuesForm, purchase_date: date })
                }
                className="border border-[#7350f381] focus:border-[#6439ff] focus:outline-none rounded-[5px] w-full p-[7px]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Teléfono movil</label>
              <Input
                value={valuesForm.phone}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setValuesForm({ ...valuesForm, phone: value });
                  }
                }}
              />
            </div>
          </div>

          <div className="flex justify-between relative gap-5">
            <div className="flex flex-col gap-1">
              <label>Nombres</label>
              <Input
                value={valuesForm.first_name}
                maxLength={25}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, first_name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Apellidos</label>
              <Input
                value={valuesForm.last_name}
                maxLength={25}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, last_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="flex flex-col gap-1 w-[216px]">
              <label>Departamento</label>
              <SelectId
                id="departament"
                placeholder="Departamentos"
                value={valuesForm.department}
                setValue={(e) =>
                  setValuesForm({ ...valuesForm, city: "", department: e + "" })
                }
                data={colombia.map((i, index) => ({
                  id: index,
                  name: i.department,
                }))}
              />
            </div>

            <div className="flex flex-col gap-1 w-[216px]">
              <label>Ciudad</label>
              <SelectId
                id="city"
                placeholder="Seleccionar ciudad"
                value={valuesForm.city}
                setValue={(e) => setValuesForm({ ...valuesForm, city: e + "" })}
                data={
                  colombia
                    .find((i) => i.department === valuesForm.department)
                    ?.cities.map((city, index) => ({
                      id: index,
                      name: city,
                    })) || []
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div className="flex flex-col gap-1">
              <label>Dirección</label>
              <Input
                value={valuesForm.address}
                maxLength={25}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, address: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Referencias adicionales</label>
              <Input
                value={valuesForm.additional_info}
                maxLength={50}
                onChange={(e) =>
                  setValuesForm({
                    ...valuesForm,
                    additional_info: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <div className="flex flex-col gap-1">
              <label>Email</label>
              <Input
                value={valuesForm.email}
                maxLength={30}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Número de orden</label>
              <Input
                value={valuesForm.order_number}
                maxLength={20}
                onChange={(e) =>
                  setValuesForm({ ...valuesForm, order_number: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col gap-1 w-[216px]">
              <div className="flex gap-2">
                <label>Producto</label>
                <span className="text-red-600">*</span>
              </div>
              <SelectSearchProducts value={product} setValue={setProduct} />
            </div>

            <div className="flex flex-col gap-1 w-[216px]">
              <div className="flex gap-2">
                <label>Cantidad</label>
                <span className="text-red-600">*</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={valuesForm.quantity}
                  maxLength={4}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setValuesForm({ ...valuesForm, quantity: value });
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (product && valuesForm.quantity) {
                      // Comprobar si el producto ya existe en la lista
                      const productExists = valuesForm.products.some(
                        (item) => item.id === product.id
                      );

                      if (productExists) {
                        setErrorMessage("Este producto ya ha sido agregado.");
                      } else {
                        quantity.current += Number(valuesForm.quantity);
                        setValuesForm((prev) => ({
                          ...prev,
                          products: [
                            ...valuesForm.products,
                            {
                              ...product,
                              purchase_total:
                                product.discount !== 0
                                  ? convertCurrencyToNumber(
                                      product.discount_price
                                    ) *
                                      Number(valuesForm.quantity) +
                                    ""
                                  : convertCurrencyToNumber(product.price) *
                                      Number(valuesForm.quantity) +
                                    "",
                              quantity: Number(valuesForm.quantity),
                            },
                          ],
                          quantity: "", // Limpiar el campo de cantidad
                        }));
                        setProduct(undefined); // Limpiar el campo de producto
                        setErrorMessage(""); // Limpiar el mensaje de error si el producto se agrega
                      }
                    }
                  }}
                  disabled={
                    product && valuesForm.quantity !== "" ? false : true
                  }
                  className={
                    product && valuesForm.quantity !== ""
                      ? classes["addSpecs-active"]
                      : classes["addSpecs-disabled"]
                  }
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-xs">{errorMessage}</div>
          )}

          <div className="flex gap-5 w-full flex-wrap">
            {valuesForm.products.map((product, index) => (
              <div key={index} className="burble">
                {product.title} X {product.quantity}
                <CircleX
                  size={15}
                  color="white"
                  className="cursor-pointer"
                  onClick={() => removeProduct(product.title)}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label>Cédula de ciudadanía</label>
            <Input
              value={valuesForm.id_number}
              maxLength={15}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setValuesForm({ ...valuesForm, id_number: value });
                }
              }}
            />
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2">
                <label>Estado</label>
                <span className="text-red-600">*</span>
              </div>
              <SelectId
                id="status"
                value={valuesForm.status}
                setValue={(e) => setValuesForm({ ...valuesForm, status: e })}
                data={[
                  { id: 1, name: "Pago pendiente" },
                  { id: 2, name: "En tránsito" },
                  { id: 3, name: "Pedido entregado" },
                  { id: 4, name: "Pedido entregado" },
                ]}
                placeholder="Seleciona un estado"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2">
                <label>Método de pago</label>
                <span className="text-red-600">*</span>
              </div>
              <SelectId
                id="payment_method"
                value={valuesForm.payment_method}
                setValue={(e) =>
                  setValuesForm({ ...valuesForm, payment_method: e })
                }
                data={[
                  { id: 1, name: "Efectivo" },
                  { id: 2, name: "Tarjeta de crédito" },
                  { id: 3, name: "Tarjeta de débito" },
                  { id: 4, name: "Efecty" },
                  { id: 5, name: "PSE" },
                  { id: 6, name: "Mercado pago" },
                  { id: 7, name: "Otro" },
                ]}
                placeholder="Seleciona un método"
              />
            </div>
          </div>

          <Button
            disabled={
              isPending ||
              !(
                valuesForm.products.length &&
                valuesForm.status !== "" &&
                valuesForm.payment_method !== ""
              )
            }
            wFull
          >
            {isPending ? (
              <div className="loader" />
            ) : selectedItem.current ? (
              "Guardar cambios"
            ) : (
              "Crear venta"
            )}{" "}
          </Button>
        </form>
      </section>
    )
  );
};

export default ModalSales;
