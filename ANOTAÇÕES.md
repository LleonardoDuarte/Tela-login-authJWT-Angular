# Instalar uma versão especifica do angular

npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@1.4.1

# Anotações gerais.

-Para mais dinamismo na página o professor fez as seguintes alterações:

-deletou os arquivos app.component.html e app.component.scss

-no arquivo app.component.ts apagou o templateURL e o styleURLs

-criou um template e chamou a rota <router-outlet></router-outlet>

# ngOnInit

-Para chamar o ngOnInit no export devemos colocar um implements OnInit e importar ele pelo mesmo local de import do componente. apos isso ja podemos chamar ele dentro do export

-O void caracteriza que nao terá nenhum retorno

# ngOnChange

- Executado sempre que um valor de um controle de entrada dentro do componente é alterado

-O ngOnChanges só é invocado quando há alteração através do @input(), sem ele nao irá funcionar

# ngDoCheck() e filhos:

- ngDoCheck(): Sempre que os componentes inicializam e verificam os valores ele é chamado

--- # ngAfterContentInit(): Invocado quando se tem a realização de alguma projeção de conteudo, apertar um botão por exemplo.

--- # ngAfterContentChecked(): Invocado quando o contentInit detecta alteração

--- # ngAfterViewInit(): Invocado quando todos os componentes forem visualizados

---# ngAfterViewChecked(): Invocado quando todos os componentes ja forem verificados pelo viewInit

# ngOnDestroy()

- É usado sempre que destruimos algum componente

# @input()

- O input sempre vem antes da declaração da sua variavel e ele serve para que voce consiga realizar mudanças dos dados em outros arquivos com esta mesma variavel, entao se eu declaro por exemplo uma variavel title com nome "ola", porem quero alterar direto pelo seletor, obrigatoriamente eu preciso colocar @input() antes da variavel, se nao o angular nao ira realizar a alteração desejada.

# Data Binding

- Data Binding basicamente são formas de se trabalhar com dados e exibilos atraves de algumas opções

--- interpolation {{}}

--- Property binding <button [disabled]='disabled'>Button<button> || <img [src]='itemImageUrl'>

--- Event Binding <button (click)='calc()'>Button<button>

--- two way data binding <input [(ngModel)]='nome'> Este modelo escuta e executa ao mesmo tempo

informação importante, para usar o two way bindin deve-se importar o formsModule no app.module

# Diretivas de atributo

Alteram a aparencia ou comportamento de um elemento, componente ou diretiva

- ngClass: adiciona e remove um conjunto de classes css

- ngStyle: adiciona ou remove um conjnto de estilos HTML

- ngModel: adiciona vinculação de dados bidirecionais a um elemento de formulário HTML

# Diretivas estruturais

Moldam ou remodelam a estrutura do DOM, adicionando, removendo e manipulando os elementos do host aos quais estão anexados

- ngIf: condicionalmente cria ou descarta visualização de modelo

- ngFor: repete um nó para cada item de uma lista

- ngSwitch: um conjunto de diretivas que alternam entre visões alternadas.

- ngSwitchDefault: Deixa uma mensagem padrao que pode ser o aviso do que digitar, um erro, etc...

# Diretivas de atributos

- ngClass: adiciona classe css ao componente HTML, pode ser usado para fazer validações também ex:<p [ngClass]="{ active: true, disabled: false }">texto</p>

- ngStyle: assim como o ng class adiciona classe ao componente css e pode fazer validações.

- ngModule: A diretiva [(ngModel)] é uma diretiva bidirecional que utiliza-se em input de formulario, para usar este model é necessario dentro do arquivo app.module.ts realizar o import do FormsModule e coloca-lo dentro dos imports, caso contrario o ngmodel ira acusar erro, segue import:import { FormsModule } from '@angular/forms';

- ng-template: O ng template serve para que possamos encapsular dados para realizar validações atraves de ng if e isso ser realizado antes do carregamento da DOM

- ng-content:Serve para poder mostrar o conteudo HTML adicionado direto no APP component sem precisar de um seletor de componente, alem disso voce pode direcionar o conteudo para onde voce quiser.

- pipes: O pipe é responsavel por pegar as informações das interpolations e poder modificalas, para usar o pipe basta voce dentro da interpolation ou dentro da tag HTML usar a barra | que representa o pipe

# Module (@ngModule)

- Module é um mecanismo para agrupar components,diretivas,pipes e serviços relacionados,de forma a combinar com outros modulos para criar um app

- Para conseguirmos realizar o uso dos componentes dentro de um novo modulo devemos primeiro importar o componente no modulo que voce quer e colocar este componente no declarations e criar um exports e colocar la tambem, exemplo:

declarations:[component],
exports:[component],

feito isso voce vai ate o app module e importa o seu module, importando ele voce vai nos imports e declara ele lá, apartir dai voce ja pode usar o seletor no app component.

# Comunicação entre componentes

- A comunicação entre componentes basicamente usa o @input e @output , como os nomes sugerem o input serve para a entrada de dados e o output para a saida, em uma cascata de cima para baixo as informaçoes dos componentes pais sao passadas aos componentes filhos atraves do input, quando um componente filho deseja voltar informaçoes acima usa-se o output

# Service

- Services são úteis para salvar regras de negócio, pegar informações advindas do servidor (API) (seja por get, post, put, etc...), atualizar e mandar informações a outros componentes.

- Nas versões mais atuais do angular o service ja vem com o @injectable como 'root' entao ele ja funcionará em toda aplicação, sem necessidade de importar nada.

- Para fazer a injeção de dependencia do nosso service em outro componente dentro do constructor no valor devemos colocar uma variavel publica ou privada dar um nome e chamar o nome do service, exemplo: Constructor(private foodListService: FoodListService){}, alem disso importar o service nos imports.

- Para chamar o método que contem as informaçoes da lista no nosso service no meu componente, primeiro devo criar uma variavel tipada (public foodList: Array<string> = [];) depois no ngOnInit eu chamo essa variavel dizendo que ela é = ao service.nomedométodo ( this.foodList = this.foodListService.foodList();) apartir dai posso usar o método no HTML para pegar as informaçoes.

# Comunicação entre componentes sem uso de input e output (usando services)

- Para que haja a comunicação entre dois componentes nos precisamos utilizar a injeção de dependencia no componente e criar a função desejada dentro do nosso service.

# Subscribe

- Subscribe é uma forma e enviar dados atraves de inscrição, voce emite os dados atraves de um eventEmitter no seu server e pode receber os dados atraves de inscrição no seu componente dentro do ngOnInit., exemplo:

  <!-- Server -->

  public emitEvent = new EventEmitter();

  public foodListAlert(value: string) {
  return this.emitEvent.emit(value);
  }

  <!-- Component/ngOnInit -->

      this.foodListService.emitEvent.subscribe(
        (res) => alert(`Você adicionou o item ${res}`)

  );

# Fake Server e Requisição get

- É possivel realizar a criação de um server fake para testes e outras coisas sem precisar necessariamente de criar um teste, para isso deve-se ter instalado no computador o json-server (npm install -g json-server) e depois depois na mesma hierarquia do projeto deve-se criar um arquivo db.json e apartir dai colocar os dados lá.

- Após colocar os dados para iniciar o servidor devemos estar na pasta do arquivo json e digitar no terminal json-server --watch db.json onde ele irá startar o server para que seja usado e poder pegarmos os dados

- Para que nos possamos realizar a requisição API na nossa API fake primeiro dentro do seu módulo onde contem os componentes que voce irá usar os dados da API deve-se importar o httpClientModule e colocar nos imports, apartir dai ja podemos usar.

- Para usar os dados do server fake agora que ja temos o import no module, iremos no nosso service e criaremos primeiro uma variavel private como url (private url:string = 'http://localhost:3000'), depois criaremos uma injeção de dependencia no constructor trazendo o import do httpClient (private:http = httpClient) e apartir dai chamar p método para uso dos dados.
  <!-- Exemplo: -->

  public foodList(): Observable<Array<FoodList>> {
  return this.http.get<Array<FoodList>>(`${this.url}list-food`).pipe(
  (res) => res,
  (error) => error
  );
  }

- Vale lembrar que é necessario tipar a nossa requisição, para isso chamamos o Observable para ficar "escutando" a requisição e depois atraves dos <> devemos criar uma tipagem a parte com os dados que queremos trazer, também vale comentar que o pipe seria o "qual o proximo passo".

- Na chamada da nossa requisição via component teremos que mudar tanto a variavel criada quanto o método de chamada, segue os exemplos

<!-- Variavel -->

public foodList: Array<FoodList> = []; aqui tiramos o array como string e trazemos nossa tipagem ou qualquer coisa.

  <!-- ngOnInit -->

      this.foodListService.foodList().subscribe(
      (res) => (this.foodList = res),
      (error) => error
    );

# Requisição Post

- Exemplo de requisição com post:

  public foodListAdd(value: string): Observable<FoodList> {
  return this.http
  .post<FoodList>(`${this.url}list-food`, { nome: value })
  .pipe(
  (res) => res,
  (error) => error
  );
  }

  - Vale lembrar que para que esta requisição funcione é necessario que o recebedor da informação tenha o subscribe() senão não irá funcionar

  # Requisição Put

  Exemplo de aplicação put via http

  # Requisição Delete

    <!-- Service -->

  public foodListPut(value: string, id: number): Observable<FoodList> {
  return this.http
  .put<FoodList>(`${this.url}list-food/${id}`, { nome: value })
  .pipe(
  (res) => res,
  (error) => error
  );
  }

    <!-- Component -->

      public foodListPut(value: string, id: number) {
      this.foodListService.foodListPut(value, id).subscribe(
        (res) => console.log(res),
        (error) => error
      );

  }

  - Vale lembrar que a função put está sendo passada como um evento keyup.enter no input do html
  Exemplo de aplicação de delete via http

    <!-- Service -->

  public foodListDelete(id: number): Observable<FoodList> {
  return this.http.delete<FoodList>(`${this.url}list-food/${id}`).pipe(
  (res) => res,
  (error) => error
  );
  }

    <!-- Component -->

  public foodListDelete(id: number) {
  return this.foodListService.foodListDelete(id).subscribe(
  (res) => {
  this.foodList = this.foodList.filter((item) => {
  return id !== item.id;
  });
  },
  (error) => error
  );
  }

  - Vale lembrar que a função put está sendo passada como um evento no botão de delete

  # Formulários (ngForm)

  - O ngForm é uma forma de construção de formulários usando proprio serviço do angular, para usar o ngForm devemos primeiramente importaro formsModule no seu module e usar o ngForm dentro da tag HTML form, ex:
  <form #form ngForm>

  # Reactive Forms

  - Reactive forms é uma outra forma de se trabalhar com formulários no angular, em comparação com o template-drivel-form o reactive forms se mostra mais interessante para uso, principalmenmte para manucanção e tratamento de erros

  - Para começarmos a usar o reactive forms devemos realizar o seu import no app.module e chama-lo no imports.
    import { ReactiveFormsModule } from '@angular/forms';, apartir dai ja se consegue realizar a sua utilização.

  - Para uso do FormBuilder devemos importa-lo dentro do arquivo ts do nosso componente e coloca-lo em injeção de dependecia no constructor
    import { FormBuilder } from '@angular/forms';
    constructor(private fb:FormBuilder) { }

  - Diferente do FormControl no [formGroup] para que consigamos pegar as informaçoes pelas interpolations devemos chamar como se fosse uma requisição, exemplo: {{ cadastroForm.get("firstName")?.value }}, nesse caso a ? serve para realizar uam validação de "se existir exiba, se nao existir nao faça nada", lembrando que sem a ? a aplicação irá se quebrar.

  # Validator

  - Validator são formas de realizar validações nos inputs dos nossos formulários, para usar o validators deve-se importa-lo e usar dentro do seu array de objetos, exemplo:
    <!-- import -->

    import { Validators } from '@angular/forms';

      <!-- array de objetos -->

    public cadastroForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    });

    - No Validator existe algumas iterações que voce coloca nas interpolações, as mais comuns são o .errors (ira mostrar se existe erro no envio), .touched (quando se toca no formulário e sai ele passa para true), dirty(quando se digita alguma coisa ele passa para true)

# Rotas no angular

- Para colocar nossas rotas usamos o arquivo app routing module e usamos um array de objeto com cada rota.

- Sempre na sua página principal onde o path será '' (vazio) deve-se usar o pathMath:'full' para evitar que o angular reinderize coisas a mais, nas proximas páginas não é necessário usar o pathMath.

- A rota coringa é a rota onde qualquer rota que a pessoa digite e nao existe irá direcionar para a rota coringa, normalmente usa-se no path ** para o evidenciamento desta rota, ficaria assim: {path:"**", redirectTo:'404'}, nesse exemplo estou solicitando o redirecionamento para página de erro porém eu posso redirecionar para a home, ou qualquer página que eu queira.

- Para navegação entre páginas usamos o routerlink="valor", vale salientar que como boa prática é importante usar chaves [] para colocar a sua rota pois se tivermos uma rota parametrizada fica facil de poder pegar algo especifico, exemplo:
  <a [routerLink]="['/dashboard']">, vale ressalva que quando queremos usar as chaves [] na rota também temos que usar ela no routerlink assim como exemplo acima.

# Rotas Ativas

- Rotas ativas são ferramentas para mostrar em destaque quando voce estiver na rota especifica, adicionando estilo ao seu componente, para usar rotas ativas usamos [routerLinkActive]="" e [routerlinkActiveOptions]="", basicamente significa "quando minha rota estiver ativa faça isso", exemplo de adição de classes com rotas ativas:

<!-- exemplo de adição de estilização com classe -->

[routerLinkActive]="['active']" nesse caso active muda o background-color e a color

O options é usado quando quero que seja acionado a classe quando apenas exatamente for direcionado para aquela rota especifica, se nao usarmos o options a home sempre irá ter o valor estilizado se estiver usando o o routerLinkActive
[routerlinkActiveOptions]="{exact:true}"

# Rotas Parametrizadas

- Rotas parametrizadas são rotas que usamos para pegar informações a mais como id, username, password por exemplo

- Para criarmos uma rota parametrizada basta colocarmos as informaçoes desejadas por exemplo:
  {path:'/parametrizada/:id/:username'}

- Para usarmos a rota parametrizada com id, username e outras informaçoes precisamos do ActiveRoutes que usaremos como injeção de dependencia no constructor do nosso componente, exemplo:
  constructor(private activeRoute:ActivatedRoute) { }

- Depois de realizar a injeção ai chamamos dentro do ngOnInit nossa incrição, exemplo:
  this.activeRoute.params.subscribe((res) =>
  console.log(res, res.id, res.username))
  Nesse caso acima minha rota tem id e username

<<<<<<< HEAD
OBS: Para que possamos verificar os valores como res.valor é necessario no arquivo tsconfig.json colocar de true para false o seguinte parametro: "noPropertyAccessFromIndexSignature": false, se ele estiver true voce so conseguirá acessar o valor atraves de um array res.['valor']

- Para acessar a rota com sucesso devemos passar na rota o id e o username exemplo:
  http://localhost:4200/parametrizada/1/leonardoDuarte

  - Para mudança de tela apartir do nosso arquivo TS de um componente devemos realizar a injeção de dependencia importando o Router e depois chamar essa injeção no ngOnInit passando uma rota, segue exemplo abaixo:

    <!-- Constructor -->

    constructor(private router:Router) {}

      <!-- Nesse exemplo especifico foi usado setInterval para demonstrar como chamar a rota -->

    setInterval(() => {
    this.router.navigate(['nomedapagina'])
    }, 5000)

    - A diferença entre usar .navigate() e .navigateByUrl() é que quando usamos apenas navigate nao á reload da página, já com o byUrl existe o reload da página

  # Rotas filhas

  - Como proprio nome diz rotas filhas são rotas que podem ser incrementadas dentro de uma rota já especificada, para iso usamos a opção children após o component e usamos um array de objetos para especificar a proxima rota, exemplo de rotas filhas:

  { path: 'sobre', component: SobreComponent, children:[
  {path: 'contato', component: contatoComponent}
  ] }

  # lazy loading

  - lazy loading é um carregamento tardio de rotas filhas, ele melhora a performance da sua página quanto ao carregamento pois dependendo da quantidade de componentes e rotas filhas que sua página tem pode ficar extremamente pesada, o lazy loading ajuda no direcionamento do carregamento dos componentes, se voce acessar uma página da aplicação o lazy loading carrega apenas aqueles componentes daquela rota, quando voce acessa outra rota filha ele muda, assim nao existe um carregamento total e pesado de toda aplicação

  - Para usar o lazy loading primeiramente é obrigatorio termos um módulo e um arquivo de module para as rotas, pois é apartir do módulo que irá se iniciar seu direcionamento. Lembrando que o lazy loading por trabalhar com rotas filhas ele nao trabalha com forRoot, entao no nosso arquivo routing module devemos sempre prestar atenção no ngModule para usarmos forChild e nao forRoot.

  - Para usar o lazy loading no nosso component root devemos primeiro configurar os componentes dentro do routing que será o lazy loading e depois carregar a seguinte rorta dentro do nosso module root:
    {
    path: 'dashboard',
    loadChildren: () =>
    import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    }, nesse exemplo o dashboard é nosso module que contem os componentes que seráo os filhos.

  - Vale lembrar que isso implica muito em performance, quando voce usa essas rotas filhas com lazy loading estes componentes so são baixados quando a pessoa acessa a rota, entao o carregamento fica a cargo da pessoa acessar ou nao aquela rota.

  # useHash

  - o Hash (#) é usado quando voce quer passar a sua aplicação web para um app, alguns brownsers nao entendem a estratégia de rotas e precisam do uso de hash porem isso hoje em dia é pouco comum. Se voce for construir um app da sua aplicação web usando um sistema antigo como cordova por exemplo talvez voce precisa usar a estratégia de hash.
    Basicamente dentro do seu module routing principal voce adiciona um hash:true, exemplo:
    imports:[RouterModule.forRoot(routes), {useHash:true}]

- Para acessar a rota com sucesso devemos passar na rota o id e o username exemplo:
  http://localhost:4200/parametrizada/1/leonardoDuarte

# Sobre rotas e mudança de página no angular

- Para realizar a mudança de página no angular cria-se uma nova rota no arquivo app routes e o path devera ser o que voce deseja que seja colocado no / e no component devera ser o novo componente, exemplo de duas rotas:
  export const route:Routes = [

{
path:'',
component: HomeComponent
}
{
path: 'chat',
component: PaginaComprasComponent
}
]

- Quando quisermos adicionar a função de mudar de página para um botao por exemplo deve-se criar o evento no botao, no component ts deve-se no constructor importar o router e colocar o caminho no botao, exemplo:
  <button (click)='MudarPagina()'></button>

Constructor(private router:Router){}

public MudarPagina(){
this.router.navigate('PaginasComprasComponent')
}

Apartir dai quando se clicar no botao ele direcionara para a página desejada

# API PokeDex

- Para começar importamos copiamos um reset especifico de um site para o reset geral do scss, o site é :https://meyerweb.com/eric/tools/css/reset/, depois setamos as colors em outro arquivo scss atraves do :root e criamos um novo arquivo scss de calculo de pixels para rem, para usarmos apenas rem nesse projeto, com isso chamamos os tres arquivos para o nosso styles.scss atraves do @use

- Primeira parce criamos um modulo home dentro de pages, depois criamos o componente home dentro de pages, após a criação do component criamos outro arquivo dentro de pages chamado routing.module.ts onde iremos criar uma rota padrao usando forChild no nosso ngModule, Apartir disso criamos uma rota forChildren no nosso app-routing-module.ts e chamamos nosso pages.module.ts que está com o import do routing module.

- Observação importante, nos próximos componentes a serem criados, como usamos uma rota filha para chamar nosso home component ele irá pedir especificação de qual module devemos usar, para isso usamos --module e o nome antes de colocar as pastas, exemplo: ng g c --module pages pages/details. Ao criar este novo componente devemos criar uma rota para ele no arquivo routing module ts e confirmar se ele está importado e declarado no nosso home module.

- No próximo passo criamos outro module chamado shared que será responsavel pelas informaçoes compartilhadas, o shared module deve ser importado no nosso module pages que está cuidando da home, no module shared criamos um componente para a header, outro para a barra search e outro para o main do site que no caso é a lista, exportamos eles no nosso module shared. Após isso devemos importar o seletor deles dentro da nossa home html e apartir dai ira funcionar.

- Uma informação importante sobre o sass é que no uso do @import pode acontecer erro pois os sass está descontinuando o us
  o do @import e substituindo por @use, devemos sempre conferir se o seletor que escolhemos para usar está funcionando ou não.

- Depois de todas as estilizações é a parte de trazer a API, para isso criamos um server chamado pokeAPI, antes de realizar as configurações na pokeAPI devemos importar o httpClientModule (import {HttpClientModule} from '@angular/common/http') e coloca-lo nos imports do nosso module principal que é o app.module.ts

- No nosso server pokeAPI iremos fazer uma injeção de dependencia no constructor chamando o httpClient (private http:HttpClient), apos isso criaremos uma função porem ao inves de usarmos public iremos usar o get também funciona, precisamos tambem adicionar um observable para ficar escutando, no caso da tipagem do observable devido a api ser muito grande o profesor decidiu nao tipar para nao complicar mais e usar apenas any.
  get apiListAllPokemons(): Observable<any> {
  return this.http.get<any>(this.url);
  }

- Importante, nesse caso especifico a nossa url so retorna o nome do pokemon e um link para as outras informaçoes, nesse caso para pegar as informaçoes dessa nova url usaremos um método do rxjs chamado tap, que tem função parecida com o map() porem podemos nele adicionar próximos passos, que nesse caso iremos dar o get na api e como proximo passo entrar na url das informaçoes dos pokemons.

- Após isso devemos importar nosso service no nosso componente lista que ira receber as informaçoes dos pokemons, o importa acontece por injeção de dependencia no constructor (private pokeApiService: PokeApiService) e depois instanciamos no nosso ngOnInit: this.pokeApiService.apiListAllPokemons.subscribe((res) => res);, apartir dai ele ja irá exibir as informaçoes iniciais da api no log, como foi identificado que ele trouxe os dados da api pelo console log, podemos agora entao fazer um map para poder pegar os dados dos pokemons avançando na api

- Para que consigamos realizar o direcionamento das rotas quando clicarmos no card de cada pokemon, na rota details adicionaremos o /:id para que ele possa puxar pelo id do pokemon. Após isso chamamos um [routerlink]='' no nosso A que contem todo conteudo e colocamos como parametro nossa 'details' porem com nosso pokemon que está armazenando cada id, ficaria assim: <a [routerLink]="['details',pokemon.status.id]" >

- Para que possamos receber os dados dos pokemons na página details, primeiramente iremos ter de importar o ActivatedRouter como injeção de dependencia no constructor para podermos atraves dele recuperar o id do pokemon, Após isso criamos um método para poder resgatar o id:
  get pokemon() {
  const id = this.activatedRouter.snapshot.params['id'];
  return console.log(id);
  }

  - Após isso para que consigamos resgatar os dados dos pokemons precisamos criar as url's onde estão armazenados os dados dos pokemons, nesse caso trazemos a url de pokemon e name:
    private urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
    private urlName = 'https://pokeapi.co/api/v2/pokemon-species';

  Depois chamamos estas url's dentro do nosso método:
  get pokemon() {
  const id = this.activatedRouter.snapshot.params['id'];
  const pokemon = this.pokeApiService.apiGetPokemons(
  `${this.urlPokemon}/${id}`
  );
  const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);
  return console.log(id, pokemon, name);
  }

  - Após isso iremos trabalhar com forkJoin que é um método da biblioteca rxjs e que tem como função realizar buscas ao mesmo tempo, nesse caso especifico ele servirá para buscar as duas url's ao mesmo tempo sem precisar de utilização do subscribe varias vezes:
    get pokemon() {
    const id = this.activatedRouter.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemons(
    `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe((res) => {
    console.log(res);
    });

    - Com isso nós ja consigamos resgatar as informaçoes do pokemon utilizando o id especifico dele, apos isso ao inves de printarmos as informaçoes no logo nos iremos passar esse valor res para nossa declaração pokemon e apartir dai usar no HTML.
      get getPokemon() {
      const id = this.activatedRouter.snapshot.params['id'];
      const pokemon = this.pokeApiService.apiGetPokemons(
      `${this.urlPokemon}/${id}`
      );
      const name = this.pokeApiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe((res) => {
    this.pokemon = res;
    this.isLoading = true;
    });
    }

  - Para o tratamento dos erros que irão aparecer no HTML mediante a o carregamento onde o angular ja irá sair verificando tudo mesmo antes de carregar, iremos colocar todo nosso codigo html em um <ng-template> onde teremos um if que será nossa declaração isLoading, quando isLoading ainda estiver true ele nao exibirá nada até que tudo seja carregado e verificado, assim apos isso nos carregamos as informaçoes e previmos os erros, ficou assim: <nf-template [ngIf]="isLoading">O isLoading so passará como true quando nosso pokemon receber as informaçoes, por isso colocanos ele como true no método acima.

  - Para estilizar algumas animações retiramos algmas animações do site https://www.theappguruz.com/tag-tools/web/CSSAnimations/ e criamos um novo arquivo scss nas nossas configs de scss e importamos no nosso styles para pdoer usar.

  # Testes unitários

  - Para testes unitarios com Angular usaremos as bibliotecas karma e jasmine. Karma é um test runner do proprio javascript, já o jasmine é um framework para escrever testes com codigo javascript, iremos escrever nossos testes com jasmine.

  - Dentro de um teste unitario antes de realizar a descrição dos trstes usa-se o beforEach para instanciar algum módulo ou importação de algum componente necessário para a realização do teste, para isso usamos uma async function e await. No caso do TesteBed é um componente necessário para a inicialização das configurações dos testes unitários

  - Para gerar o incializador de teste no terminal usa-se normalmente o ng test, porem usando ng test --code-coverage o angular nos traz maiores informaçoes que podem ser melhores do que usando apenas o angular test. No caso do ng test --code-coverage o proprio angular te mostra o que voce nao testou para que voce consiga assim organizar os testes e deixar seu software 100% testado.

  - Depois da configuração do módulo de testes vem a descrição dos testes em sí onde e composto pelo it que pode ser traduzido como um "teste isso" seguido de ('descrição simples do que vai testar', arrow function { e a lógica aqui dentro})

  - Se ficar na duvida qual componente faltou ser testado basta entrar na pasta coverage, entrar no index.HTML e ir para o live server onde poderá entrar e ser indicado pelo jasmine

  - Para realizar nosso primeiro teste criaremos um componente chamado banking que terá algumas funções a serem testadas, nessas funções basicamente criamos um sistema de banco onde atraves do input digitado o valor é adicionado de um input para o outro, um valor referenciando uma poupança e a outra a carteira do cliente.

  - O primeiro teste que iremos criar na nossa aplicação será do nosso getPoupança que é uma função que tem como objetivo pegar o valor da variavel poupanca,iremos verificar se o valor que ele pegou é realmente o valor da poupanca:
    it('(U) getPoupanca(): should poupanca have value 10', () => {
    expect(component.getPoupanca).toEqual(10);
    });

  - Agora vamos verificar se nossa carteira realmente tem o valor de 50:
    it('(U) getCarteira() should have carteira = 50', () => {
    expect(component.getCarteira).toEqual(50);
    });

  - Terceiro teste irá testar se o setSacar está transferindo os valores para a poupança:
    it(`(U) setSacar: should transfer poupanca from carteira`, () => {
    component.setSacar('10');
    fixture.detectChanges();

    expect(component.getPoupanca).toEqual(0);
    expect(component.getCarteira).toEqual(60);
    });

  OBS: Nesse teste o '10' do setSacar tem que ser como string pois ele só converte dentro da funcionalidade

  - Quarto teste ira testar se o setDepositar esta transferindo os valores para a poupanca:
    it('(U) setDepositar(): should transfer carteira from poupanca', () => {
    component.setDepositar('50');
    fixture.detectChanges();
    expect(component.getCarteira).toEqual(0);
    expect(component.getPoupanca).toEqual(60);

    });
    };

- Aqui eu testo so dois if's de cada funcionalidade:
  it('(U) setSacar(): should transfer poupanca dont have string (isNaN) or poupanca < value...', () => {
  expect(component.setSacar('string')).not.toBeTruthy();
  expect(component.setSacar('100')).not.toBeTruthy();
  expect(component.getPoupanca).toEqual(10);
  expect(component.getCarteira).toEqual(50);
  });

  it('(U) setDepositar(): should transfer poupanca dont have string (isNaN) or poupanca < value...', () => {
  expect(component.setDepositar('string')).not.toBeTruthy();
  expect(component.setDepositar('100')).not.toBeTruthy();
  expect(component.getPoupanca).toEqual(10);
  expect(component.getCarteira).toEqual(50);
  });

  - Aqui realizamos alguns testes de tela para verificar se no HTML realmente os valores que testamos estáo sendo passados de forma correta.

    it('(I) setDepositar(): should transfer carteira from poupanca in HTML', () => {
    let element = fixture.debugElement.nativeElement;
    element.querySelector('#input-depositar').value = '10';
    element.querySelector('#depositar').click();
    fixture.detectChanges();

    expect(element.querySelector('#get-poupanca').textContent).toEqual(' 20 ');

    Obs: Nesse teste para verificar os valores de HTML foi necessario colocar id's nos componentes para poder puxar as tags para realizar o teste, importante salientar que só sera possivel o teste funcionar se adicionarmos os espaços antes do numero no toEqual, isso porque quando salvamos a interpolation {{}} ele coloca um espaço antes e depois.

    - Aqui fizemos o mesmo teste porem trocando os id's e verificando se nossa carteira está recebendo o valor do saque.
      it('(I) setSacar(): should transfer poupanca from html in HTML', () => {
      let element = fixture.debugElement.nativeElement;
      element.querySelector('#input-sacar').value = '10';
      element.querySelector('#sacar').click();
      fixture.detectChanges();
      expect(element.querySelector('#get-carteira').textContent).toEqual(' 60 ');
      });
      });

  # Testes Unitários utilizando um Service

  - Primeiro passo será criar um novo componente chamado investiments, esse componente contem um array de objetos tipado e trabalharemos com ele por enquanto, para começarmos os testes quando olhamos o terminal de testes ele ja alerta que é necessario verificar esse novo componente pois o angular ainda nao o reconhece na aba de testes, para isso devemos importar seu seletor dentro do declarations do arquivo spec de banking que é nosso componente principal, todo componente novo criado na mesma sequencia de banking deverá estar importado lá para podermos testar, porem a descrição de testes é feita individualmente em cada componente, a menos que exista alguma interação entre o componente pai e filho que deverá see testada pelo principal.

  - Começando os testes do comnente foram realizados algums verificações de valor e nome no mesmo:
    it('(U) should list investiments', () => {
    let investiments = component.investiments;
    expect(investiments.length).toBe(4);
    expect(investiments[0].name).toEqual('itaú');
    });

  - Para teste de tela foram criadas as seguintes verificações:

    it('(I) should list investiments HTML', () => {
    let investiments =
    fixture.debugElement.nativeElement.querySelectorAll('.list-itens');
    expect(investiments.length).toBe(4);
    expect(investiments[0].textContent.trim()).toEqual('itaú - 100');
    });

    importante: Quando temos uma lista e precisamos testar tudo e temos apenas uma classe usamos querySelectorAll que ja fica embutido em todas como todas tem a mesma classe, outra questão é que nao devemos verificar se contem no html igual passamos no unitário pois no html fica em forma de texto, para isso itemos o textContent e assim podemos fazer a verificação. Outra questão é que quando vamos usar os testes de HTML ele considera os espaços antes e depois gerados nas interpolações, para resolver ou usamos espaços no valor ou apos o textContent.trim() usamos o trim que resolve]

    - Começando teste com service primeiramente criaremos um service dentro da pasta investiments, criaremos um método chamado url tipo string com a url que iremos consumir, após isso fazemos a importação do httpclientmodule no nosso app module e chamamos o get atraves do nosso server:

      constructor(private http: HttpClient) {}
      public list(): Observable<Investiments> {
      return this.http.get<Investiments>(this.url).pipe(map((res) => res));
      }

    - Após isso iremos chamar esse service no nosso componente list e verificar em console log se as informaçoes já estão aparecendo:

  constructor(private listInvestiments: ListInvestimentsService) {}

  ngOnInit(): void {
  this.listInvestiments.list().subscribe((res) => console.log(res));
  }

- Agora iremos testar nossos serviços para verificar se está tudo ok, importante salientar que nos devemos testar aquilo que fizemos e nao as informaçoes da api porque se a api cair ou algo do tipo isso tratá problemas para a sua aplicação.

- Primeiro passo importamos os testadores de module e controller:
  import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

- Após isso importamos o module dentro de imports no nosso beforEach e para o controler criamos uma variavel para armazenar e depois cadastramos ele para poder usar:

  describe('ListInvestimentsService', () => {
  let service: ListInvestimentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
  TestBed.configureTestingModule({
  imports: [HttpClientTestingModule],
  });
  httpTestingController = TestBed.inject(HttpTestingController);
  service = TestBed.inject(ListInvestimentsService);
  });

  - Para testar as requisições usaremos o HttpClient entao deveremos importa-lo,criar uma variavel para ele e cadastra-lo para usar posteriormente:

    import { HttpClient } from '@angular/common/http';
    let httpClient:HttpClient

    httpClient = TestBed.inject(HttpClient);

  - Após isso iremos substituir as informaçoes do nosso banking pelas informaçoes vindas da api:

<!-- aqui apagamos o array e colocamos o ! -->

public investiments!: Array<Investiments>;

<!-- Aqui adicionamos a tipagem Array junto de investiments -->

constructor(private http: HttpClient) {}
public list(): Observable<Array<Investiments>> {
return this.http.get<Array<Investiments>>(this.url).pipe(map((res) => res));
}

<!-- Aqui Colocamos as informações vindas da API na nossa variavel investiments. -->

this.listInvestiments.list().subscribe((res) => (this.investiments = res));

- Após isso iniciaremos a criação de um teste, para isso criaremos um mockList com dados parecidos da nossa requisição para verificar se está tudo ok, apartir dai escreveremos o primeiro teste que valida algumas informaçoes do nosso mockList:

  <!--  o done basicamente encerra o teste quando usamos ele ao fim de tudo -->

  it('(U) should be list all investiments', (done) => {
  service.list().subscribe((res: Array<Investiments>) => {
  expect(res[0].name).toEqual('Banco 1');
  expect(res[0].value).toEqual(100);

      expect(res[4].name).toEqual('Banco 5');
      expect(res[4].value).toEqual(10);
      done();

  });

  <!-- Nessa parte primeiro ele verifica se a url é igual a passada, e depois no flush digo que o retorno tem que ser nossa mockList -->

  const req = httpTestingController.expectOne(URL);
  req.flush(mockList);

  <!--  Aqui eu digo que eu espero que o método de requisição seja um get -->

  expect(req.request.method).toEqual('GET');
  });

  - Agora que testamos no service precisamos testar no componente que está recebendo os dados, para isso primeiro iremos transferir a mockList para um componente isolado dentro da pasta service para podermos importar onde quisermos, depois disso realizaremos o import da mocklist dentro do nosso list component que contem o recebimento dos dados da nossa api

# Correção dos erros que surgirão

- É importante salientar que após todas as mudanças verificaremos que os testes que realizamos anteriormente não funcionarão mais devido a um erro de circulo de http, para corrigir isso devemos utilizar o HttpClientTesteModule, basicamente importamos este método dentro do spec do nosso componente principal e se houver algum componente que seja filho e esteja dando erro também importaremos ele lá.

- Começaremos dentro do spec do componente criando a variavel que recebe nosso service e importando ele:

  import { ListInvestimentsService } from '../../services/list-investiments.service';
  let service: ListInvestimentsService;
  service = TestBed.inject(ListInvestimentsService);

- Para começar o teste iremos criar o espião que irá sempre "espionar" nosso mockList:
  spyOn(service, 'list').and.returnValue(of(mockList));

lembrando que o of é um parametro da biblioteca rxjs e deve ser importado.
import { of } from 'rxjs/internal/observable/of';

- Apartir dai criamos um teste para realizar a verificação se os dados estão sendo trocados

  it('(U) should list investiments', () => {
  spyOn(service, 'list').and.returnValue(of(mockList));

  // aqui coloco para no ngOnInit o spyOn vai realizar o retorno da nossa lista
  component.ngOnInit();
  fixture.detectChanges();
  expect(service.list).toHaveBeenCalledWith();

- Depois disso faço os expect para testar o que quero
  it('(U) should list investiments', () => {
  spyOn(service, 'list').and.returnValue(of(mockList));

  // aqui coloco para no ngOnInit o spyOn vai realizar o retorno da nossa lista
  component.ngOnInit();
  fixture.detectChanges();
  expect(service.list).toHaveBeenCalledWith();
  expect(component.investiments.length).toBe(6);
  expect(component.investiments[4].value).toEqual(10);
  expect(component.investiments[0].name).toEqual('Banco 1');
  });

  - No segundo teste que é o teste de interface basicamente nos iremos apenas realizar o spyon chamar o ngOnInit e trocar os valores que estavam antes:

    it('(I) should list investiments HTML', () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    let investiments =
    fixture.debugElement.nativeElement.querySelectorAll('.list-itens');
    expect(investiments.length).toBe(6);
    expect(investiments[0].textContent.trim()).toEqual('Banco 1 - 100');
    });

# Route Guards (Proteção de rotas)

- Proteção de rotas são basicamente validações que voce pode estar inserindo no seu codigo, como por exemplo uma validação de acesso de login de usuario, ou uma mensagem de confirmação caso a pessoa queira fechar a página

- existem 4 tipos de proteção de rotas:

  - CanActive: decide se uma rota (ou componente) pode ser ativada, como um sistema de login

  - CanDeactive: decide se um usuario pode navegar para longe de uma rota (ou componente), como solicitar a confirmações de alterações pendentes.

  - CanLoad: verifica se pode ou nao carregar o modulo especifico. Geralmente usado com lazy-load

  - CanActiveChild: semelhante ao CanActive, mas se aplica a rotas aninhadas.

# CanActive Example

- Para inicio iremos criar 2 componentes chamados home e account na mesma pasta.

- Para criar o guard iremos digitar ng g guard e colocar na pasta que queremos, nesse exemplo ficou dentro da mesma pasta onde estão os componentes porém é recomendado criar uma pasta core que irá conter todas as validações, depois de acionar o comando ele ira perguntar qual guard voce quer, iremos escolher o canActive.

- Após isso iremos colocar nossa validação na rota em que queremos acionar a lógica da validação:
  <!-- Passamos em forma de array devido a podermos colocar mais de uma validação -->

  {
  path: 'account',
  component: AccountComponent,
  canActivate: [CanActiveGuard],
  },

- Segue o processo de validação simples para teste:

<!-- HTML: -->

<a routerLink="account" [queryParams]="{ account: 'admin', password: '1234' }"

> Account True</a

<a routerLink="account" [queryParams]="{ account: 'adm', password: '12344' }"

> Account False</a

<!-- canActive -->

    if (
      route.queryParams['account'] === 'admin' &&
      route.queryParams['password'] === '1234'
    ) {
      console.log(route);
      console.log(state);
      return true;
    }

    return false;

}

- Nesse exemplo o primeiro link irá passar pois os dados de login estão corretos.

# CanDeactive Example

- ng g guard shared/guards/canDeactive

- Após criar ele iremos criar um routerlink para retornar a home dentro do nosso account component, no nosso canDeactive primeiro precisamos importar o componente que iremos usar nele e coloca-lo dentro do implements e depois declarar o componente:

export class CanDeactiveGuard implements CanDeactivate<AccountComponent> {
canDeactivate(
component: AccountComponent,

- No ts do nosso component criamos um método que exibe uma mensagem de confirmação se o usuario realmente deseja sair da página:

  public exit() {
  if (confirm('Você quer sair?')) {
  return true;
  }
  return false;
  }

- Depois disso basta adicionar ele na rota e chamar a função de confirmação no return do arquivo guard:

<!-- rota -->

    {
    path: 'account',
    component: AccountComponent,
    canActivate: [CanActiveGuard],
    canDeactivate: [CanDeactiveGuard],
    },

      <!-- arquivo guard -->

    return component.exit()

- Apartir dai ele já ira solicitar a confirmação se realmente deseja retornar a página inicial, esse é um exemplo simples porém podemos criar validações de preenchimento de formulário,de algum texto especifico, etc...

# canLoad

- Como o canLoad trabala com carregamento tardio de um modulo primeiro iremos criar um modulo dentro de shared (ng g module core --routing (o --routing serve para ele ja criar o arquivo de rotas))

- Depois disso criaremos uma rota lazy-loading filha no nosso app routing:

  {
  path: 'core',
  loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },

- Agora iremos criar o componente dashboard no core paa podermos usar (ng g c core/pages/dashboard)

- Depois criaremos a rota do mesmo:
  { path: '', component: DashboardComponent, pathMatch: 'full' },

- agora iremos criar o guard: ng g guard shared/guards/canLoad

- apartir dai implementamos o canLoad na rota dentro do app routing e implementamos a lógica dentro do nosso canLoad:

<!-- rota: -->

{
path: 'core',
loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
canLoad: [CanloadGuard],
},

<!-- Logica do canLoad -->

     <!-- Aqui ele verifica se existe o core/leads se nao existir ele vai dar o sinal de alert -->
    if (segments[1]?.path === 'leads') {
      return true;
    }
    alert('Modulo nao foi carregado');

}

# INFORMAÇAO IMPORTANTE: APARTIR DA VERSÃO 16 canLoad foi descontinuado, agora usa-se o canMath

# canActiveChild

- faz o mesmo papel do canActive porem para rotas filhas:
  <!-- HTML -->
  <br />
  <hr />
  <a routerLink="core" [queryParams]="{ account: 'admin', password: '1234' }"
    >Dashboard, Rota filha</a
  >

<br />
<hr />
<a
  routerLink="core/leads"
  [queryParams]="{ account: 'admin', password: '1234' }"
  >Leads, Rota filha</a
>

<!-- canActiveChilGuards -->

    if (
      childRoute.queryParams['account'] === 'admin' &&
      childRoute.queryParams['password'] === '1234'
    ) {
      return true;
    }

    return false;

}

# Projeto Prático 3 - Tela de login com autenticação JWT

- Primeiro criaremos os modules com routing dentro de components/admin e outro module dentro de core/components/route

- Depois criaremos o componente home em components/admin/pages/home e em core/components/auth/pages/sign

- Lembrando que a pasta core é importante devido a conter a autenticação do user.

- Agora criamos as duas rotas lazy loading dentro do nosso app routing module:

  {
  path: '',
  loadChildren: () =>
  import('./core/components/auth/auth.module').then((m) => m.AuthModule),
  },

  {
  path: 'admin',
  loadChildren: () =>
  import('./components/admin/admin.module').then((m) => m.AdminModule),
  },

- Agora criaremos as duas rotas dentro de cada routing de cada module criado:

  const routes: Routes = [{ path: '', component: SignComponent }];
  const routes: Routes = [{ path: '', component: HomeComponent }];

- Depois disso realizamos todas as estilizações das duas páginas.

# Começo da lógica do projeto

- Primeiro iremos importar o FormGroup dentro do module auth e o HttpClientModule dentro do nosso app module.

- Agora no nosso sign component iremos criar uma variavel de validação para e email e a senha utilizando o formBuilder:

<!-- Injeção de dependencia: -->

constructor(private formBuilder: FormBuilder)

<!-- Validador: -->

public formAuth: FormGroup = this.formBuilder.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required]],
});

- Agora colocamos esta variavel como formGroup no nosso form e usar o formControlName para colocar nos inputs para puxar a validação do nosso formAuth:
    <form [formGroup]="formAuth">
    <input type="email" placeholder="Email" formControlName="email" />
    <input type="password" placeholder="Password" />

- Agora iremos colocar uma logica no botao para que se a validação do formAuth nao for feita o usuário nao poderá acessar o botao:
  <button [disabled]="formAuth.invalid">Login</button>

- Agora iremos criar um service para consumir nossa API para retornar o JWT para podermos usar no nosso submit do formulário:

<!-- Consumo da api com post: -->

      public sign(payLoad: { email: string; password: string }): Observable<any> {
        return this.httpCliente.post(`${this.url}/sign`, payLoad).pipe(
          map((res) => {
            return console.log(res);
          }),
          catchError((e) => {
            if (e.error.message) return throwError(() => e.error.message);

            return throwError(
              () =>
                'No momento Não estamos conseguindo validar os dados, tenta novamente mais tarde.'
            );
          })
        );
      }

- Depois criaremos a logica de envio de formulario criando um metodo de envio e colocando no nosso formulario:

<!-- Método: -->

      public submitForm() {
        if (this.formAuth.valid) {
          this.authService
            .sign({
              email: this.formAuth.value.email,
              password: this.formAuth.value.password,
            })
            .subscribe({
              next: (res) => res,
              error: (e) => (this.msgError = e),
            });
        }
      }

<!-- Form: -->
  <form [formGroup]="formAuth" (ngSubmit)="submitForm()">

# armazenamento do token

- Quando conseguimos um success em nossa requisição ela ira retornar um token JWT, esse token deve ser armazenado no nosso localStorage para requisições futuras, para isso vamos utilizar a seguinte lógica:

       map((res) => {
          localStorage.removeItem('access_token');
          localStorage.setItem('access_token', res.token);
          return console.log(res);
        }),

- Basicamente quando adicionamos esta implementação ao logar com sucesso nosso token já estará salvo no localStorage.

# Proteção de rotas (guard)

- Agora colocaremos a lógica para que o usuario nao possa acessar a url admin sem estar logado, Primeiro passo iremos criar o guard dentro da pasta core, o guard que usaremos é o canActiveChild já que estamos trabalhando com rotas filhas (ng g guard core/auth), apos isso iremos instalar a biblioteca auth0 que irá permitir fazermos a condição para que se o usuario nao estiver com token nao deixa-lo seguir para a página admin. (npm i @auth0/angular-jwt):

      public isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');

        if (!token) {
          return false;
        }
        const jwtHelper = new JwtHelperService();
        return !jwtHelper.isTokenExpired(token);
      }

- Nesta logica acima usamos a biblioteca auth0 para identificar se o token está expirado, pois o token JWT tem prazo para expirar, se estiver expirado ele também nao irá deixar o mesmo acessar a página.

- Agora dentro do nosso guard iremos criar um constructor para injetar nosso service e trazer a logica do nosso isAuthtenticated:

  constructor(public router: Router, public authService: AuthService) {}

            if (this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
          }
          return true;


- Por fim colocaremos na nossa rota o nosso guard:

