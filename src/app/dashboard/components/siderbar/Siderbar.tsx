import {
  Package,
  Mail,
  PencilRuler,
  Images,
  Star,
  Users,
  HandCoins,
  ChartBarStacked,
  GalleryHorizontal,
  ChartPie,
  AppWindow,
} from "lucide-react";
import { SidebarLink } from "./SidebarLink";
import { Dispatch, SetStateAction } from "react";

interface Props {
  view: number;
  setView: Dispatch<SetStateAction<number>>;
}

export function Sidebar({ view, setView }: Props) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-xl font-bold">VendeYaOnline</h1>
      </div>
      <nav className="space-y-3">
        <p className="text-sm text-gray-500 mb-4">Menu</p>
        <SidebarLink
          selectItem={() => setView(1)}
          icon={<HandCoins size={20} />}
          text="Ventas Recibidas"
          active={view === 1}
        />
        <SidebarLink
          icon={<Star size={20} />}
          text="Productos Star"
          selectItem={() => setView(2)}
          active={view === 2}
        />
        <SidebarLink
          icon={<GalleryHorizontal size={20} />}
          text="Carrusel de %"
          selectItem={() => setView(3)}
          active={view === 3}
        />
        <SidebarLink
          icon={<ChartBarStacked size={20} />}
          text="Categorias"
          selectItem={() => setView(4)}
          active={view === 4}
        />
        <SidebarLink
          icon={<Package size={20} />}
          text="Productos"
          selectItem={() => setView(5)}
          active={view === 5}
        />
        {/*         <SidebarLink
          icon={<ChartPie size={20} />}
          text="Análisis"
          selectItem={() => setView(6)}
          active={view === 6}
        /> */}
        <SidebarLink
          icon={<Mail size={20} />}
          text="Mensajes"
          selectItem={() => setView(7)}
          active={view === 7}
        />
        <SidebarLink
          icon={<PencilRuler size={20} />}
          text="Atributos"
          selectItem={() => setView(8)}
          active={view === 8}
        />
        <SidebarLink
          icon={<Users size={20} />}
          text="Usuarios"
          selectItem={() => setView(9)}
          active={view === 9}
        />
        {/*         <SidebarLink
          icon={<AppWindow size={20} />}
          text="Banner"
          selectItem={() => setView(10)}
          active={view === 10}
        /> */}
        <SidebarLink
          icon={<Images size={20} />}
          text="Galeria"
          selectItem={() => setView(11)}
          active={view === 11}
        />
      </nav>

      {/*       <div className="mt-auto pt-8 absolute bottom-5">
        <SidebarLink
          icon={<Settings size={20} />}
          text="Configuraciones"
          selectItem={() => setView(8)}
          active={view === 8}
        />
           <SidebarLink icon={<HelpCircle size={20} />} text="Help & Support" />
      </div> */}
      {/*    <UpgradeCard /> */}
    </aside>
  );
}
