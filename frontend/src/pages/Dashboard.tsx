import { useEffect, useState } from "react";
import { api, Category, Link } from "../api";
import { Sidebar } from "../components/Sidebar";
import { LinkCard } from "../components/LinkCard";

export function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    const cats = await api.getCategories();
    setCategories(cats);
    const linkList = await api.getLinks(selectedCategory || undefined);
    setLinks(linkList);
  };

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      link.url.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCategory = async () => {
    const name = prompt("分类名称：");
    if (name) {
      await api.createCategory(name);
      loadData();
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleExport = () => {
    const data = JSON.stringify({ categories, links }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "linkbox-export.json";
    a.click();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        const data = JSON.parse(text);
        // 导入逻辑 - 略过简化版本
        console.log("Import:", data);
      }
    };
    input.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-bg">
      <Sidebar
        categories={categories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
        onAdd={handleAddCategory}
      />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="🔍 搜索网址..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-card p-3 rounded-lg w-80"
          />
          <div className="flex items-center gap-4">
            <button onClick={handleExport} className="text-gray-400 hover:text-white">
              导出
            </button>
            <button onClick={handleImport} className="text-gray-400 hover:text-white">
              导入
            </button>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white">
              退出
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} onClick={() => handleLinkClick(link.url)} />
          ))}
          <div
            onClick={() => {
              const title = prompt("网站名称：");
              const url = prompt("网址：");
              if (title && url) {
                api.createLink({ title, url, category_id: selectedCategory || "", description: "" });
              }
            }}
            className="bg-card p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
          >
            <span className="text-4xl">+</span>
          </div>
        </div>
      </main>
    </div>
  );
}