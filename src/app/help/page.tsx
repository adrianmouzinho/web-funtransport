import { Header } from '@/components/Header'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Help() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div className="max-h-screen overflow-y-scroll">
      <Header title="Ajuda" />

      <div className="mb-12 space-y-4 pr-8">
        <p>
          Olá, tudo bem? percebemos que você está enfrentando dificuldades para
          acessar a plataforma web de gerenciamento dos aluguéis, clientes e
          equipamentos da nossa empresa de aluguel de patins, skate e patinetes.
          Entendemos o quão importante é ter um acesso fácil e eficiente a essa
          plataforma para desempenhar suas funções de maneira adequada.
        </p>
        <p>
          Nossa plataforma possui três rotas principais que são essenciais para
          o gerenciamento do nosso negócio. A primeira rota é responsável por
          listar todos os aluguéis ativos no dia. Nessa rota, você encontrará
          uma funcionalidade que permite a confirmação da retirada de um
          equipamento alugado e também a confirmação da devolução do mesmo. É
          importante utilizar essa funcionalidade para garantir a correta
          atualização do status dos equipamentos e fornecer um serviço eficiente
          aos nossos clientes.
        </p>
        <p>
          A segunda rota da plataforma é dedicada ao gerenciamento dos clientes.
          Nessa rota, você terá acesso a todos os clientes cadastrados e poderá
          visualizar suas informações, histórico de aluguéis e outros detalhes
          relevantes. Além disso, é possível cadastrar um novo cliente por meio
          dessa rota, garantindo que todas as informações necessárias sejam
          devidamente registradas.
        </p>
        <p>
          Por fim, a terceira rota permite que você visualize todos os
          equipamentos cadastrados em nosso sistema. Isso inclui patins, skates
          e patinetes disponíveis para aluguel. Você terá acesso às informações
          específicas de cada equipamento, como modelo, número de série e
          disponibilidade. Essa rota também oferece a opção de cadastrar um novo
          equipamento, garantindo que nosso inventário esteja sempre atualizado.
        </p>
        <p>
          Entendemos que essas dificuldades técnicas podem impactar diretamente
          o seu trabalho diário. Para resolver o problema, sugerimos que você
          entre em contato com nossa equipe de suporte técnico imediatamente.
          Nossa equipe está pronta para auxiliá-lo e resolver qualquer problema
          que esteja enfrentando com a plataforma. Eles poderão fornecer
          orientações passo a passo para acessar a plataforma corretamente ou
          solucionar qualquer outro problema que esteja ocorrendo.
        </p>
        <p>
          Valorizamos seu trabalho e reconhecemos a importância do seu papel na
          empresa. Certifique-se de buscar o suporte necessário para resolver
          essa questão e, caso precise de qualquer outra assistência, não hesite
          em nos contatar.
        </p>
        <p>Agradecemos sua compreensão e colaboração.</p>
      </div>
    </div>
  )
}
