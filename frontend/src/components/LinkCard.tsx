import { Link } from "../api";

interface LinkCardProps {
  link: Link;
  onClick: () => void;
}

export function LinkCard({ link, onClick }: LinkCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card p-4 rounded-2xl cursor-pointer hover:scale-105 transition-transform"
    >
      <div className="text-4xl mb-2">
        {link.favicon ? (
          <img src={link.favicon} alt="" className="w-12 h-12" />
        ) : (
          "🔗"
        )}
      </div>
      <h3 className="font-medium truncate">{link.title}</h3>
      <p className="text-xs text-gray-400 truncate">{link.url}</p>
    </div>
  );
}