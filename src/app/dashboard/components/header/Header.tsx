import { LogOut } from "lucide-react";
import { useUser } from "../../hooks";
import { getRole } from "../../functions";

export function Header() {
  const { user, setUser } = useUser();
  const getColor = (rol: string) => {
    switch (rol) {
      case "admin":
        return "#254ed5";

      case "viewer":
        return "#118B50";

      case "editor":
        return "#FF8000";

      default:
        return "#118B50";
    }
  };

  const closeSesion = () => {
    setUser(undefined);
    localStorage.removeItem("token-vendeyaonline");
    localStorage.removeItem("user-vendeyaonline");
  };
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-6">
          <h3>{user?.username}</h3>
          <div
            className="text-white rounded-md p-2 text-sm"
            style={{ backgroundColor: getColor(user?.role || "") }}
          >
            {getRole(user?.role || "")}
          </div>
          <LogOut className="cursor-pointer" onClick={closeSesion} />
          {/*           <Bell size={20} className="text-gray-600" />
          <Image
            width={50}
            height={50}
            src={Logo}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          /> */}
        </div>
      </div>
    </header>
  );
}
