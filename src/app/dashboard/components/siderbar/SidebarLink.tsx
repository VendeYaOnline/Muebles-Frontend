interface SidebarLinkProps {
  selectItem: () => void;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

export function SidebarLink({
  icon,
  text,
  active,
  selectItem,
}: SidebarLinkProps) {
  return (
    <span
      onClick={selectItem}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer  ${
        active
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{text}</span>
    </span>
  );
}
