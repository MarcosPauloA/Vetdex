import API_URL from "./config.js"; // Utilizarei de teste para puxar a lista de uma rest API 
const listaPatologias = [
    {
        id : 0,
        nomePatologia : "Asma De Lobisomem",
        imagens: [
            {
                image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d5d94ded-5529-433e-a697-a4332e879b88/d568m8k-9e10f389-c12d-4578-ba03-2b7d63a77889.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Q1ZDk0ZGVkLTU1MjktNDMzZS1hNjk3LWE0MzMyZTg3OWI4OFwvZDU2OG04ay05ZTEwZjM4OS1jMTJkLTQ1NzgtYmEwMy0yYjdkNjNhNzc4ODkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QV7GYuINmZnY_zyjjmL6nB0UZLy_Y4IifvnT0TJoLkc",
                id: 0,
                title: 'titulo1',
                subtitle: 'subtitulo1',
            },
            {
                image: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
                id: 1,
                title: 'titulo2',
                subtitle: 'subtitulo2',
            },
            {
                image: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
                id: 2,
                title: 'titulo3',
                subtitle: 'subtitulo3',
            },            
        ],
        descricaoDoenca: "A asma é uma doença inflamatória crônica das vias aéreas. Ela é caracterizada por hiperresponsividade das vias aéreas inferiores e por limitação variável ao fluxo aéreo, reversível espontaneamente ou com tratamento. A asma manifesta-se clinicamente por episódios recorrentes de sibilância, dispneia, aperto no peito e tosse, particularmente à noite e pela manhã ao despertar1. Pensa-se que a asma tenha origem numa conjugação de fatores genéticos e ambientais. Entre os fatores desencadeantes mais comuns estão os alergénios, como ácaros domésticos, baratas, pólen, pêlo de animais e fungos, e diversos fatores ambientais, como o fumo de tabaco ativo e passivo, a poluição do ar, irritantes químicos, exercício físico e determinados fármacos como a aspirina2. A asma pode ser difícil de diagnosticar. Alguns dos sintomas de asma, como a dispneia aguda, o aperto torácico e a pieira, podem ser provocados por outras doenças. O diagnóstico é geralmente realizado com base no padrão dos sintomas, na comprovação da reversibilidade dos sintomas com broncodilatadores e nos resultados de exames de espirometria2. A classificação clínica é feita de acordo com a frequência dos sintomas, do volume expiratório máximo no primeiro segundo e do débito expiratório máximo. A asma pode ser classificada como ligeira, moderada ou grave. As exacerbações ou crises agudas têm carácter episódico, embora a inflamação das vias aéreas seja crónica. As crises podem colocar a vida em risco, embora seja possível preveni-las. A gravidade da doença varia entre as pessoas e pode variar ao longo do tempo na mesma pessoa. Embora não exista cura para a asma, é possível controlar a frequência e intensidade dos sintomas. A primeira medida é evitar a exposição aos factores desencadeantes. Se não for suficiente, geralmente recomenda-se o uso de medicação, preferencialmente por via inalatória. Existem dois tipos de medicação para o controlo de asma: os medicamentos para alívio rápido dos sintomas e das crises de asma, como os broncodilatadores de curta duração, e os medicamentos de ação preventiva a longo prazo que previnem o aparecimento de sintomas ou de crises, particularmente os anti-inflamatórios3.",
        sinaisClinicos: 'Falta de ar',
        lesoesMacroscopicas: 'Lesão águda no pulmão do lobisomem',
        lesoesMicroscopicas: 'Microlesão águda no pulmão',
        referenciasBibliograficas: 'inventeiTudoIsso.com',
    },

    {
        id : 1,
        nomePatologia : "Doença da vaca louca",    
        imagens: [
            {
                image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
            },
        ],
        descricaoDoenca: "Semelhante ao vírus mostrado em Zombieland, esta praga não é canônica no universo dos Simpsons , mas mesmo assim aparece em Treehouse of Horror XX . Semelhante ao Zombieland , é transmitido por vacas. Neste segmento, Krusty desenvolve um novo hambúrguer a partir de vacas canibais e os efeitos dessa mutação em um vírus que transforma a vítima em zumbi em questão de segundos. Os sintomas incluem saliva salivando na boca, bolsas enegrecidas sob os olhos, pele pálida e comportamento psicótico como paranóia. O vírus pode ser transmitido por meio de mordidas. A única cura conhecida é Bart Simpson , já que ele comeu um dos hambúrgueres infectados, mas era imune. Na série Boston Legal de David E. Kelley , William Shatner, como Denny Crane, atribui a doença da vaca louca por seu comportamento exagerado. Lista de doenças fictícias - https://pt.abcdef.wiki/wiki/List_of_fictional_diseases",
        sinaisClinicos: 'Vaca doidassa',
        lesoesMacroscopicas: 'Zumbificação de orelha',
        lesoesMicroscopicas: 'Micro zumbificação de célula',
        referenciasBibliograficas: 'https://pt.abcdef.wiki/wiki/List_of_fictional_diseases',
    },


    {
        id : 2,
        nomePatologia : "Teste",
        imagens: [],
    },

    {
        id : 3,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 4,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 5,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 6,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 7,
        nomePatologia : "Teste",
        imagens: [],
    },
    
    {
        id : 8,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 9,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 10,
        nomePatologia : "Teste",
        imagens: [],
    },
    
    {
        id : 11,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 12,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 13,
        nomePatologia : "Teste",
        imagens: [],
    },
    {
        id : 14,
        nomePatologia : "Teste14",
        imagens: [],
    },
];

export default listaPatologias;
