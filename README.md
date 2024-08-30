# dtlabs

## Instruções de Instalação e Execução

### Pré-requisitos

Antes de começar, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados em sua máquina. Você pode baixá-los e instalá-los a partir do [site oficial do Node.js](https://nodejs.org/).

### Passos para Iniciar a Aplicação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/dtlabs.git
   ```

2. **Navegue até o diretório do projeto:**
    ```bash
    cd dtlabs
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```
4. **Inicie a aplicação:**
    ```bash
     npm start
     ```

4.5 **Usando Docker:**
    ```bash
     docker build -t dtlabs .
     docker run -p 3000:3000 --name dtlabs dtlabs
     ```
5. **Acesse a aplicação:**
    Abra o seu navegador e vá até http://localhost:3000 para ver a aplicação em execução.

### Experiência de Criação do Projeto
    Primeiramente, gostaria de agradecer a toda equipe da dtlabs por me conceder a oportunidade de continuar neste processo que, independente do resultado, foi substancial para meus estudos futuros.

    No pontapé inicial, ao ler a documentação do desafio em destaque, visualizei as competências essenciais a serem avaliadas pela equipe e fiz a leitura diversas vezes do case enquanto olhava o Figma.

### Configuração do Ambiente
    A configuração inicial do ambiente foi bastante tranquila, graças ao Create React App, uma ferramenta fornecida pela equipe do React para configurar novos projetos rapidamente. Com apenas alguns comandos, foi possível configurar toda a estrutura do projeto, incluindo as dependências essenciais, como também a construção das pastas.

### Desenvolvimento
    Durante o desenvolvimento desse caso técnico, focamos em criar componentes reutilizáveis e manter um código limpo e organizado. Utilizei uma biblioteca de gráficos e ferramentas que se integraram bem com o React, como o React Router para navegação e o Axios para requisições HTTP.

    Fiz o start nas telas do LOGIN e o NotFound por serem as mais simples e singulares (não precisariam ser um componente de padronização). Em contrapartida, no Sidebar fiz com que o mesmo fosse um padrão em todas as páginas, ele aloca-se na pasta de components, onde abriga também textos, selects, gráficos e a data. 
    Após isso, iniciei o desenvolvimento do PERFIL, onde também não encontrei muitos problemas em sua estilização, exceto alinhar corretamente as labels, mas por fim deu certo. 
    As telas do DASHBOARD e USUÁRIOS foram utilizados na mesma estilização do table, no entanto não foi possível haver 100% de fidelidade ao case do figma. Isso se justifica no momento em que os dados do back-end foram tratados, que por sua vez tomou conta de boa parte do tempo, assim não foi possível que fosse ajustado algumas margins. 
    Chegando na tela de GRÁFICOS, foi importada a biblioteca Chart.js onde abriga os gráficos, no entanto, a sua confecção se tornou um pouco mais complicada por se tratar de um canva.  


### Desafios Enfrentados
    Tratar os dados do back-end sem dúvidas foi o meu maior desafio. Ligar os dados das vendas ao gráfico e faze-lo fucnionar corretamente.

### Conclusão
    A experiência de fazer esse caso técnico que apesar de ser um processo seletivo, foi extremamente enriquecedora. Além de reforçar conhecimentos em React e JavaScript, também proporcionou uma visão mais ampla sobre o processo de desenvolvimento de aplicações web modernas. 
