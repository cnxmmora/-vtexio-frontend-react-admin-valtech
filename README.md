# 🍪 VTEX Fortune Cookie App

Este proyecto es una integración personalizada para VTEX IO que permite mostrar y administrar mensajes tipo "Galleta de la Fortuna" en una tienda. Incluye funcionalidades de backend con GraphQL y administración desde el Admin de VTEX, así como un componente visible en una landing page.

---

## 📦 `Estructura del Proyecto`

## 🎬 Demostración

![Front Store-Theme](./assets/screen-capture-_3_.gif)


### `Descripción de Resolvers`

`getCookieData:` Retorna todas las frases almacenadas en Master Data.

`getRandomCookieData:` Devuelve una frase aleatoria para mostrar en el componente de tienda.

`searchCookieData:` Permite buscar una frase específica por su contenido.

`createCookieData:` Crea una nueva frase y la guarda en Master Data.

`updateCookieData:` Actualiza una frase existente mediante su id.

`deleteCookieData:` Elimina una frase específica por id.

### Front-End (React + GraphQL)
Landing Page (valtech.json)
Incluye los bloques:

**valtech-fortune-cookie-component**: Renderiza la frase y el número de la suerte.

**rich-text#title-party-cookie**: Muestra título editable.

**rich-text#paragrap-party-cookie**: Explica que todo es editable con Site Editor.


### Componente FortuneCookie
Este componente:

Consume la query getRandomCookieData.

Muestra la frase en el Home Page.

Tiene propiedades editables vía Site Editor.

Props disponibles:

json
Copiar
Editar

{
  "blockClass": `"content-party-cookie"`,
  "content": "**Tendré Suerte** 🍪",
  "subtitleContent": "##### **Tu Número**"
}

### 🔧 Queries de GraphQL 
graphql

mutation `CREATE_COOKIE`($CookieFortune: String!) {
  createCookieData(CookieFortune: $CookieFortune) {
    id
    CookieFortune
  }
}

mutation `DELETE_COOKIE`($id: ID!) {
  deleteCookieData(id: $id) {
    id
    CookieFortune
  }
}

query `GET_RANDOM_COOKIE` {
  getRandomCookieData {
    id
    CookieFortune
  }
}

query `GET_COOKIE` {
  getCookieData {
    id
    CookieFortune
  }
}

mutation `UPDATE_COOKIE`($id: ID!, $CookieFortune: String!) {
  updateCookieData(id: $id, CookieFortune: $CookieFortune) {
    id
    CookieFortune
  }
}

## 📚 Stack Tecnológico

- VTEX IO
- Master Data v1
- GraphQL
- React.js

---


## 🔍 Buenas prácticas aplicadas

| Práctica                        | Implementación                                                      |
|-------------------------------|-----------------------------------------------------------------------|
| GraphQL con tipado fuerte      | Schema y resolvers validados                                         |
| Modularización                 | Carpeta `react` y `node` separadas, funciones aisladas               |
| Manejo de errores              | Todos los resolvers usan `try/catch` y validación de argumentos      |
| Reutilización de componentes   | `FortuneCookieBlock` app Store como Custom Block               |
| Control de estado en frontend  | Uso de `useQuery` y `refetch` desde Apollo Client                    |

---

## 🧪 Workspace de prueba

Puedes probar la app funcionando en el siguiente workspace:

```
https://mauricio--valtech.myvtex.com/admin/cookie-aplication

https://mauricio--valtech.myvtex.com/valtechhome

```
---

## 🤝 Contribución

1. Crea un fork del proyecto
2. Crea una rama nueva con tu mejora (`git checkout -b feat/node-valtech_services`)
3. Haz `push` y abre un Pull Request
