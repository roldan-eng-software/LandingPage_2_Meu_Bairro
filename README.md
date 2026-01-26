# MeuBairro Landing Page 🏘️

Landing page profissional para o MeuBairro - plataforma que conecta profissionais e serviços locais aos moradores do bairro.

## 📁 Estrutura do Projeto

```
meubairro-landing/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos CSS (variáveis, componentes, responsivo)
├── js/
│   └── main.js             # JavaScript (EmailJS, validações, interações)
├── images/
│   ├── hero-bg.png         # Ilustração hero
│   ├── testimonials/       # Fotos dos depoimentos
│   │   ├── eletricista.png
│   │   ├── manicure.png
│   │   └── encanador.png
│   └── logo/
│       └── logo-meubairro.png
└── README.md               # Este arquivo
```

## 🚀 Deploy no GitHub Pages

### Passo 1: Crie um repositório no GitHub
1. Vá para [github.com/new](https://github.com/new)
2. Nome do repositório: `meubairro-landing` (ou outro de sua preferência)
3. Deixe como **Público**
4. Clique em **Create repository**

### Passo 2: Faça o push do código
```bash
cd /caminho/para/meubairro-landing

# Inicializa Git (se necessário)
git init

# Adiciona os arquivos
git add .

# Commit inicial
git commit -m "Landing page MeuBairro"

# Adiciona o repositório remoto
git remote add origin https://github.com/SEU_USUARIO/meubairro-landing.git

# Push para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Ative o GitHub Pages
1. Vá para **Settings** do repositório
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch **main** e pasta **/ (root)**
5. Clique em **Save**

### Passo 4: Acesse sua landing page
Após alguns minutos, sua página estará disponível em:
```
https://SEU_USUARIO.github.io/meubairro-landing/
```

## 📧 Configuração do EmailJS

Para o formulário de captura de leads funcionar, configure o EmailJS:

### 1. Crie uma conta
Acesse [emailjs.com](https://www.emailjs.com/) e crie uma conta gratuita.

### 2. Crie um Email Service
1. Vá para **Email Services**
2. Clique em **Add New Service**
3. Escolha seu provedor (Gmail, Outlook, etc.)
4. Conecte sua conta
5. Anote o **Service ID** (ex: `service_meubairro`)

### 3. Crie os Templates

#### Template para o Usuário (template_user)
- Vá para **Email Templates** → **Create New Template**
- Assunto: `Bem-vindo ao MeuBairro! Suas Dicas Exclusivas Estão a Caminho`
- Conteúdo:
```
Olá {{nome}},

Obrigado por se inscrever no MeuBairro! 🎉

Você receberá dicas exclusivas sobre como conquistar mais clientes no seu bairro.

Seu tipo de serviço: {{servico}}

Em breve entraremos em contato com conteúdo personalizado para você.

Abraços,
Equipe MeuBairro
```
- Anote o **Template ID**

#### Template para Admin (template_admin)
- Crie outro template
- Assunto: `Novo Lead Capturado - {{nome}}`
- Conteúdo:
```
Novo lead capturado no MeuBairro!

Nome: {{nome}}
Email: {{email}}
Tipo de Serviço: {{servico}}

Hora do registro: {{time}}
```
- Anote o **Template ID**

### 4. Obtenha sua Public Key
1. Vá para **Account** → **General**
2. Copie sua **Public Key**

### 5. Configure no código
Abra `js/main.js` e substitua as configurações:

```javascript
const EMAILJS_CONFIG = {
  publicKey: 'SUA_PUBLIC_KEY_AQUI',
  serviceId: 'service_meubairro',
  templateIdUser: 'template_user',
  templateIdAdmin: 'template_admin'
};
```

## 📱 WhatsApp

O botão flutuante do WhatsApp já está configurado para:
- **Número:** +55 16 98144-2301
- **Mensagem padrão:** "Olá! Gostaria de saber mais sobre o MeuBairro"

Para alterar, edite os links `wa.me` no `index.html`.

## 🎨 Personalização

### Cores
As cores podem ser alteradas no início do arquivo `css/style.css`:

```css
:root {
  --primary-green: #10B981;      /* Verde principal */
  --secondary-blue: #1E3A5F;     /* Azul escuro */
  --accent-orange: #F97316;      /* Laranja destaque */
  --whatsapp-green: #25D366;     /* Verde WhatsApp */
}
```

### Fontes
A fonte padrão é **Inter** do Google Fonts. Para trocar, edite o `<link>` no `<head>` do HTML.

### Imagens
Substitua os arquivos na pasta `images/` mantendo os mesmos nomes, ou altere os caminhos no HTML.

## ✅ Funcionalidades

- [x] Navbar fixa com scroll suave
- [x] Menu hambúrguer responsivo
- [x] Modal "Em Breve" para login
- [x] Hero section com animação
- [x] Seção de problemas/dores
- [x] Seção de soluções/vantagens
- [x] Como funciona (3 passos)
- [x] Tabela de preços (2 planos)
- [x] Formulário de captura com EmailJS
- [x] Validação de formulário em tempo real
- [x] Depoimentos com fotos
- [x] CTA final
- [x] Footer completo
- [x] Botão WhatsApp flutuante
- [x] 100% responsivo (mobile, tablet, desktop)
- [x] Animações sutis de scroll
- [x] SEO otimizado (meta tags, Open Graph)

## 📊 Analytics (Opcional)

Para adicionar Google Analytics, insira antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Substitua `G-XXXXXXXXXX` pelo seu ID do GA4.

## 🆘 Suporte

Dúvidas? Entre em contato:
- 📧 Email: contato@meubairro.dev.br
- 📱 WhatsApp: +55 16 98144-2301

## 📄 Licença

© 2026 MeuBairro. Todos os direitos reservados.
