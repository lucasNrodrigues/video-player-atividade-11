# 🎬 Player de Vídeo Avançado - Atividade 11

## 📖 Sobre o Projeto

Player de vídeo web desenvolvido em **Next.js** com **controles 100% customizados** como continuação da Atividade 10. Este projeto implementa todas as funcionalidades avançadas de um player profissional sem utilizar os controles nativos do HTML5.

**Disciplina:** Multimídia  
**Atividade:** 11 - Player de Vídeo com Controles Customizados  
**Desenvolvido por:** Lucas Rodrigues  

---

## 🎯 Objetivo da Atividade

Dar continuidade ao projeto desenvolvido anteriormente (Atividade 10), ampliando as funcionalidades do player de vídeo com:

- Listagem de múltiplos vídeos
- Controles de tempo avançados
- Navegação entre vídeos
- Reprodução automática sequencial
- **Todos os controles desenvolvidos do zero** (sem usar controles nativos)

---

## ✅ Requisitos Implementados

### ✅ 1. Listagem de Vídeos

- [x] Lista com pelo menos 3 vídeos disponíveis
- [x] Thumbnails/miniaturas de cada vídeo
- [x] Títulos e descrições
- [x] Duração exibida
- [x] Indicador visual do vídeo atual
- [x] Clique para selecionar

### ✅ 2. Reprodução do Vídeo Selecionado

- [x] Ao clicar, vídeo começa a reproduzir
- [x] Troca automática de fonte
- [x] Indicador "TOCANDO" com animação
- [x] Overlay de play ao hover

### ✅ 3. Exibição do Tempo do Vídeo

- [x] Tempo atual (formato MM:SS)
- [x] Tempo total (formato MM:SS)
- [x] **Atualização dinâmica** durante reprodução
- [x] Display em destaque sobre o vídeo

### ✅ 4. Controle de Tempo de Execução

- [x] **Slider customizado** para navegar no vídeo
- [x] **Botão "Retroceder -10 segundos"**
- [x] **Botão "Avançar +10 segundos"**
- [x] Barra de progresso visual
- [x] Arraste para qualquer posição

### ✅ 5. Controle de Navegação entre Vídeos

- [x] **Botão "Próximo Vídeo"**
- [x] **Botão "Vídeo Anterior"**
- [x] **Reprodução automática** do próximo ao terminar
- [x] Loop na playlist
- [x] Navegação via teclado

### ⭐ Requisito Extra: Controles 100% Customizados

- [x] Tag `<video>` com `controls={false}`
- [x] Todos os botões desenvolvidos do zero
- [x] Sliders personalizados com CSS
- [x] Sem uso de controles nativos do HTML5
- [x] Interface moderna e profissional

---

## 🚀 Funcionalidades Extras

Além dos requisitos obrigatórios:

### 🎨 Interface Moderna

- Design dark com gradiente roxo/azul
- Animações suaves
- Hover effects
- Responsivo (mobile/tablet/desktop)

### 🎮 Controles Avançados

- **Fullscreen**: Tela cheia completa
- **Volume**: Slider + Mute/Unmute
- **Auto-hide**: Controles somem após 3s
- **Clique no vídeo**: Play/pause alternado

### 📋 Playlist Inteligente

- Thumbnails reais dos vídeos
- Duração na miniatura
- Destaque do vídeo atual
- Overlay de play ao passar mouse

### ♿ Acessibilidade

- Títulos descritivos em todos botões
- Aria-labels
- Navegação por teclado
- Alto contraste

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** - Framework React
- **[React 18](https://react.dev/)** - Biblioteca de interface
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **HTML5 Video API** - Controle nativo de vídeo

---

## 📂 Estrutura do Projeto

``
video-player-atividade-11/
├── public/
│   ├── video.mp4           # Vídeo 1: Demonstração
│   ├── video2.mp4          # Vídeo 2: Tutorial
│   ├── video3.mp4          # Vídeo 3: Apresentação
│   ├── thumbnail1.jpg      # Miniatura vídeo 1
│   ├── thumbnail2.jpg      # Miniatura vídeo 2
│   └── thumbnail3.jpg      # Miniatura vídeo 3
├── src/
│   └── app/
│       ├── page.tsx        # ⭐ Componente principal do player
│       ├── layout.tsx      # Layout da aplicação
│       └── globals.css     # Estilos globais
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.ts      # Configuração Tailwind
├── next.config.ts          # Configuração Next.js
└── README.md               # Este arquivo

``

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** ou **yarn**
- Navegador moderno (Chrome, Firefox, Edge)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/lucasNrodrigues/video-player-atividade-11.git

# 2. Entre na pasta do projeto
cd video-player-multimidia-atividade-11

# 3. Instale as dependências
npm install
# ou
yarn install
```

### Adicionar Vídeos

```bash
# Copie seus vídeos para a pasta public/
cp ~/Videos/seu-video.mp4 public/video.mp4
cp ~/Videos/seu-video2.mp4 public/video2.mp4
cp ~/Videos/seu-video3.mp4 public/video3.mp4

# Opcional: Extrair thumbnails dos vídeos
ffmpeg -i public/video.mp4 -ss 00:00:05 -vframes 1 public/thumbnail1.jpg
ffmpeg -i public/video2.mp4 -ss 00:00:05 -vframes 1 public/thumbnail2.jpg
ffmpeg -i public/video3.mp4 -ss 00:00:05 -vframes 1 public/thumbnail3.jpg
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse: **<http://localhost:3000>**

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Executar build
npm start
```

---

## 🎮 Como Usar o Player

### Controles Básicos

| Controle | Ação |
|----------|------|
| **▶️ Play/Pause** | Iniciar ou pausar reprodução |
| **Clicar no vídeo** | Alternar play/pause |
| **⏮️ Anterior** | Voltar para vídeo anterior |
| **⏭️ Próximo** | Avançar para próximo vídeo |

### Controles de Tempo

| Controle | Ação |
|----------|------|
| **Barra de progresso** | Arrastar para navegar |
| **-10s** | Retroceder 10 segundos |
| **+10s** | Avançar 10 segundos |
| **0:45 / 3:20** | Visualizar tempo atual/total |

### Controles de Áudio

| Controle | Ação |
|----------|------|
| **🔊 Volume** | Ajustar volume (0-100%) |
| **🔇 Mute** | Silenciar/reativar som |
| **Slider** | Controle fino de volume |

### Outros Controles

| Controle | Ação |
|----------|------|
| **⛶ Fullscreen** | Tela cheia/normal |
| **Playlist** | Clicar em vídeo para trocar |
| **Mouse** | Mover para mostrar controles |

---

## 📋 Vídeos Incluídos

1. **JVKE - Her (Piano Tutorial/Synthesia+Sheet Music)**
   - video de musica pop
   - Arquivo: `video.mp4`

2. **Experience - Ludovico Einaudi - violin cover by Daniel Jang**
   - videeo de musica classica
   - Arquivo: `video2.mp4`

3. **Neto Carvalho l Além do rio azul l Cello cover (Julia vitória)**
   - video de musica gospel
   - Arquivo: `video3.mp4`

> 💡 **Dica**: Para adicionar mais vídeos, edite o array `videos` no arquivo `page.tsx` (linha 16)

---

## 🎨 Design e Interface

### Paleta de Cores

- **Primária**: Roxo (#9333ea) e Azul (#3b82f6)
- **Secundária**: Cinza escuro (#1f2937, #111827)
- **Contraste**: Branco (#ffffff)
- **Fundo**: Gradiente roxo-azul

### Elementos de Design

✨ **Gradientes modernos**  
🎭 **Sombras e profundidade**  
🔄 **Animações suaves**  
📱 **Layout responsivo**  
🖱️ **Hover effects interativos**  
⚡ **Transições fluidas**

---

## 📊 Comparação: Atividade 10 vs 11

| Recurso | Atividade 10 | Atividade 11 |
|---------|--------------|--------------|
| Listagem | ✅ | ✅ |
| Seleção | ✅ | ✅ |
| Play/Pause | ✅ | ✅ |
| Volume | ✅ | ✅ |
| **Tempo dinâmico** | ❌ | ✅ |
| **Slider de tempo** | ❌ | ✅ |
| **Botões ±10s** | ❌ | ✅ |
| **Navegação** | ❌ | ✅ |
| **Auto-play** | ❌ | ✅ |
| **Controles customizados** | Parcial | ✅ 100% |

---

### Preparação

```bash
# 1. Projeto rodando
npm run dev

# 2. Abrir navegador
google-chrome http://localhost:3000

## 🔧 Personalização

### Adicionar Novos Vídeos

Edite `src/app/page.tsx` (linha 16):

```typescript
const [videos, setVideos] = useState<Video[]>([
  {
    id: 1,
    title: "Seu Vídeo",
    description: "Descrição do vídeo",
    url: "/seu-video.mp4",
    thumbnail: "/sua-thumbnail.jpg",
    duration: 0
  },
  // Adicione mais vídeos aqui
]);
```

### Mudar Cores do Tema

Substitua as classes do Tailwind:

```typescript
// De roxo para verde
"bg-purple-600" → "bg-green-600"
"text-purple-400" → "text-green-400"
"from-purple-900" → "from-green-900"
```

### Ajustar Controles

Modifique os valores nas linhas:

```typescript
// Mudar de ±10s para ±5s
const skipForward10 = () => {
  // ... currentTime + 5 ...
}
```

---

## 📚 Documentação Técnica

### Principais Componentes

#### Estados (useState)

```typescript
const [videos, setVideos] = useState<Video[]>([...])           // Lista de vídeos
const [currentVideoIndex, setCurrentVideoIndex] = useState(0)  // Índice atual
const [isPlaying, setIsPlaying] = useState(false)              // Play/Pause
const [currentTime, setCurrentTime] = useState(0)              // Tempo atual
const [duration, setDuration] = useState(0)                    // Duração total
const [volume, setVolume] = useState(70)                       // Volume (0-100)
```

#### Funções Principais

| Função | Descrição |
|--------|-----------|
| `togglePlayPause()` | Alterna play/pause |
| `selectVideo(index)` | Seleciona vídeo da lista |
| `handleNext()` | Próximo vídeo |
| `handlePrevious()` | Vídeo anterior |
| `skipForward10()` | Avança 10 segundos |
| `skipBackward10()` | Retrocede 10 segundos |
| `handleSeek(e)` | Controla slider |
| `formatTime(seconds)` | Formata tempo MM:SS |

#### Hooks Utilizados

- **`useState`**: Gerenciamento de estado
- **`useRef`**: Referências ao vídeo e container
- **`useEffect`**: Sincronização e eventos

---

## 🐛 Solução de Problemas

### Vídeo não carrega

```bash
# Verificar se arquivo existe
ls -lh public/video.mp4

# Limpar cache
rm -rf .next
npm run dev
```

### Controles não aparecem

- Mova o mouse sobre o vídeo
- Verifique se JavaScript está habilitado
- Tente outro navegador

### Erro de compilação TypeScript

```bash
# Reinstalar dependências
rm -rf node_modules .next
npm install
npm run dev
```

### Thumbnails não aparecem

- Verifique se arquivos `.jpg` estão em `public/`
- O player usa fallback (emoji) se imagem falhar
- Extraia thumbnails com ffmpeg (ver seção de instalação)

---

## 📋 Checklist de Entrega

### Código

- [ ] ✅ Projeto funcionando
- [ ] ✅ 3+ vídeos adicionados
- [ ] ✅ Listagem implementada
- [ ] ✅ Seleção funcionando
- [ ] ✅ Tempo dinâmico
- [ ] ✅ Slider de tempo
- [ ] ✅ Botões ±10s
- [ ] ✅ Navegação (anterior/próximo)
- [ ] ✅ Auto-play ao terminar
- [ ] ✅ Controles 100% customizados

### Documentação

- [ ] ✅ README completo
- [ ] ✅ Comentários no código
- [ ] ✅ Instruções de instalação
- [ ] ✅ Requisitos marcados

### GitHub

- [ ] ✅ Repositório criado
- [ ] ✅ Código commitado
- [ ] ✅ Push realizado
- [ ] ✅ Repositório público

### Vídeo

- [ ] 🎥 Gravado (máx 3 min)
- [ ] 🎥 Mostra todos 5 requisitos
- [ ] 🎥 Upload no YouTube/Vimeo
- [ ] 🎥 Link adicionado no README

---

## 🔗 Links do Projeto

- **GitHub**: <https://github.com/lucasNrodrigues/video-player-atividade-11>
- **Vídeo Demo**: [Adicionar link após upload]
- **Deploy**: [Se hospedado na Vercel/Netlify]

---

## 👨‍💻 Autor

**Lucas do nascimento Rodrigues**.

- GitHub: [@lucasNrodrigues](https://github.com/lucasNrodrigues)
- Email: <lucas.rodrigues67337@alunos.ufersa.edu.br>

---

## 🎓 Informações Acadêmicas

**Disciplina:** Multimídia e Desenvolvimento Web  
**Instituição:** [Nome da Instituição]  
**Professor:** [Nome do Professor]  
**Período:** Novembro/2024  
**Atividade:** 11 - Player de Vídeo Avançado (Continuação)

---

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de Multimídia e Desenvolvimento Web.

---

## 🙏 Agradecimentos

- Professor pela orientação e feedback
- Colegas de turma pelo apoio
- Comunidade Next.js pela documentação
- Desenvolvedores das bibliotecas utilizadas

---

## 📌 Notas Importantes

### Diferencial desta Atividade

✨ **Controles 100% Customizados**

- Nenhum controle nativo do HTML5 foi usado
- Todos os botões desenvolvidos do zero
- Sliders personalizados com CSS
- Interface moderna e profissional

### Requisitos Atendidos

| # | Requisito | Status |
|---|-----------|--------|
| 1 | Lista 3+ vídeos | ✅ Implementado |
| 2 | Seleção e reprodução | ✅ Implementado |
| 3 | Tempo dinâmico | ✅ Implementado |
| 4 | Controles de tempo | ✅ Implementado |
| 5 | Navegação automática | ✅ Implementado |
| ⭐ | Controles customizados | ✅ 100% Custom |

---

## 🚀 Próximos Passos

Possíveis melhorias futuras:

- [ ] Modo picture-in-picture
- [ ] Legendas/closed captions
- [ ] Controle de velocidade (0.5x, 1x, 1.5x, 2x)
- [ ] Marcadores de capítulos
- [ ] Modo teatro
- [ ] Histórico de reprodução
- [ ] Favoritos
- [ ] Compartilhamento social

---

## 📊 Estatísticas do Projeto

- **Linhas de código**: ~600
- **Componentes**: 1 principal
- **Estados**: 7
- **Funções**: 12+
- **Requisitos**: 5/5 ✅
- **Extras**: Fullscreen, volume, auto-hide

---

**⭐ Player de Vídeo Avançado - Atividade 11 Completa!**

_Desenvolvido com ❤️ usando Next.js, React e TypeScript._
