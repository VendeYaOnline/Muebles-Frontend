import React from "react";
import { Eye } from "lucide-react";

export function UpgradeCard() {
  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-4">
      <h3 className="font-semibold mb-2">Upgrade your plan</h3>
      <p className="text-sm text-gray-600 mb-4">
        Your trial plan ends in 12 days. Upgrade your plan and unlock full
        potential!
      </p>
      <button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium w-full flex items-center justify-center gap-2">
        <Eye size={16} /> See plans
      </button>
    </div>
  );
}
