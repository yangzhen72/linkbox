import { Category } from "../api";

interface SidebarProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAdd: () => void;
}

export function Sidebar({ categories, selectedId, onSelect, onAdd }: SidebarProps) {
  return (
    <div className="w-48 bg-sidebar h-full p-4">
      <h2 className="text-lg font-bold mb-4">📁 分类</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onSelect(null)}
            className={`w-full text-left p-2 rounded ${
              selectedId === null ? "bg-accent text-bg" : "hover:bg-card"
            }`}
          >
            全部
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onSelect(cat.id)}
              className={`w-full text-left p-2 rounded ${
                selectedId === cat.id ? "bg-accent text-bg" : "hover:bg-card"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={onAdd}
        className="w-full mt-4 p-2 rounded border border-dashed border-gray-600 hover:border-accent"
      >
        + 新增分类
      </button>
    </div>
  );
}