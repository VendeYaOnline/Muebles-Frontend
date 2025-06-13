"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Package,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

// Definición de interfaces para los datos
interface SalesData {
  month: string;
  sales: number;
}

interface ProductData {
  name: string;
  sales: number;
}

interface OrdersData {
  month: string;
  orders: number;
}

// Datos de ejemplo
const salesData: SalesData[] = [
  { month: "Enero", sales: 12500 },
  { month: "Febrero", sales: 15000 },
  { month: "Marzo", sales: 18000 },
  { month: "Abril", sales: 16500 },
  { month: "Mayo", sales: 21000 },
  { month: "Junio", sales: 19500 },
];

const topProductsData: Record<string, ProductData[]> = {
  Enero: [
    { name: "Laptop Pro", sales: 45 },
    { name: "Smartphone X", sales: 38 },
    { name: "Auriculares Wireless", sales: 32 },
    { name: "Monitor 4K", sales: 28 },
    { name: "Teclado Mecánico", sales: 25 },
  ],
  Febrero: [
    { name: "Smartphone X", sales: 52 },
    { name: "Laptop Pro", sales: 43 },
    { name: "Tablet Air", sales: 36 },
    { name: "Auriculares Wireless", sales: 30 },
    { name: "Smartwatch", sales: 28 },
  ],
  Marzo: [
    { name: "Tablet Air", sales: 58 },
    { name: "Smartphone X", sales: 49 },
    { name: "Laptop Pro", sales: 42 },
    { name: "Smartwatch", sales: 38 },
    { name: "Cámara DSLR", sales: 32 },
  ],
  Abril: [
    { name: "Smartphone X", sales: 61 },
    { name: "Laptop Pro", sales: 47 },
    { name: "Auriculares Wireless", sales: 42 },
    { name: "Tablet Air", sales: 39 },
    { name: "Monitor 4K", sales: 35 },
  ],
  Mayo: [
    { name: "Laptop Pro", sales: 68 },
    { name: "Smartphone X", sales: 59 },
    { name: "Monitor 4K", sales: 48 },
    { name: "Teclado Mecánico", sales: 42 },
    { name: "Auriculares Wireless", sales: 39 },
  ],
  Junio: [
    { name: "Smartphone X", sales: 72 },
    { name: "Laptop Pro", sales: 65 },
    { name: "Smartwatch", sales: 54 },
    { name: "Tablet Air", sales: 49 },
    { name: "Auriculares Wireless", sales: 45 },
  ],
};

const ordersData: OrdersData[] = [
  { month: "Enero", orders: 320 },
  { month: "Febrero", orders: 380 },
  { month: "Marzo", orders: 450 },
  { month: "Abril", orders: 410 },
  { month: "Mayo", orders: 520 },
  { month: "Junio", orders: 480 },
];

const totalOrders: number = ordersData.reduce(
  (sum, item) => sum + item.orders,
  0
);

const COLORS: string[] = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
];

export default function Analysis() {
  const [selectedMonth, setSelectedMonth] = useState<string>("Junio");
  const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);

  const handleMonthChange = (month: string): void => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const pieData: ProductData[] = topProductsData[selectedMonth];

  // Función para formatear valores en el tooltip
  const formatTooltipValue = (value: number): [string, string] => {
    return [`$${value.toLocaleString()}`, "Ventas"];
  };

  // Función para formatear valores en el tooltip de productos
  const formatProductTooltipValue = (value: number): [string, string] => {
    return [`${value} unidades`, "Ventas"];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white mx-4 shadow-sm rounded-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel de Analisis
            </h1>
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowMonthDropdown(!showMonthDropdown)}
              >
                <Calendar className="h-4 w-4" />
                {selectedMonth}
                <ChevronDown className="h-4 w-4" />
              </button>

              {showMonthDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {salesData.map((item) => (
                      <li key={item.month}>
                        <button
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            selectedMonth === item.month
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } hover:bg-gray-100`}
                          onClick={() => handleMonthChange(item.month)}
                        >
                          {item.month}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 py-8">
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Ventas Totales
              </p>
              <p className="text-2xl font-bold text-gray-900">
                $
                {salesData
                  .reduce((sum, item) => sum + item.sales, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>

          {/*           <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pedidos Totales
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalOrders.toLocaleString()}
              </p>
            </div>
          </div> */}

          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Cantidad vendida ({selectedMonth})
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {ordersData
                  .find((item) => item.month === selectedMonth)
                  ?.orders.toLocaleString() || 0}{" "}
                Pedidos
              </p>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfico de ventas mensuales */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Ventas por mes (2025)
              </h2>
              <div className="flex space-x-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => formatTooltipValue(value)}
                    contentStyle={{
                      borderRadius: "0.375rem",
                      border: "none",
                      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="sales" fill="#3A59D1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de productos más vendidos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Productos más vendidos ({selectedMonth})
              </h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    fontSize={13}
                    dataKey="sales"
                    nameKey="name"
                    label={({
                      name,
                      percent,
                    }: {
                      name: string;
                      percent: number;
                    }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      formatProductTooltipValue(value)
                    }
                  />
                  <Legend fontSize={10} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabla de pedidos por mes */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Pedidos por mes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pedidos
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ventas
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Producto Más Vendido
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ordersData.map((item, index) => (
                  <tr
                    key={item.month}
                    className={item.month === selectedMonth ? "bg-blue-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.orders.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${salesData[index].sales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {topProductsData[item.month][0].name} (
                      {topProductsData[item.month][0].sales} unidades)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
