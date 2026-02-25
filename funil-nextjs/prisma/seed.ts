import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contacts = [
  // CODECON LADIES (15)
  {name:"Alice Reis",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 35 93618-0592",link:"https://wa.me/5535936180592"},
  {name:"Contato CL-01",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 41 9782-9812",link:"https://wa.me/554197829812"},
  {name:"Contato CL-02",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 41 8817-1687",link:"https://wa.me/554188171687"},
  {name:"Contato CL-03",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 47 8821-5610",link:"https://wa.me/554788215610"},
  {name:"Contato CL-04",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 48 9151-4197",link:"https://wa.me/554891514197"},
  {name:"Contato CL-05",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 41 9254-6414",link:"https://wa.me/554192546414"},
  {name:"Contato CL-06",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 41 9156-8570",link:"https://wa.me/554191568570"},
  {name:"Contato CL-07",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 21 97181-7313",link:"https://wa.me/5521971817313"},
  {name:"Contato CL-08",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 47 9723-8173",link:"https://wa.me/554797238173"},
  {name:"Contato CL-09",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 47 9766-6539",link:"https://wa.me/554797666539"},
  {name:"Contato CL-10",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 55 9691-3627",link:"https://wa.me/555596913627"},
  {name:"Contato CL-11",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 35 8880-1235",link:"https://wa.me/553588801235"},
  {name:"Contato CL-12",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 41 9618-2728",link:"https://wa.me/554196182728"},
  {name:"Leiliane Cavalcante",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 21 99218-2138",link:"https://wa.me/5521992182138"},
  {name:"Contato CL-13",channel:"WhatsApp",group:"Codecon Ladies",contact:"+55 71 9338-1653",link:"https://wa.me/557193381653"},
  // MULHERES ESTÁCIO (15)
  {name:"Contato ME-01",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 21 96930-6454",link:"https://wa.me/5521969306454"},
  {name:"Contato ME-02",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 31 9709-0001",link:"https://wa.me/553197090001"},
  {name:"Contato ME-03",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 21 97940-7019",link:"https://wa.me/5521979407019"},
  {name:"Contato ME-04",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 71 8687-5571",link:"https://wa.me/557186875571"},
  {name:"Contato ME-05",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 21 97985-8378",link:"https://wa.me/5521979858378"},
  {name:"Contato ME-06",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 19 99404-6025",link:"https://wa.me/5519994046025"},
  {name:"Contato ME-07",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 73 8815-7665",link:"https://wa.me/557388157665"},
  {name:"Contato ME-08",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 31 9515-6551",link:"https://wa.me/553195156551"},
  {name:"Contato ME-09",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 47 9167-3486",link:"https://wa.me/554791673486"},
  {name:"Contato ME-10",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 82 8849-8633",link:"https://wa.me/558288498633"},
  {name:"Contato ME-11",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 79 9824-5706",link:"https://wa.me/557998245706"},
  {name:"Contato ME-12",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 21 97453-7619",link:"https://wa.me/5521974537619"},
  {name:"Contato ME-13",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 79 9907-2175",link:"https://wa.me/557999072175"},
  {name:"Contato ME-14",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 91 8131-4102",link:"https://wa.me/559181314102"},
  {name:"Contato ME-15",channel:"WhatsApp",group:"Mulheres Estácio",contact:"+55 73 8815-7865",link:"https://wa.me/557388157865"},
  // DESAFIO DA VEZ (36)
  {name:"Contato DV-01",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 62 9212-4075",link:"https://wa.me/556292124075"},
  {name:"Contato DV-02",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 41 9850-7530",link:"https://wa.me/554198507530"},
  {name:"Contato DV-03",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 61 9944-1378",link:"https://wa.me/556199441378"},
  {name:"Glaucionne Vasconcelos",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 92 9155-2086",link:"https://wa.me/559291552086"},
  {name:"Contato DV-04",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 19 99924-1135",link:"https://wa.me/5519999241135"},
  {name:"Contato DV-05",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 61 8550-5482",link:"https://wa.me/556185505482"},
  {name:"Contato DV-06",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 67 8472-7499",link:"https://wa.me/556784727499"},
  {name:"Contato DV-07",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 88 9464-8572",link:"https://wa.me/558894648572"},
  {name:"Contato DV-08",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 12 99240-1311",link:"https://wa.me/5512992401311"},
  {name:"Tânia",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 97114-8627",link:"https://wa.me/5511971148627"},
  {name:"Gilcimara Valentim",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 12 99620-9301",link:"https://wa.me/5512996209301"},
  {name:"Contato DV-09",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 49 9995-0503",link:"https://wa.me/554999950503"},
  {name:"Contato DV-10",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 19 99347-8105",link:"https://wa.me/5519993478105"},
  {name:"Contato DV-11",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 37 9952-5373",link:"https://wa.me/553799525373"},
  {name:"Contato DV-12",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 79 9843-6365",link:"https://wa.me/557998436365"},
  {name:"Contato DV-13",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 81 9676-5330",link:"https://wa.me/558196765330"},
  {name:"Contato DV-14",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 98769-4947",link:"https://wa.me/5511987694947"},
  {name:"Contato DV-15",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 99399-4449",link:"https://wa.me/5511993994449"},
  {name:"Contato DV-16",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 24 99219-8631",link:"https://wa.me/5524992198631"},
  {name:"Contato DV-17",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 51 8199-3273",link:"https://wa.me/555181993273"},
  {name:"Keitlyn Katsuka",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 14 98770-4780",link:"https://wa.me/5514987704780"},
  {name:"Contato DV-18",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 21 97238-8905",link:"https://wa.me/5521972388905"},
  {name:"Contato DV-19",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 44 9936-4198",link:"https://wa.me/554499364198"},
  {name:"Contato DV-20",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 98967-1460",link:"https://wa.me/5511989671460"},
  {name:"Contato DV-21",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 96792-1094",link:"https://wa.me/5511967921094"},
  {name:"Contato DV-22",channel:"WhatsApp",group:"Desafio da Vez",contact:"+44 7752 199118",link:"https://wa.me/447752199118"},
  {name:"Contato DV-23",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 96854-0074",link:"https://wa.me/5511968540074"},
  {name:"Contato DV-24",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 79 8152-2948",link:"https://wa.me/557981522948"},
  {name:"Contato DV-25",channel:"WhatsApp",group:"Desafio da Vez",contact:"+40 798 925162",link:"https://wa.me/40798925162"},
  {name:"Contato DV-26",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 31 1211-0049",link:"https://wa.me/553112110049"},
  {name:"Contato DV-27",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 91671-6294",link:"https://wa.me/5511916716294"},
  {name:"Contato DV-28",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 98622-1167",link:"https://wa.me/5511986221167"},
  {name:"Contato DV-29",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 22 98143-0914",link:"https://wa.me/5522981430914"},
  {name:"Contato DV-30",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 21 99605-9141",link:"https://wa.me/5521996059141"},
  {name:"Contato DV-31",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 11 96950-8999",link:"https://wa.me/5511969508999"},
  {name:"Contato DV-32",channel:"WhatsApp",group:"Desafio da Vez",contact:"+55 53 8435-2480",link:"https://wa.me/555384352480"},
  // REAL DEV NETWORK (11)
  {name:"Contato RD-01",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 31 8324-6230",link:"https://wa.me/553183246230"},
  {name:"Contato RD-02",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 48 9958-3369",link:"https://wa.me/554899583369"},
  {name:"Contato RD-03",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 32 9954-8110",link:"https://wa.me/553299548110"},
  {name:"Contato RD-04",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 61 9928-7172",link:"https://wa.me/556199287172"},
  {name:"Contato RD-05",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 69 9227-0582",link:"https://wa.me/556992270582"},
  {name:"Contato RD-06",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 11 94915-9058",link:"https://wa.me/5511949159058"},
  {name:"Contato RD-07",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 49 9947-8729",link:"https://wa.me/554999478729"},
  {name:"Contato RD-08",channel:"WhatsApp",group:"Real Dev Network",contact:"+244 925 136 481",link:"https://wa.me/244925136481"},
  {name:"Contato RD-09",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 11 97392-9903",link:"https://wa.me/5511973929903"},
  {name:"Contato RD-10",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 18 99627-8558",link:"https://wa.me/5518996278558"},
  {name:"Contato RD-11",channel:"WhatsApp",group:"Real Dev Network",contact:"+55 82 8887-3225",link:"https://wa.me/558288873225"},
  // 1000DEVS (2)
  {name:"Vinícius Borges",channel:"WhatsApp",group:"Iniciantes 1000Devs",contact:"+55 62 9413-5587",link:"https://wa.me/556294135587"},
  {name:"Contato 1K-01",channel:"WhatsApp",group:"Iniciantes 1000Devs",contact:"+55 71 9294-7918",link:"https://wa.me/557192947918"},
  // CORVOADA UNESA (2)
  {name:"João",channel:"WhatsApp",group:"Corvoada UNESA",contact:"+55 21 98213-3471",link:"https://wa.me/5521982133471"},
  {name:"Sis F.a",channel:"WhatsApp",group:"Corvoada UNESA",contact:"+55 21 96915-0766",link:"https://wa.me/5521969150766"},
  // ANÁLISE E DEV SISTEMAS (4)
  {name:"Acsa Rayane",channel:"WhatsApp",group:"Análise e Dev Sistemas",contact:"+55 81 9718-5142",link:"https://wa.me/558197185142"},
  {name:"Jhully Emilly",channel:"WhatsApp",group:"Análise e Dev Sistemas",contact:"+55 67 9186-9901",link:"https://wa.me/556791869901"},
  {name:"Guilherme Freitas",channel:"WhatsApp",group:"Análise e Dev Sistemas",contact:"+55 95 9125-6390",link:"https://wa.me/559591256390"},
  {name:"Feeh",channel:"WhatsApp",group:"Análise e Dev Sistemas",contact:"+55 77 9876-3151",link:"https://wa.me/557798763151"},
  // SQUARD 9 PDA (1)
  {name:"Guilherme (L)",channel:"WhatsApp",group:"Squard 9 PDA",contact:"+55 74 9904-5492",link:"https://wa.me/557499045492"},
  // DEVOPS ALUNO (3)
  {name:"Phillipe Jonson",channel:"WhatsApp",group:"DevOps Aluno",contact:"+55 83 9383-4958",link:"https://wa.me/558393834958"},
  {name:"Juliene",channel:"WhatsApp",group:"DevOps Aluno",contact:"+55 22 99214-3703",link:"https://wa.me/5522992143703"},
  {name:"Flávio",channel:"WhatsApp",group:"DevOps Aluno",contact:"+55 84 8762-4826",link:"https://wa.me/558487624826"},
  // DEVOPS ALUNOS 2 (1)
  {name:"Jezebel",channel:"WhatsApp",group:"DevOps Alunos 2",contact:"+55 11 95733-3990",link:"https://wa.me/5511957333990"},
  // GRUPINHO CODECON (18)
  {name:"Maria Vitoria",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 49 9906-0495",link:"https://wa.me/554999060495"},
  {name:"Mariana",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 41 9136-8570",link:"https://wa.me/554191368570"},
  {name:"Jonathan Schultz",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 27 99957-3375",link:"https://wa.me/5527999573375"},
  {name:"Marcos",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 47 9770-0060",link:"https://wa.me/554797700060"},
  {name:"Marcucci",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 41 8481-0977",link:"https://wa.me/554184810977"},
  {name:"Ivan Sansao",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 47 9918-8299",link:"https://wa.me/554799188299"},
  {name:"Bruno Sales",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 61 8142-6320",link:"https://wa.me/556181426320"},
  {name:"Felipe Maccari",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 46 9134-4560",link:"https://wa.me/554691344560"},
  {name:"Elcorrea",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 92 9340-1874",link:"https://wa.me/559293401874"},
  {name:"Andre Ovidio",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 47 9604-7958",link:"https://wa.me/554796047958"},
  {name:"Paulo Haus",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 41 93300-6505",link:"https://wa.me/5541933006505"},
  {name:"Jefferson S. Caires",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 47 9115-8071",link:"https://wa.me/554791158071"},
  {name:"Robson",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 41 8895-1768",link:"https://wa.me/554188951768"},
  {name:"Lucas",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 81 8834-7171",link:"https://wa.me/558188347171"},
  {name:"Roger Correa",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 41 9921-3102",link:"https://wa.me/554199213102"},
  {name:"Tiel",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 11 98818-1616",link:"https://wa.me/5511988181616"},
  {name:"Saulo",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 47 9915-8967",link:"https://wa.me/554799158967"},
  {name:"Jéssica Isri",channel:"WhatsApp",group:"Grupinho Codecon",contact:"+55 12 98865-8327",link:"https://wa.me/5512988658327"},
  // LINKEDIN ÍRIS (13)
  {name:"Anderson Nascimento",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Anderson%20Nascimento"},
  {name:"Gabriel Machado",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Gabriel%20Machado"},
  {name:"Jonas Fernandes",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Jonas%20Fernandes"},
  {name:"Raine Rocha",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Raine%20Rocha"},
  {name:"Fernanda Oliveira",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Fernanda%20Oliveira"},
  {name:"Elesfrankly Delmon",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Elesfrankly%20Delmon"},
  {name:"Kayky Santos",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Kayky%20Santos"},
  {name:"Lucas Borges",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Lucas%20Borges"},
  {name:"Rosário Caravela",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Ros%C3%A1rio%20Caravela"},
  {name:"Guilherme Barbosa",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Guilherme%20Barbosa"},
  {name:"Felipe Mussi",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Felipe%20Mussi"},
  {name:"Maria Rocha",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Maria%20Rocha"},
  {name:"Wender Gustavo",channel:"LinkedIn",group:"LinkedIn Íris",contact:"LinkedIn DM",link:"https://www.linkedin.com/search/results/all/?keywords=Wender%20Gustavo"},
  // INSTAGRAM @CALIXTO.DEV (23)
  {name:"Davidson William",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Savio Sodré Rosa",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Rodrigo Pereira",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Kelvin Almeida",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Kelven Gomes",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Mariana Cristina",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Janilton Francisco",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Melchisedek Lima",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Karolynna Sousa",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Soraia Cunha",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Wellington Lima",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Kelvis Xakriabá",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Caroline dos Santos",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Roberta Lau",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Douglas Adriano",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Mayki Gonçalves",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Miguel Reis Santos",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Natan Lucena",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Juliana Gonçalves",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Paulo Henrique",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Jonas Costa",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"Marcus Vinícius",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  {name:"João Targino",channel:"Instagram",group:"@calixto.dev",contact:"DM Instagram",link:"https://www.instagram.com/calixto.dev/"},
  // DISCORD (12)
  {name:"Dennis Silva",channel:"Discord",group:"Discord Votantes",contact:"@dennisdn07",link:"https://discord.com/"},
  {name:"Júlio César",channel:"Discord",group:"Discord Votantes",contact:"@_jullliao",link:"https://discord.com/"},
  {name:"Gabriela Barbosa",channel:"Discord",group:"Discord Votantes",contact:"@gabivitoriax_",link:"https://discord.com/"},
  {name:"Keila Silva",channel:"Discord",group:"Discord Votantes",contact:"@keilasilvaa01",link:"https://discord.com/"},
  {name:"Allan Cardoso",channel:"Discord",group:"Discord Votantes",contact:"@allan_cardoso208",link:"https://discord.com/"},
  {name:"Diogo Ferreira",channel:"Discord",group:"Discord Votantes",contact:"@diogo.dev7",link:"https://discord.com/"},
  {name:"Jeferson Alves",channel:"Discord",group:"Discord Votantes",contact:"@_jef.alves7",link:"https://discord.com/"},
  {name:"Fabiano Gomes",channel:"Discord",group:"Discord Votantes",contact:"@fabianogomes.gom",link:"https://discord.com/"},
  {name:"Brandon Gabriel",channel:"Discord",group:"Discord Votantes",contact:"@_brandongabriel",link:"https://discord.com/"},
  {name:"Tatucode",channel:"Discord",group:"Discord Votantes",contact:"@tatucode",link:"https://discord.com/"},
  {name:"Mari",channel:"Discord",group:"Discord DM",contact:"@_macezario",link:"https://discord.com/"},
  {name:"JoãoVictor",channel:"Discord",group:"Discord DM",contact:"@milk21291",link:"https://discord.com/"},
  // FORMULÁRIO (17)
  {name:"Yolanda Anchieta",channel:"Formulário",group:"Formulário",contact:"dasilvayolanda03@gmail.com",link:"mailto:dasilvayolanda03@gmail.com"},
  {name:"Felipe",channel:"Formulário",group:"Formulário",contact:"felipesousadacruz20@gmail.com",link:"mailto:felipesousadacruz20@gmail.com"},
  {name:"Muriel Christyan Diniz",channel:"Formulário",group:"Formulário",contact:"murielchristyandinizsoar@gmail.com",link:"mailto:murielchristyandinizsoar@gmail.com"},
  {name:"Ariany da Silva Soares",channel:"Formulário",group:"Formulário",contact:"arianypenha40@gmail.com",link:"mailto:arianypenha40@gmail.com"},
  {name:"Beatriz",channel:"Formulário",group:"Formulário",contact:"aiquesaco23@gmail.com",link:"mailto:aiquesaco23@gmail.com"},
  {name:"Laura Elis da Silva",channel:"Formulário",group:"Formulário",contact:"eulauraelis@gmail.com",link:"mailto:eulauraelis@gmail.com"},
  {name:"Josiane",channel:"Formulário",group:"Formulário",contact:"ljosyane7@gmail.com | 21 96618-3219",link:"https://wa.me/5521966183219"},
  {name:"Isaac",channel:"Formulário",group:"Formulário",contact:"isaacsantosfx@gmail.com | 21 98615-1160",link:"https://wa.me/5521986151160"},
  {name:"Fernanda Gonçalves",channel:"Formulário",group:"Formulário",contact:"nan5da5depaula@gmail.com | 21 97394-7306",link:"https://wa.me/5521973947306"},
  {name:"Gabriela Vitória",channel:"Formulário",group:"Formulário",contact:"gabrielavrsantos@gmail.com | 81 97323-5281",link:"https://wa.me/5581973235281"},
  {name:"Laysa Vitória Santos",channel:"Formulário",group:"Formulário",contact:"laysav850@gmail.com | 21 99318-3861",link:"https://wa.me/5521993183861"},
  {name:"Pedro Victor",channel:"Formulário",group:"Formulário",contact:"pedronafuka@gmail.com | 77 99108-7101",link:"https://wa.me/5577991087101"},
  {name:"Marcelo Alves da Silva",channel:"Formulário",group:"Formulário",contact:"silva.marcelo.alves@gmail.com | 21 99397-0248",link:"https://wa.me/5521993970248"},
  {name:"Nicolas Miranda",channel:"Formulário",group:"Formulário",contact:"nicoll.rj17@gmail.com | 21 97269-3074",link:"https://wa.me/5521972693074"},
  {name:"Vitor",channel:"Formulário",group:"Formulário",contact:"vitorhugoceab@gmail.com | 55 21 97637-3223",link:"https://wa.me/5521976373223"},
  {name:"Samuel Btaz",channel:"Formulário",group:"Formulário",contact:"soaressamueldavi@gmail.com | 21 98277-7617",link:"https://wa.me/5521982777617"},
  {name:"Samarah Calixto",channel:"Formulário",group:"Formulário",contact:"samarahcalixto7@gmail.com | 21 99925-6490",link:"https://wa.me/5521999256490"},
];

async function main() {
  console.log("Seeding database...");

  await prisma.feedback.deleteMany();
  await prisma.lead.deleteMany();

  for (const c of contacts) {
    await prisma.lead.create({
      data: {
        name: c.name,
        channel: c.channel,
        group: c.group,
        contact: c.contact,
        link: c.link,
        feedback: {
          create: {
            status: "Pendente",
            replied: false,
          },
        },
      },
    });
  }

  console.log(`Seeded ${contacts.length} leads with feedbacks.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
