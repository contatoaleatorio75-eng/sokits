# Só Kits — Loja Virtual de Afiliados

> Portal de curadoria dos melhores kits e conjuntos da Amazon, Shopee e Mercado Livre.

## 🚀 Setup em 5 Minutos

### 1. Configure o Firebase

```bash
cp .env.example .env.local
```

Abra `.env.local` e cole suas chaves do Firebase Console:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

> **Sem Firebase?** O site funciona em modo demonstração com os 15 produtos do seed.

### 2. Instale e rode

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Estrutura do Projeto

```
sokits/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (loja)
│   │   ├── admin/                # Área administrativa
│   │   │   ├── page.tsx          # Login
│   │   │   ├── layout.tsx        # Layout admin + auth guard
│   │   │   ├── dashboard/        # Dashboard com stats
│   │   │   ├── kits/             # CRUD de kits
│   │   │   └── categorias/       # CRUD de categorias
│   │   └── api/scraper/          # API route do scraper
│   ├── components/
│   │   ├── Header.tsx            # Header responsivo
│   │   ├── Footer.tsx            # Rodapé com aviso legal
│   │   ├── Sidebar.tsx           # Menu lateral dinâmico
│   │   ├── ProductCard.tsx       # Card de produto
│   │   └── KitForm.tsx           # Formulário novo/editar kit
│   └── lib/
│       ├── firebase.ts           # Firebase plug & play
│       ├── firestoreHelpers.ts   # CRUD helpers
│       └── seedData.ts           # 15 produtos iniciais
├── public/logo.png               # Logo da loja
├── .env.example                  # Modelo de variáveis
└── .github/workflows/deploy.yml  # Deploy automático
```

---

## 📦 Deploy no GitHub Pages

### Automático (via GitHub Actions)

1. Faça push para o branch `main`
2. Vá em **Settings → Secrets and variables → Actions**
3. Adicione cada variável do `.env.example` como Secret
4. O deploy ocorre automaticamente a cada push!

### Manual

```bash
npm run deploy
```

---

## ⚙️ Admin Panel

Acesse `/admin` com seu e-mail e senha do Firebase Auth.

**Funcionalidades:**
- ✅ Dashboard com estatísticas
- ✅ CRUD completo de kits (adicionar, editar, excluir)
- ✅ CRUD de categorias
- ✅ **Scraper automático** — Disponível em ambiente dinâmico (Vercel ou local). 
  > *Nota: No GitHub Pages (estático), o scraper está desativado pois requer backend.*
- ✅ Seed automático de 15 produtos no primeiro uso

---

## 🎨 Identidade Visual

| Elemento | Valor |
|---|---|
| Azul Marinho | `#1B3A6B` |
| Laranja | `#FF6B00` |
| Background | `#F8F9FA` |
| Fonte | Inter + Outfit (Google Fonts) |

---

## 📋 Regras Firestore

Adicione no Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /kits/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categorias/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /meta/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

*Só Kits © 2025 — lojasokits.com.br*
