Ne pas oublier d'utiliser XAMPP pour réaliser les tests avec la base de données MySQL sur Apache

Règles de mise en production:
Ne pas utiliser Nodemon
Passer Express en mode production
Ne pas utiliser les dépendances de développement

heroku create
git remote -v
git push heroku main
heroku open

en cas de défaut de mise en production:
git add .
git commit -m "some fix"
git push heroku main