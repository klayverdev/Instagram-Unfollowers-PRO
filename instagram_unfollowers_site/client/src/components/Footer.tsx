export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Instagram Unfollowers PRO</h4>
            <p className="text-sm">Uma ferramenta profissional para gerenciar seus seguidores no Instagram.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#installation" className="hover:text-white transition-colors">Instalação</a></li>
              <li><a href="#guide" className="hover:text-white transition-colors">Guia de Uso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Segurança</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#security" className="hover:text-white transition-colors">Avisos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Desenvolvido por</h4>
            <p className="text-sm">klayverdev</p>
            <p className="text-xs text-gray-500 mt-2">Versão 2.0.0</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2025 Instagram Unfollowers PRO - Desenvolvido por klayverdev</p>
        </div>
      </div>
    </footer>
  );
}
