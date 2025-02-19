import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="px-4 py-8 md:py-12 lg:py-16 max-w-4xl mx-auto mt-52 mb-36">
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Preguntas Frecuentes
        </h1>
        <p className="text-gray-600">
          Te guiamos en el proceso de compra en línea.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="item-1"
            className="border rounded-lg shadow-sm px-6 py-2 bg-white"
          >
            <AccordionTrigger className="text-indigo-600 hover:text-indigo-700 hover:no-underline text-left">
              ¿Debo registrarme para poder comprar en MEM.com?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2">
              No, aunque puedes agregar los productos que quieras al carrito de
              compras sin estar registrado. Cuando realices el proceso de compra
              debes ingresar tus datos personales, así como el medio de pago.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border rounded-lg shadow-sm px-6 py-2 bg-white"
          >
            <AccordionTrigger className="text-indigo-600 hover:text-indigo-700 hover:no-underline text-left">
              ¿Cuál es el proceso para comprar en MEM.com?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2">
              <p className="mb-4">
                Para encontrar el producto que quieres tienes dos opciones:
              </p>
              <div className="space-y-4">
                <div>
                  <strong>Buscador:</strong> ingresa el nombre artículo que
                  necesitas en nuestro buscador interno ubicado en la parte
                  superior de las categorias. Así podrás filtrar y ver otros
                  productos relacionados.
                </div>
                <div>
                  <strong>Lista de categorías:</strong> justo debajo del
                  buscador encontrarás nuestras categorías.
                </div>
                <p>Cuando encuentres el producto que quieres:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Agrega el producto al carrito de compras.</li>
                  <li>
                    Cuando estés listo, da clic en el botón &apos;Ir a carrito y
                    pagar&apos; ubicado dentro del carrito.
                  </li>
                  <li>
                    Ingresa tus datos personales y los datos del domicilio a
                    donde quieres que enviemos tu compra.
                  </li>
                  <li>Ingresa el medio de pago que prefieras.</li>
                  <li>Confirma tu pedido y listo.</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border rounded-lg shadow-sm px-6 py-2 bg-white"
          >
            <AccordionTrigger className="text-indigo-600 hover:text-indigo-700 hover:no-underline text-left">
              ¿En MEM.com tengo los mismos precios y descuentos que en tienda?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2">
              Nuestros precios son los mismos en tiendas que en internet, la
              mayoría de nuestros productos los encuentras disponibles tanto en
              tiendas como en .com
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="border rounded-lg shadow-sm px-6 py-2 bg-white"
          >
            <AccordionTrigger className="text-indigo-600 hover:text-indigo-700 hover:no-underline text-left">
              ¿Encuentro los mismos productos tanto en tienda física como en
              MEM.com?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pt-2">
              Sí, el catálogo es el mismo. Sin embargo, para recibir información
              sobre la disponibilidad de productos en nuestras tiendas puedes
              comunicarte a nuestra línea de servicio al cliente (601) 4073033.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
