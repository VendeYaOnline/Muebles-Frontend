import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

interface Props {
  id: number;
  itemSelected: string;
  addDynamicProperty: (key: number, value: string) => void;
  menuItems: { text: string }[];
}

export default function DropdownMenu({
  id,
  menuItems,
  itemSelected,
  addDynamicProperty,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Menu"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="overflow-auto absolute bottom-[10px] left-10 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-[100]">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={
                itemSelected === item.text
                  ? "text-xs w-full px-4 py-1 text-left bg-indigo-600 text-white flex items-center gap-2 transition-colors"
                  : "text-xs w-full px-4 py-1 text-left text-gray-700 flex items-center gap-2 transition-colors"
              }
              onClick={() => {
                setIsOpen(false), addDynamicProperty(id, item.text);
              }}
            >
              <span>{item.text}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
