# API do repositório de Encurtador de URL!

## Schemas

```ts
type ShortLink = {
  id: string
  slug: string
  url: string
}

type ShortLinkCreate = {
  slug: string
  url: string
}

type Error = {
  message: string
}
```

## Endpoints

| Função | Endpoint |
|:-------|:---------|
| Recuperar todos os links curtos criados | `/links` |
| Criar um link encurtado | `/links` |
| Recuperar um único link pelo slug | `/links/:slug` |
| Remover um único link pelo slug | `/links/:slug` |

**Referência de api**:

| Endpoint | Método | Body | Response |
|:---------|:-------|:-----|:---------|
| `/links` | `GET` | - | `ShortLink[]` |
| `/links` | `POST` | `ShortLinkCreate` | `ShortLink \| Error` |
| `/links/:slug` | `GET` | - | `ShortLink \| null` |
| `/links/:slug` | `DELETE` | - | `Error \| null` |
