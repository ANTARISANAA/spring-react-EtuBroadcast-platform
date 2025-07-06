# EduBroadcast

Système de gestion et de notifications pour étudiants - Application frontend développée avec React, TypeScript et Ant Design.

## 🚀 Fonctionnalités

- **Gestion des étudiants** : CRUD complet pour la gestion des profils étudiants
- **Notifications** : Envoi de notifications par email et SMS
- **Interface moderne** : Design responsive avec Ant Design
- **Multilingue** : Support français et anglais
- **Gestion des événements** : Planification et notification d'événements

## 🛠️ Technologies

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Ant Design** - Composants UI
- **Vite** - Build tool
- **React Router** - Navigation
- **i18next** - Internationalisation
- **Tailwind CSS** - Styling

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Build de production
pnpm build

# Vérifier le typage
pnpm type-check

# Linter
pnpm lint
```

## 🌐 Configuration

L'application utilise les variables d'environnement suivantes :

- `VITE_API_BASE_URL` - URL de l'API backend (défaut: http://localhost:8080)

## 📁 Structure du projet

```
src/
├── core/           # Composants et logique métier
├── pages/          # Pages de l'application
├── i18n/           # Fichiers de traduction
├── utils/          # Utilitaires et constantes
└── config/         # Configuration
```

## 🎨 Design System

L'application utilise un design system cohérent avec :
- Couleurs principales : Purple (#8b5cf6)
- Police : Poppins
- Composants : Ant Design + Tailwind CSS

## 📱 Responsive

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran.

## 🔧 Développement

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche feature
3. Commiter les changements
4. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
