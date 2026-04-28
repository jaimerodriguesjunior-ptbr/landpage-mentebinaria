export type Feature = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  highlight?: boolean;
  mediaUrl?: string; // NOVO: URL da imagem ou vídeo associado à feature
  mediaAspect?: "16/9" | "9/16" | "square"; // NOVO: Relacionado ao formato (ex: portal do cliente é 9/16)
};

export type OtherProduct = {
  id: string;
  name: string;
  summary: string;
  url: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
};

export const mainFeatures: Feature[] = [
  {
    id: "login",
    title: "Acesso Simplificado e Seguro",
    description:
      "Acesso imediato com controle de níveis de permissão. Seus mecânicos veem apenas o que precisam, e os administradores possuem visão total de faturamento.",
    icon: "ShieldCheck",
    mediaUrl: "/autoeletrica/pagina-de-login.jpg",
    mediaAspect: "16/9"
  },
  {
    id: "comissoes",
    title: "Gestão Avançada de Comissões",
    description:
      "Controle percentuais individuais de comissão por mecânico nos serviços executados. Feche a O.S. e o sistema já contabiliza o que precisa ser pago para a equipe em tempo real no final do mês.",
    icon: "LineChart",
    mediaUrl: "/autoeletrica/comissao.mp4",
    mediaAspect: "square"
  },
  {
    id: "os-fotos",
    title: "Ordem de Serviço Simplificada com Fotos",
    description:
      "Abra ordens de serviço rapidamente, identificando veículos e lendo placas pela câmera do celular. Adicione fotos e vídeos ilimitados para comprovação técnica diretamente da bancada.",
    icon: "Camera",
    mediaUrl: "/autoeletrica/abriros.mp4",
    mediaAspect: "9/16"
  },
  {
    id: "portal",
    title: "Portal do Cliente Inteligente",
    description:
      "Os clientes acompanham orçamentos, validam serviços e aprovam medições sem precisarem fazer login. Envie um link pelo WhatsApp e receba a aprovação instantaneamente com geolocalização e validade jurídica.",
    icon: "LayoutDashboard",
    mediaUrl: "/autoeletrica/passo a passo cliente.mp4",
    mediaAspect: "9/16"
  },
  {
    id: "fiscal",
    title: "Emissão de Nota Fiscal sem Complicação",
    description:
      "Emita NFC-e para peças e NFS-e para a mão de obra diretamente da O.S., sem redigitar informações. O sistema preenche tributações em lote, com o suporte de inteligência artificial para sugerir NCM.",
    icon: "Receipt",
    mediaUrl: "/autoeletrica/emitirnotalandpage.mp4",
    mediaAspect: "9/16"
  },
  {
    id: "multiplataforma",
    title: "Funciona em Celular, Tablet e Computador",
    description:
      "A operação da mecânica na palma da sua mão. Enquanto a recepção e gerência utilizam os computadores, os mecânicos adicionam serviços, finalizam trabalho e validam o checklist pelo próprio celular.",
    icon: "MonitorSmartphone",
  },
  {
    id: "nuvem",
    title: "100% Nuvem. Gestão de Onde Estiver",
    description:
      "Mantenha-se no controle da oficina de longe. Acompanhe entradas, extratos de pagamentos, comissões e faturamento em tempo real, numa nuvem segura.",
    icon: "Cloud",
  },
];

export const otherProducts: OtherProduct[] = [
  {
    id: "otica",
    name: "Ótica",
    summary: "Sistema especialista para óticas, receitas avulsas, vendas e acompanhamento laboratorial.",
    url: "#",
  },
  {
    id: "presente",
    name: "Lojas de Presente e Varejo",
    summary: "Integração rápida para frentes de caixa e gestão de presentes. Foco no volume de vendas.",
    url: "#",
  },
];

// Esses campos representam as informações dos slots de screenshots. 
// Para cada destaque vamos ter o lugar pra colocar imagem e texto.
export const screenshotSlots = [
  {
    id: "login",
    title: "Acesso Simplificado",
    caption: "Página de login segura do programa.",
    imageDefault: "/autoeletrica/pagina-de-login.jpg"
  },
  {
    id: "portal-cliente",
    title: "Portal do Cliente Inteligente",
    caption: "O cliente acompanha o passo a passo do veículo na oficina.",
    imageDefault: "/autoeletrica/passo a passo cliente.mp4"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "norberto",
    name: "Norberto Tajiri",
    role: "Proprietário da NHT Centro Automotivo - Guaíra",
    content: "Diferente de outros programas, o MBRepair é extremamente estável. E se surge qualquer dúvida, o suporte é imediato. Estou muito satisfeito com a confiança que o sistema passa.",
  },
  {
    id: "paulinho",
    name: "Paulinho",
    role: "Proprietário da Rally Auto-Center - Guaíra",
    content: "O Portal do Cliente resolveu minha maior dor de cabeça: a garantia de peças de terceiros. Agora eu envio o link pelo WhatsApp e o cliente autoriza tudo pelo portal, sendo informado juridicamente no ato. Isso nos traz uma tranquilidade enorme.",
  },
  {
    id: "delson",
    name: "Delson Kabroski",
    role: "Proprietário da Dom Centro Automotivo - Toledo",
    content: "Acredito que este seja o melhor sistema de gestão de oficinas da nossa região. Conseguiram unir simplicidade com ferramentas poderosas. É o equilíbrio perfeito para o dia a dia.",
  },
];
