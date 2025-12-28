import { Button } from "@/components/ui/button";

interface HeaderProps {
  onDownloadClick?: () => void;
}

export default function Header({ onDownloadClick }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IU</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Instagram Unfollowers PRO</h1>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Recursos</a>
          <a href="#installation" className="text-gray-600 hover:text-gray-900 transition-colors">Instalação</a>
          <a href="#guide" className="text-gray-600 hover:text-gray-900 transition-colors">Guia</a>
          <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">Segurança</a>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={onDownloadClick}>
            Download
          </Button>
        </div>
      </div>
    </nav>
  );
}
