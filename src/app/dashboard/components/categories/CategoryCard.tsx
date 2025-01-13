interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
}

export function CategoryCard({ icon, title }: CategoryCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
      <div className="text-gray-600">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
}
