export const formsSeed = [
  {
    id: 1,
    name: "Levantamento de Necessidades Essências Para os Novos Entes",
    description:
      "Levantamento de Necessidades fundamentais (Capital Humano, Infraestruturas Essenciais e Organização do Fronteiriças, Povoamento das Zonas Fronteiriças, Inventariação e afectação do Patrimonio).",
  },
];

export const sectionsSeed = [
  {
    id: 1,
    name: "Território",
  },
  {
    id: 2,
    name: "Capital Humano",
    description: "",
  },
  {
    id: 3,
    name: "Especialidades",
    description: "",
  },
  {
    id: 4,
    name: "Distribuição quanto ao Género",
    description: "",
  },
  {
    id: 5,
    name: "Infraestruturas Essências e Organização do Território",
    description: "",
  },
  {
    id: 6,
    name: "Educação",
    description: "",
  },
  {
    id: 7,
    name: "Infraestruturas de Saúde",
    description: "",
  },
  {
    id: 8,
    name: "Infraestrutura de Segurança Pública",
    description: "",
  },
];

export const fieldsSeed = [
  //Section01
  {
    id: 1,
    formId: 1,
    sectionId: 1,
    identifier: "1",
    display: "Selecione a província",
    type: "select",
    data: '{"type":"data_table","src":"provinces; id as id; name as title"}',
  },
  {
    id: 2,
    formId: 1,
    sectionId: 1,
    identifier: "2",
    display: "Selecione o município",
    type: "select",
    data: '{"type":"data_table","src":"cities; id as id name as title"}',
    dataWhere: '{"parent_field":"id", "child_field": "province_id", "parent_identifier": "1"}',
  },
  {
    id: 3,
    formId: 1,
    sectionId: 1,
    identifier: "3",
    display: "Categoria do Municipio (Estrutura Orgânica Tipo)",
    type: "select",
    data: '{"type":"list","src":[{"id":1,"title":"A"},{"id":2,"title":"B"},{"id":3,"title":"C"},{"id":4,"title":"D"},{"id":5,"title":"E"}]}',
    description: "Estrutura orgânica",
  },

  //Section02
  {
    id: 4,
    formId: 1,
    sectionId: 2,
    identifier: "4",
    display: "Quantos são efectivos?",
    type: "number",
  },
  {
    id: 5,
    formId: 1,
    identifier: "5",
    sectionId: 2,
    display: "Quantos são contratados?",
    type: "number",
  },
  {
    id: 6,
    formId: 1,
    identifier: "6",
    sectionId: 2,
    display: "Nº Total de quadro de Pessoal em Falta",
    type: "number",
  },
  {
    id: 7,
    formId: 1,
    identifier: "7",
    sectionId: 2,
    display: "Nº Total de Técnicos Superior",
    type: "number",
  },
  {
    id: 8,
    formId: 1,
    identifier: "8",
    sectionId: 2,
    display: "Nº Total de Técnicos Medio",
    type: "number",
  },
  {
    id: 9,
    formId: 1,
    identifier: "9",
    sectionId: 2,
    display: "Nº Total de Administrativo",
    type: "number",
  },
  {
    id: 10,
    formId: 1,
    identifier: "10",
    sectionId: 2,
    display: "Nº Total de Auxiliar",
    type: "number",
  },
  {
    id: 11,
    formId: 1,
    identifier: "11",
    sectionId: 2,
    display: "Nº Total de Operario",
    type: "number",
  },
  {
    id: 12,
    formId: 1,
    identifier: "12",
    sectionId: 2,
    display: "Necessidade de Formação",
    type: "boolean",
  },
  {
    id: 13,
    formId: 1,
    identifier: "13",
    sectionId: 2,
    display: "Existem Funcionarios formados nas seguintes áreas:",
    type: "checkbox",
    data: '{"type":"list","src":[{"id":1,"title":"Arquitetura"},{"id":2,"title":"Engenharia Civil"},{"id":3,"title":"Engenharia Geografica"},{"id":4,"title":"Construção Civil"},{"id":5,"title":"Topografia"},{"id":6,"title":"Recursos Humanos"},{"id":7,"title":"Economia"}]}',
    extraField: '{"type":"number", "display": "Quantidade", "trigger":true}',
    // Trigger -> o valor que sera necessário para habiltar o campo optional
    // Pode ser "true" | "false" | "any"
    // O any é para qualquer valor que não seja null, undefined ou false
  },

  // Section03
  {
    id: 14,
    formId: 1,
    identifier: "14",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Arquitetura?",
    type: "number",
  },
  {
    id: 15,
    formId: 1,
    identifier: "15",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Administração?",
    type: "number",
  },
  {
    id: 16,
    formId: 1,
    identifier: "16",
    sectionId: 3,
    display:
      "Quantos Técnicos Superiores há formados em Contabilidade e Finanças?",
    type: "number",
  },
  {
    id: 17,
    formId: 1,
    identifier: "17",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Direito?",
    type: "number",
  },
  {
    id: 18,
    formId: 1,
    identifier: "18",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Economia?",
    type: "number",
  },
  {
    id: 19,
    formId: 1,
    identifier: "19",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Engenharia Ambiental?",
    type: "number",
  },
  {
    id: 20,
    formId: 1,
    identifier: "20",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Engenharia Civil?",
    type: "number",
  },
  {
    id: 21,
    formId: 1,
    identifier: "21",
    sectionId: 3,
    display:
      "Quantos Técnicos Superiores há formados em Engenharia Informática?",
    type: "number",
  },
  {
    id: 22,
    formId: 1,
    identifier: "22",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Serviço Social?",
    type: "number",
  },
  {
    id: 23,
    formId: 1,
    identifier: "23",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Estatística?",
    type: "number",
  },
  {
    id: 24,
    formId: 1,
    identifier: "24",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Finanças?",
    type: "number",
  },
  {
    id: 25,
    formId: 1,
    identifier: "25",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Gestão?",
    type: "number",
  },
  {
    id: 26,
    formId: 1,
    identifier: "26",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Gestão de RH?",
    type: "number",
  },
  {
    id: 27,
    formId: 1,
    identifier: "27",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em História?",
    type: "number",
  },
  {
    id: 28,
    formId: 1,
    identifier: "28",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Psicologia?",
    type: "number",
  },
  {
    id: 29,
    formId: 1,
    identifier: "29",
    sectionId: 3,
    display:
      "Quantos Técnicos Superiores há formados em Relações Internacionais?",
    type: "number",
  },
  {
    id: 30,
    formId: 1,
    identifier: "30",
    sectionId: 3,
    display: "Quantos Técnicos Superiores há formados em Sociologia?",
    type: "number",
  },
  {
    id: 31,
    formId: 1,
    identifier: "31",
    sectionId: 3,
    display:
      "Quantos Técnicos Superiores há formados em Outras Especialidades?",
    type: "number",
  },
  {
    id: 32,
    formId: 1,
    identifier: "32",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Administração e Finanças?",
    type: "number",
  },
  {
    id: 33,
    formId: 1,
    identifier: "33",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Administração e Gestão?",
    type: "number",
  },
  {
    id: 34,
    formId: 1,
    identifier: "34",
    sectionId: 3,
    display:
      "Quantos Técnicos Médios há formados em Administração Local Autárquica?",
    type: "number",
  },
  {
    id: 35,
    formId: 1,
    identifier: "35",
    sectionId: 3,
    display:
      "Quantos Técnicos Médios há formados em Ciências Matemática e Físicas?",
    type: "number",
  },
  {
    id: 36,
    formId: 1,
    identifier: "36",
    sectionId: 3,
    display:
      "Quantos Técnicos Médios   há formados em Ciências Económicas e Jurídicas",
    type: "number",
  },
  {
    id: 37,
    formId: 1,
    identifier: "37",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Ciências Sociais?",
    type: "number",
  },
  {
    id: 38,
    formId: 1,
    identifier: "38",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Electricidade?",
    type: "number",
  },
  {
    id: 39,
    formId: 1,
    identifier: "39",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Engenharia Informática?",
    type: "number",
  },
  {
    id: 40,
    formId: 1,
    identifier: "40",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Estatística ou Matemática",
    type: "number",
  },
  {
    id: 41,
    formId: 1,
    identifier: "41",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Gestão de RH?",
    type: "number",
  },
  {
    id: 42,
    formId: 1,
    identifier: "42",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Mecânica?",
    type: "number",
  },
  {
    id: 43,
    formId: 1,
    identifier: "43",
    sectionId: 3,
    display: "Quantos Técnicos Médios há formados em Outras Especialidades?",
    type: "number",
  },
  // Section04
  {
    id: 44,
    formId: 1,
    identifier: "44",
    sectionId: 4,
    display: "Nº Total de Homens (valor Absoluto)",
    type: "number",
  },
  {
    id: 45,
    formId: 1,
    identifier: "45",
    sectionId: 4,
    display: "Nº Total de Mulheres (valor Absoluto)",
    type: "number",
  },

  // Section05
  {
    id: 46,
    formId: 1,
    identifier: "46",
    sectionId: 5,
    display: "Distancia em relação ao municipio sede (km)",
    type: "number",
  },
  {
    id: 47,
    formId: 1,
    identifier: "47",
    sectionId: 5,
    display: "Nº de Infraestruturas Administrativas",
    type: "number",
  },
  {
    id: 48,
    formId: 1,
    identifier: "48",
    sectionId: 5,
    display: "Possui Infraestruturas para Administração Municipal?",
    type: "boolean",
  },
  {
    id: 49,
    formId: 1,
    identifier: "49",
    sectionId: 5,
    display: "Se Sim qual é o Estado de Conservação?",
    type: "radio",
    data: '{"type":"list","src":[{"id":1,"title":"Bom"},{"id":2,"title":"Regular"},{"id":3,"title":"Mau"}]}',
  },
  // Section06
  {
    id: 50,
    formId: 1,
    identifier: "50",
    sectionId: 6,
    display: "Nº Total de Estruturas Pre Escolar",
    type: "number",
  },
  {
    id: 51,
    formId: 1,
    identifier: "51",
    sectionId: 6,
    display: "Nº Total de Escolas do Ensino Primário",
    type: "number",
  },
  {
    id: 52,
    formId: 1,
    identifier: "52",
    sectionId: 6,
    display: "Nº Total de Escolas do Ensino Secundário",
    type: "number",
  },
  {
    id: 53,
    formId: 1,
    identifier: "53",
    sectionId: 6,
    display: "Nº Total de Escolas de Ensino Superior",
    type: "number",
  },

  // Section07
  {
    id: 54,
    formId: 1,
    identifier: "54",
    sectionId: 7,
    display: "Nº Total de Hospitais",
    type: "number",
  },
  {
    id: 55,
    formId: 1,
    identifier: "55",
    sectionId: 7,
    display: "Nº Totais de Centros de Saúde",
    type: "number",
  },
  {
    id: 56,
    formId: 1,
    identifier: "56",
    sectionId: 7,
    display: "Nº Total de Postos de Saúde",
    type: "number",
  },

  // Section08
  {
    id: 57,
    formId: 1,
    identifier: "57",
    sectionId: 7,
    display: "Comando Provincial",
    type: "boolean",
  },
  {
    id: 58,
    formId: 1,
    identifier: "58",
    sectionId: 7,
    display: "Comando Municipal",
    type: "boolean",
  },
  {
    id: 59,
    formId: 1,
    identifier: "59",
    sectionId: 7,
    display: "Esquadra Policial",
    type: "boolean",
    extraField:
      '{"type":"number", "display": "Quantos Esquadras existem?", "trigger":true}',
  },
  {
    id: 60,
    formId: 1,
    identifier: "60",
    sectionId: 7,
    display: "Posto Policial",
    type: "boolean",
    extraField:
      '{"type":"number", "display": "Quantos Postos Policiais existem?", "trigger":true}',
  },
  {
    id: 61,
    formId: 1,
    identifier: "61",
    sectionId: 7,
    display: "Posto de Bombeiros",
    type: "boolean",
    extraField:
      '{"type":"number", "display": "Quantos Postos de Bombeiros existem?", "trigger":true}',
  },
];
