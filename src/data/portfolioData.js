export { PROFILE } from './profileData'

export const ABOUT_PARAGRAPHS = [
  'Sou um desenvolvedor de software apaixonado por Visão Computacional e Inteligência Artificial. Trabalho com Python e JavaScript para construir soluções que vão de reconhecimento de linguagem de sinais com MediaPipe a blogs astronômicos com Three.js e NASA API.',
  'Tenho interesse em acessibilidade digital — com projetos voltados para comunicação em Libras (Língua Brasileira de Sinais) — e em ferramentas criativas para automação 3D com Blender e geração de conteúdo visual.',
  'No campo web, gosto de criar experiências imersivas com canvas, WebGL e animações. Meus projetos combinam técnica e estética, como o CosmosView, um blog de astronomia interativo.',
  'Busco constantemente aprender e aplicar novas tecnologias, seja em ciência de dados, automação de processos ou desenvolvimento de ferramentas open-source.',
]

export const COSMOSVIEW_URL = 'https://carlosarantes53.github.io/NASA_MBA/'

export const STATS = [
  { value: '22+', label: 'Repositórios' },
  { value: 'Python', label: 'Linguagem principal' },
  { value: 'CV & AI', label: 'Foco técnico' },
  { value: 'Open Source', label: 'Filosofia' },
]

export const PROJECT_CATEGORIES = ['Todos', 'IA & CV', 'Web & 3D', 'Automação & 3D']

export const PROJECTS = [
  {
    title: 'CosmosView — NASA_MBA',
    category: 'Web & 3D',
    description:
      'Blog de astronomia e exploração espacial com integração à NASA API (APOD, Earth, EPIC). Background 3D em Three.js, temas dark/light e roteamento SPA em React.',
    tags: ['React', 'Three.js', 'NASA API', 'Vite', 'Tailwind'],
    url: 'https://github.com/CarlosArantes53/NASA_MBA',
    demo: 'https://carlosarantes53.github.io/NASA_MBA/',
  },
  {
    title: 'Libras Inference — MediaPipe',
    category: 'IA & CV',
    description:
      'Reconhecimento em tempo real de sinais da Língua Brasileira de Sinais (Libras) usando MediaPipe Hands e modelos de classificação com OpenCV.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'YOLO', 'CV'],
    url: 'https://github.com/CarlosArantes53/LibrasInferenciaMediapipeHands',
  },
  {
    title: 'MediaPipe Tests',
    category: 'IA & CV',
    description:
      'Coleção de experimentos com rastreamento de pose, mãos e rosto usando MediaPipe. Notebooks Jupyter com visualizações e análises de landmarks.',
    tags: ['Python', 'Jupyter', 'MediaPipe', 'NumPy'],
    url: 'https://github.com/CarlosArantes53/MediaPipe-tests',
  },
  {
    title: 'TTRPG Web Tools',
    category: 'Web & 3D',
    description:
      'Ferramentas web para RPG de mesa: fichas de personagem cyberpunk e sistema de tabelas para D&D. Interface imersiva com HTML/CSS/JS puro.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://github.com/CarlosArantes53/Cyberpunk_ttrpg',
  },
  {
    title: 'Blender 3D Tools',
    category: 'Automação & 3D',
    description:
      'Scripts Python para automação no Blender: gerador de logos 3D, construtor de dados para poliedros e gerador de litofanias a partir de imagens.',
    tags: ['Python', 'Blender', 'Automação 3D'],
    url: 'https://github.com/CarlosArantes53/logo_3d_maker',
  },
  {
    title: 'TFC — Segmentação Geoespacial',
    category: 'IA & CV',
    description:
      'Trabalho final de curso: segmentação de imagens geoespaciais usando deep learning. Inferência sobre dados do satélite Copernicus com máscaras de rio.',
    tags: ['Python', 'Jupyter', 'Deep Learning', 'Geoespacial'],
    url: 'https://github.com/CarlosArantes53/TFC',
  },
]

export const SKILLS = [
  { name: 'Python', level: 95 },
  { name: 'JavaScript', level: 80 },
  { name: 'React', level: 75 },
  { name: 'MediaPipe', level: 90 },
  { name: 'OpenCV', level: 85 },
  { name: 'YOLO', level: 80 },
  { name: 'Three.js', level: 65 },
  { name: 'Blender', level: 70 },
  { name: 'Jupyter', level: 90 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'Vite', level: 70 },
  { name: 'HTML/CSS', level: 85 },
]

export const SKILL_CATEGORIES = [
  {
    title: 'Visão Computacional & IA',
    items: ['Python', 'MediaPipe', 'OpenCV', 'YOLO', 'Jupyter', 'NumPy'],
  },
  {
    title: 'Web & Frontend',
    items: ['JavaScript', 'React', 'Three.js', 'HTML/CSS', 'Tailwind CSS', 'Vite'],
  },
  {
    title: '3D & Automação',
    items: ['Blender', 'Python Scripts', 'Power BI', 'PDF Processing', 'Git'],
  },
]

export const CONTACT_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/CarlosArantes53',
    description: 'Código & projetos',
    handle: '@CarlosArantes53',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/carlos-eduardo-de-paula-arantes-5415181aa/',
    description: 'Perfil profissional',
    handle: 'Carlos Eduardo',
  },
  {
    id: 'lattes',
    label: 'Lattes',
    href: 'https://lattes.cnpq.br/2955071584883186',
    description: 'Currículo acadêmico',
    handle: 'CNPq Lattes',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:carlos.arantes05@gmail.com',
    description: 'carlos.arantes05@gmail.com',
    handle: 'carlos.arantes05@gmail.com',
  },
]
