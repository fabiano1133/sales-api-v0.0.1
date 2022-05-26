## Iniciando o projeto

--comanda para iniciar o prjeto--

## yarn inti -y

--comando para adicionar o typescript, ts-node-dev, tipagens do typescript e o tsconfig-paths ao nosso projeto no ambiente dev(-D)

## yarn add typescript ts-node-dev @types/node tsconfig-paths -D

--comando que cria o arquivo tsconfig.json com algumas configurações pré-definidas

## npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

--criar pasta src na raiz do projeto
--criar o aqruivo server.ts dentro da pasta src
--criar o scrip ts-node-dev dentro do package

## "scripts": {

    "dev": "ts-node-dev --inspect --transpile-only --ignore-watch node_modules src/server.js"

}

## configurações no editorConfig -> Manter uma padronização do código

-- ter intalado o plugin editorconfig no vscode
-- gerar o .editorconfig na raiz do projeto

## configuração do ESLint

-- yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
-- criar o arquivo .eslintrc na raiz do projeto
-- criar o aqruivo .eslintignore

## configurações do prettier

-- yarn add prettier -D
-- criar o aqruivo .prettierrc na raiz do projeto
-- yarn add eslint-config-prettier eslint-plugin-prettier -D
-- adicionar algumas configuraçoes no .eslintrc

## estruturas de pastas do projeto

-- config -> configuraçoes de bibliotecas externas, ex: autenticação, upload, email...
-- modules -> modulos da aplicação referenciando as regras de negocio, ex: customers, products, orders e users.
-- shared -> modulos de uso geral compartilhado com mais de um modulo da aplicação, ex: server.ts, arquivo principal das rotas, conexão com DB...(ps: dentro de shared criar a pasta http, onde ficará o server.ts)
-- services (subpasta de modules) -> irá conter todas as regras que a aplicação precisa atender, ex: a senha precisa ser aramzenada criptografada.

## configurar as importações dentro do tsconfig

-- usar a regra paths
-- usar a BaseURL

### "baseUrl": "./"

### "paths": {

### "@config/\*": [

### "src/config/\*"

### ]

### "@modules/\*": [

### "src/modules/\*"

### ]

### "@shared/\*": [

### "src/shared/\*"

### ]

### }

## Executando o projeto na fase inicial

### instalar o cors, express e o express-async-errors

-- yarn add cors express express-async-errors
-- yarn add -D @types/cors @types/express -> tipagens do cors e express
-- instanciar o cors e o empress no server.ts
-- criar a pasta routes dentro da pasta http -> pasta onde ira concentrar nossas rotas (index.ts)

## Classe para tratamento de erros personalizados

-- criar a pasta errors dentro da pasta shared
-- criar a classe AppError.ts

## TypeORM

-- cria a estrutura do banco de dados
-- permite relacionar tabelas do banco com instancias de classes em JS.
-- yarn add typeorm reflect-metadata pg -> instala o typeorm, reflect e o postgre
-- importar o reflect-metadata dentro do server.ts

## criação do banco e configuração da conexão com typeorm

-- criar o arquivo ormconfig.json
-- criar uma pasta dentro de shared com o nome typeorm e instanciar o metodo createConnection do typeorm.
-- importar dentro do server.ts o index da pasta typeorm.
-- criar o banco no docker -> docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

## migrations

-- criar a pasta migrations dentro de typeorm
-- configurar o ormconfig com migrations -> caminho onde serão geradas as migrations
-- configurar o cli migrations dentro do ormconfig -> S
-- criar o script typeorm da cli migration

## migration products

-- yarn typeorm migration:create -n nomeDaMigration -> cria a classe com os metodos up e down
-- yarn typeorm migration:run -> executa o arquivo das migrations
-- configurar o uuid dentro da migration -> yarn add uuid e suas tipagens e import uuid

## conceitos de entidade do typeorm

-- utiliza decorators, deixa o codigo menos verboso

## criando a entidade de produtos

## config dentro do tsconfig -> permite usar os decorators

-- "strictPropertyInitialization": false,
-- "experimentalDecorators": true,
-- "emitDecoratorMetadata": true,

## conceito de repositorios do typeorm

--

## criar um repositorio custom typeorm

## criar o controller de Product

## criar os services de Product

## validacao de dados com celebrate

-- yarn add celebrate
-- yarn add @types/joi

## Criptografia em senhas de usuarios

-- yarn add bcrypt js
-- yarn add -D @types/bcryptjs
-- criar uma const com a funcao hash da lib -> const hashedPassword = await hash(variavel password, bits da criptografia(8))
-- dentro do service de criacao de usuario antes do metodo create

## Autenticação de usuário

-- JWT lib -> yarn add -D @types/jsonwebtoken jsonwebtoken
-- criar o service de autenticação dentro da pasta servies de users
-- criar o controller -> sessionsController
-- criar o arquivo sessions.routes.ts
-- importar o sessions.routes.ts para o index routes

## Ultilizando o JWT

-- deve ser dentro do service CreateSessionsService
-- inserir a criação após a verificação dos dados, email e password

## Midleware de Autenticação

-- criar um arquivo auth.ts em config
-- override Express -> adicionar o tipo user -> criar a pasta @types dentro do src

## Configurando o upload - Multer

-- yarn add multer
-- yarn add -D @types/multer
-- criar um arquivo de configurações do multer dentro da pasta config em src -> upload.ts
-- criar o service de upload do avatar
-- criar o controller de upload do avatar

## Configurando a recuperação de senha por e-mail

-- criar a migration UserToken
-- criar entidade
-- criar repositorio
-- criar o servico de recuperação de senha -> responsavel por enviar um email para tal
-- criar o servico que irá de fato alterar a senha no banco
-- criar o controller
-- criar a rota

## Configurando o envio de email -> Ethereal Fake Mail Service

-- instalar o nodemailer
-- yarn add nodemailer
-- yarn add -D @types/nodemailer
-- criar o arquivo de configuração dentro da past config (é um módulo global)

## Template para e-mail -> HandleBars

-- yarn add handlebars
-- criar o arquivo HandleMailTemplate.ts com a classe e metodo de configuração dentro de config -> mail
-- ajustar a interface do EtherealMail.ts
-- ajustar a instancia do EtherealMail.ts dentro so SendForgoPwdService

## Controle de perfil de usuário

-- Criar service para exibir o perfil do usuário
-- Criar service para update de usuario
-- criar o controller com os metodos show e update instanciando os services acima
-- criar um novo arquivo de rota para profile
-- importar o arquivo de rota no index.ts em routes

## Iniciando o modulo de customers

-- criar a migration -> yarn typeorm migration:create -n nomdeDaMigration
-- criar a entidade de customers
-- criar o repositorio de customers -> classe que herda o Repository do typeorm
-- criar os services de customers (create, list, show, update e delete)
-- criar o controller de customers instanciando a class correspondente ao metodo do service
-- configurar as rotas de customers
-- importar a rota no index em routes(arquivo principal das rotas)

## Conceitos de Relacionamentos entre tabelas com TypeORM

-- ManyToMany -> tabela A - Tabela B <-> tabela A_B(Tabela Pivô)
-- exemplo -> um produto pode está em varias ordens de vendas

## Migration da Tabela Orders

-- id, created_at, updated_at
-- uso de migration para inserir uma columa em uma tabela já existente

## criar repositorios de orders

## Paginação de dados com typeorm-pagination

-- yarn add typeorm-pagination@2.0.1
-- importat a lib dentro do arquivo principal da aplicação ex: server.ts, index.ts...
-- é ultilizado como um middleware no controller
-- usar v2.0.1

## Variaveis de ambiente

-- yarn add dotenv
-- importar no server.ts import 'dotenv/config'
-- criar arquivo .env -> declarar as variaveis aqui dentro
-- criar o arquivo .env.example -> sobe para o github
-- substituir os valores pelas variaveis do .env -> process.env.NOME_DA_VARIAVEL

## Class Transformer -> Formatando a Resposta para o usuario (inibir dados sensiveis)

-- yarn add class-transformer
-- import reflect-metadata
-- adicionar a notation @Exclude no campo a inibir
-- configurar o controller da classe -> response importar o -> ex: instanceToPlain(user) ou instanceToInstance

## cache com Redis

-- criar as variaveis de ambiente REDIS_HOST, REDIS_PORT e REDIS_PASS
-- ioRedis
-- yarn add redis ioredis
-- yarn add @types/redis @types/ioredis
-- docker run --name  redis -p 6370:6379 -d -t redis:alpine
-- criar o arquivo cache.ts dentro da pasta config com um objeto exportado por default
-- criar uma pasta cache dentro da pasta shared
-- criar a classe RedisCache.ts

## redis client container

-- docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
-- abrir no shell -> docker exec -it sh -> acessar o redis atraves do cli
-- redis-cli

## Rate Limiter -> Middleware

-- lib que proteje a api em relação ao numero de requisições recebidas
-- proteje contra DDos
-- yarn add rate-limiter-flexible
-- criar o aqruivo do middleware dentro de shared/middleware
-- importar o redis pois será usado para armazenar o ip que realizou a requisição
-- importar o RateLimiterRedis de dentro da lib rate-limiter-flexible

## Registro de Dominio internet e DNS

-- ultilizando o freenom -> dominio
-- criar um dominio
--

## Avançando com a qualidade do código

-- DDD
-- SOLID
-- Camada de dominio
-- Camada de infraestutura
-- Refatoração dos repositórios e serviços
-- injeção de dependências
-- testes automatizados
-- coverage Report

## Conceitos básicos de DDD -> Desenvolvimento Orientado por Dominio

--

## SOLID

-- S -> uma classe deve ter um e somente uma responsabilidade
-- O -> não deve editar ou adicionar classe já existente (criar ou extender a classe criada)
-- L -> Poder substituir classes base por classes derivadas
-- I -> Muitas interfaces específicas é melhor que uma única interface
-- D -> Uma classe depender de uma abstração e nao de uma implementação

## Estruturando a camada de infra

-- criar a pasta infra dentro de shared
-- inserir os módulos externos que podem ser possivelmente subtituido num futuro
-- criar a pasta infra dentro de cada modulo e criar a pasta http dentro de infra -> add os controllers, routes
-- mover a pasta typeorm par dentro da pasta infra
-- ajustar o path do script dev dentro do package.json -> adicionar o path de infra
-- ajustar os paths de entities e migrations dentro de ormconfig -> adicionar o path infra

## Estruturando a camada de infra

-- conceito -> implementar uma interface
-- criar uma pasta domain dentro dos modulos
-- criar a pasta models dentro de domain
-- dentro de domain definir as interfaces -> primeira interface a ser criada -> da Entidade
-- ex Criar a interface ICustomer para ser implementado na entidade de Customer
-- ex criar a interface ICreateCustomer para ser tipada na service de criação de customers
-- criar a interface de Repositorios -> criar uma pasta repositories dentro de domain
-- interface ICustomerRepository com todos os metodos e implementar dentro de CustomerRepository
-- nao usa mais o getCustomRepository e sim o getRepository
-- cria um construtor que ira iniciar o repositorio do typeorm

## Injeção de Dependencia -> tsyringe
-- yarn add tsyringe
-- criar uma pasta container dentro de shared
-- criar um index.ts dentro da paste
-- criar uma interface ICustomerRepository com os metodos que serão ultilizados nos services
-- implements a interface ICustomerRepository na classe CustomersRepository
-- importar o container da lib tsyringe dentro de cada metodo do controller e usar o metodo resolve
-- importar o repositorio -> ex CustomersRepository
-- importar o container dentro do server.ts
-- adicionar o @injectable e @inject como notation da classe e do atributo private -> nessa ordem

## Testes Automatizados -> Jest
-- Testes unitários -> testar componentes específicos separados
-- yarn add -D @types/jest
-- yarn jest --init -> cria o arquivo jest.config.ts
-- yarn add -D ts-jest -> para rodar os arquivos em .ts
-- descomentar o preset dentro do jest.config.ts e mudar undefinid para 'ts-jest'
-- descomentar o testMatch e configurar o path dos arquivos de teste -> ['**/*.spec.ts']

## iniciando com jest
-- criar um arquivo com extensao spec
-- iniciar com o describe('Agrupamento', () => {})
-- it('descriçaõ de cada teste do agrupamento', () => {})
-- expect(o que se espera do teste)

## Fakes repositories para teste
-- criar um pasta com nome fakes dentro da pasta repositories do modulo em teste(domain -> repositories)
-- criar o repositorio fake com os metodos necessários do repositorio original
-- importar para dentro do teste o service e o repositorio fake

## Dockerfile - Docker
-- criar uma imagem a partir de uma imagem base da nossa aplicação e suas dependências como, BD, Cache e etc...
-- chmod +x .docker/entrypoint.sh -> comando de permissão para o arquivo sh
