# Page de Profil Zone01 🚀

## Objectifs 🎯

L'objectif de ce projet est d'apprendre le langage de requête GraphQL en créant votre propre page de profil. Vous utiliserez le point de terminaison GraphQL fourni par la plateforme (https://zone01normandie.org/api/graphql-engine/v1/graphql) pour interroger vos propres données et remplir votre page de profil.

## Fonctionnalités ✨

- **Page de Connexion**: Permet aux utilisateurs de se connecter en utilisant soit nom d'utilisateur:mot de passe, soit email:mot de passe. Affiche des messages d'erreur appropriés pour les identifiants invalides. Fournit une méthode pour se déconnecter.
- **Page de Profil**: Affiche des informations utilisateur telles que l'identification de base de l'utilisateur, la quantité d'XP, les notes, les audits et les compétences.
- **Section Statistiques**: Génère au moins deux graphiques statistiques différents en utilisant SVG pour visualiser les données utilisateur.

## Instructions 📋

### Page de Connexion 🔐

1. **Authentification JWT**: Obtenez un JWT à partir du point de terminaison de connexion (https://zone01normandie.org/api/auth/signin) en utilisant l'authentification Basic avec encodage base64.
2. **Identifiants**: La page de connexion doit fonctionner avec à la fois nom d'utilisateur:mot de passe et email:mot de passe.
3. **Gestion des Erreurs**: Affichez des messages d'erreur appropriés pour les identifiants invalides.
4. **Déconnexion**: Fournissez une méthode pour se déconnecter.

### Page de Profil 👤

1. **Requêtes GraphQL**: Utilisez le point de terminaison GraphQL pour interroger les données utilisateur.
2. **Affichage des Informations**: Affichez au moins trois informations utilisateur, telles que :
   - Identification de base de l'utilisateur
   - Quantité d'XP
   - Notes
   - Audits
   - Compétences
3. **Section Statistiques**: Génère au moins deux graphiques statistiques différents en utilisant SVG. Combinaisons possibles :
   - XP gagné sur une période de temps (progression au fil du temps)
   - XP gagné par projet
   - Ratio d'audit
   - Ratio de réussite et d'échec des projets
   - Statistiques de la piscine (JS/Go) ratio de réussite et d'échec
   - Tentatives pour chaque exercice

### Hébergement 🌐

Hébergez votre page de profil sur une plateforme de votre choix, telle que GitHub Pages ou Netlify.

## Requêtes GraphQL 🔍

Voici quelques exemples de requêtes pour vous aider à démarrer :

### Requête de Base

```graphql
{
  user {
    id
  }
}
```

### Requête avec Champs Supplémentaires

```graphql
{
  user {
    id
    login
  }
}
```

### Requête avec Arguments

```graphql
{
  object(where: { id: { _eq: 3323 }}) {
    name
    type
  }
}
```

### Requête Imbriquée

```graphql
{
  result {
    id
    user {
      id
      login
    }
  }
}
```

## Technologies Utilisées 🛠️

- **React**: Pour construire l'interface utilisateur.
- **GraphQL**: Pour interroger les données à partir du point de terminaison.
- **SVG**: Pour créer des graphiques statistiques.
- **JWT**: Pour l'authentification et l'autorisation.

## Pour Commencer 🚀

1. **Clonez le dépôt** :
   ```sh
   git clone https://github.com/yourusername/zone01-profile.git
   cd zone01-profile
   ```

2. **Installez les dépendances** :
   ```sh
   npm install
   ```

3. **Exécutez l'application** :
   ```sh
   npm start
   ```

4. **Ouvrez l'application** :
   Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Déploiement 🚀

Déployez votre application sur une plateforme d'hébergement de votre choix, telle que GitHub Pages ou Netlify.

## Licence 📄

Ce projet est sous licence [MIT License](LICENSE).