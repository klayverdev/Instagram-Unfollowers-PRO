import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle2, Code2, Download, Shield, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/refactored_script.js';
    link.download = 'instagram_unfollowers_pro.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Header onDownloadClick={handleDownload} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-display mb-6 text-gray-900">
              Descubra quem não te segue no Instagram
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Uma ferramenta profissional e segura para identificar usuários que não te seguem de volta. Código limpo, interface moderna e totalmente documentada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Baixar Script
              </Button>
              <a href="/documentacao.md" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline">
                  Ver Documentação
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-center mb-12 text-gray-900">
            Melhorias Implementadas
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="card-hover border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Código Refatorado</CardTitle>
                <CardDescription>Estrutura profissional e modular</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Nomes de variáveis descritivos, organização clara com objetos config e state, e tratamento robusto de erros. Código pronto para manutenção e futuras melhorias.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="card-hover border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Interface Moderna</CardTitle>
                <CardDescription>Design elegante e responsivo</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Tema escuro profissional com paleta de cores cuidadosamente escolhida. Barra de progresso aprimorada, feedback visual claro e organização intuitiva da lista de usuários.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="card-hover border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Segurança Reforçada</CardTitle>
                <CardDescription>Proteção contra bloqueios</CardDescription>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>Pausas de segurança otimizadas (10s durante varredura, 5 min a cada 5 unfollows). Verificações de validação de tokens e tratamento de erros de rede.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Improvements Table */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-center mb-12 text-gray-900">
            Comparação: Antes vs. Depois
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Aspecto</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Antes</th>
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Depois</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold text-gray-900">Estrutura</td>
                  <td className="py-4 px-4 text-gray-600">Funções e variáveis globais dispersas</td>
                  <td className="py-4 px-4 text-gray-600">Objetos config e state para encapsulamento</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold text-gray-900">Legibilidade</td>
                  <td className="py-4 px-4 text-gray-600">Variáveis de letra única (e, n, t, o, r, s)</td>
                  <td className="py-4 px-4 text-gray-600">Nomes descritivos e claros</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold text-gray-900">Idioma</td>
                  <td className="py-4 px-4 text-gray-600">Interface em inglês</td>
                  <td className="py-4 px-4 text-gray-600">Totalmente em português</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-4 font-semibold text-gray-900">Tratamento de Erros</td>
                  <td className="py-4 px-4 text-gray-600">Básico com console.error</td>
                  <td className="py-4 px-4 text-gray-600">Robusto com verificações de segurança</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-gray-900">Interface</td>
                  <td className="py-4 px-4 text-gray-600">Tema escuro básico</td>
                  <td className="py-4 px-4 text-gray-600">Design profissional e moderno</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-center mb-12 text-gray-900">
            Como Instalar
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="bookmarklet" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="bookmarklet">Bookmarklet</TabsTrigger>
                <TabsTrigger value="console">Console</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookmarklet" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Método Bookmarklet (Recomendado)</CardTitle>
                    <CardDescription>Instale como um favorito no navegador para acesso rápido</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Copie o código</h4>
                          <p className="text-gray-600 text-sm">Copie o arquivo refactored_script.js completo</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Crie um novo favorito</h4>
                          <p className="text-gray-600 text-sm">No navegador, crie um novo bookmark/favorito</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Cole no campo URL</h4>
                          <p className="text-gray-600 text-sm">Prefixe com <code className="bg-gray-100 px-2 py-1 rounded text-sm">javascript:</code> e cole o código</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Acesse o Instagram</h4>
                          <p className="text-gray-600 text-sm">Navegue até instagram.com e clique no favorito</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="console" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Via Console do Desenvolvedor</CardTitle>
                    <CardDescription>Execute diretamente no console do navegador</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Abra o Console</h4>
                          <p className="text-gray-600 text-sm">Pressione F12 ou Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac)</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Cole o código</h4>
                          <p className="text-gray-600 text-sm">Cole o arquivo refactored_script.js no console</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Pressione Enter</h4>
                          <p className="text-gray-600 text-sm">O script será executado imediatamente</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Usage Guide Section */}
      <section id="guide" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-center mb-12 text-gray-900">
            Guia de Uso
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passo 1: Acesse o Instagram
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Navegue até <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://www.instagram.com/</code> e certifique-se de estar logado na sua conta.
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passo 2: Execute o Script
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Clique no favorito "Instagram Unfollowers PRO" (se usar bookmarklet) ou cole o código no console.
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passo 3: Inicie a Varredura
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Uma interface de sobreposição (overlay) será exibida. Clique no botão <strong>INICIAR</strong> para começar a varredura dos seus seguidores.
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passo 4: Selecione Usuários
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Após a varredura, a lista de não-seguidores será exibida. Selecione os usuários que deseja deixar de seguir usando os checkboxes.
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Passo 5: Deixe de Seguir
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                Clique no botão <strong>Deixar de Seguir</strong> para executar a ação. O script processará cada usuário com pausas de segurança.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-heading text-center mb-12 text-gray-900">
            Aviso de Segurança
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <AlertCircle className="w-5 h-5" />
                  Importante: Leia Antes de Usar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Violação dos Termos de Serviço</h4>
                  <p>O uso de qualquer ferramenta de automação que interaja com a API ou interface do Instagram viola os Termos de Serviço da Meta (empresa dona do Instagram).</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Risco de Bloqueio</h4>
                  <p>O Instagram possui sistemas de detecção de atividades automatizadas. O uso excessivo ou rápido pode resultar em bloqueio temporário ou, em casos extremos, na suspensão permanente da sua conta.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Medidas de Segurança Implementadas</h4>
                  <p>O script refatorado inclui pausas de segurança otimizadas (10 segundos durante a varredura e 5 minutos a cada 5 unfollows) para mitigar o risco de detecção. Porém, o risco persiste.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Responsabilidade do Usuário</h4>
                  <p>Ao utilizar este script, você assume total responsabilidade por quaisquer consequências que possam advir para sua conta. Use com moderação e responsabilidade.</p>
                </div>

                <div className="bg-white p-4 rounded border border-red-200 mt-4">
                  <p className="text-sm font-semibold text-red-900">Recomendação:</p>
                  <p className="text-sm text-gray-700 mt-1">Leia atentamente os Termos de Serviço do Instagram antes de usar qualquer ferramenta de automação.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-display text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Baixe o script refatorado e comece a descobrir quem não te segue de volta no Instagram.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Baixar Script Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
