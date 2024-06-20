# Examen Node JS MongoDB

Modèle de la base de donnée pour la marque :

Pour la collection marque j’ai choisi de prendre une image donc qui est souvent le logo, un nom de la marque et un guide de démarrage car j’ai vue que pour les différentes marques de flipper il y a des guides de démarrage différents, sous format de pdf ou image.

On peut voir juste en dessous mon GET [localhost:3000/api/brands](http://localhost:3000/api/brands) avec mes deux marques qui sont récupérer et que j’ai créer avec ce body :

```json
[
 {
  "_id": "667436d0a2863fc014c97172",
  "name": "Brand2",
  "image": "media/test2.png",
  "quickstart": "media/quickstart1.pdf"
  "__v": 0
 },
 {
  "_id": "6674391da2863fc014c97183",
  "name": "Brand4",
  "image": "media/test3.png",
  "__v": 0
 }
]
```

Mon POST :

```json
{
  "_id": "667436d0a2863fc014c97172",
  "name": "Brand2",
  "image": "media/test2.png",
  "quickstart": "media/quickstart1.pdf"
  "__v": 0
 }
```

Collection des flippers :

Pour les flippers, j’ai le nom, l’id de la marque pour qu’il soit lié avec les marques, les dimensions, le poids, l'état Occasion ou Neuf, l’année de sortie, une note, le prix, le statut du stock pour voir si il est en stock et des images du flipper.

On peut voir juste en dessous mon GET [localhost:3000/api/](http://localhost:3000/api/brands)flippers avec mes 5 flippers qui sont récupérer et que j’ai créer avec ce body :

```json
[
    {
        "name": "Pinball Wizard",
        "price": 4999.99,
        "stockStatus": "in_stock",
        "state": "new",
        "releaseDate": "2023-05-12T00:00:00Z",
        "rating": 4.7,
        "dimensions": "200*200*200",
        "weight": "250kg",
        "images": [
            "https://example.com/images/pinball-wizard-front.jpg",
            "https://example.com/images/pinball-wizard-side.jpg"
        ],
        "brandId": "667436d0a2863fc014c97172"
    },
    {
        "name": "Space Adventure",
        "price": 5999.99,
        "stockStatus": "pre_order",
        "state": "new",
        "releaseDate": "2024-01-20T00:00:00Z",
        "rating": 4.9,
        "dimensions": "200*200*200",
        "weight": "260",
        "images": [
            "https://example.com/images/space-adventure-front.jpg",
            "https://example.com/images/space-adventure-side.jpg"
        ],
        "brandId": "667436d0a2863fc014c97172"
    },
    {
        "name": "Retro Mania",
        "price": 4500.00,
        "stockStatus": "out_of_stock",
        "state": "new",
        "releaseDate": "2022-11-15T00:00:00Z",
        "rating": 4.5,
        "dimensions": "200*200*200",
        "weight": "245",
        "images": [
            "https://example.com/images/retro-mania-front.jpg",
            "https://example.com/images/retro-mania-side.jpg"
        ],
        "brandId": "667436d0a2863fc014c97172"
    },
    {
        "name": "Future Shock",
        "price": 7000.00,
        "stockStatus": "in_stock",
        "state": "new",
        "releaseDate": "2023-09-01T00:00:00Z",
        "rating": 4.8,
        "dimensions": "200*200*200",
        "weight": "280",
        "images": [
            "https://example.com/images/future-shock-front.jpg",
            "https://example.com/images/future-shock-side.jpg"
        ],
        "brandId": "667436d0a2863fc014c97172"
    },
    {
        "name": "Galactic Quest",
        "price": 6500.00,
        "stockStatus": "in_stock",
        "state": "new",
        "releaseDate": "2023-07-10T00:00:00Z",
        "rating": 4.6,
        "dimensions": "200*200*200",
        "weight": "270",
        "images": [
            "https://example.com/images/galactic-quest-front.jpg",
            "https://example.com/images/galactic-quest-side.jpg"
        ],
        "brandId": "6674391da2863fc014c97183"
    }
]
```

Mon POST :

```json
{
 "name": "Twilight Zone",
 "brandId": "667435ee8cb026af6f65d28b",
 "characteristics": {
  "year": 1993,
  "rating": 9,
  "price": 9000,
  "availability": "Limited Stock",
  "_id": "6674373f8cb026af6f65d2a8"
 },
 "images": [
  "https://example.com/images/twilight-zone1.jpg",
  "https://example.com/images/twilight-zone2.jpg"
 ],
 "_id": "6674373f8cb026af6f65d2a7",
 "__v": 0
}
```

# Optimisation

## Améliorer le ‘search’ par nom de flipper

Pour améliorer les recherches par nom de flipper, on peut créer un index textuel sur le champ `name`.

```jsx
db.flippers.createIndex({ name: "text" });
```

Pour utiliser cet index dans une requête de recherche, on peut utiliser la méthode `$text` de MongoDB :

```jsx
db.flippers.find({ $text: { $search: "Addams Family" } });
```

Et ajouter un index à la page pour une recherche plus facile avec le scroll

## Accélérer la présentation en liste des flippers sur la home page

On peut créer un index composé sur les champs fréquemment utilisés dans les requêtes de listing, comme `brandId` et `price`.

```jsx
db.flippers.createIndex({ brandId: 1, price: -1 });
```

## Implémentation du scroll infini

Nous pouvons aussi charger que les 12 premiers flippers sur la page d'accueil et attendre que l'internaute scroll vers le bas pour requeter les flippers suivants, cela va diminuer le temps de chargement initial de la page
