# API do repositório de Encurtador de URL!

## Schemas

`LinkShortener`:
```json
{
  "id": "string",
  "slug": "string",
  "url": "string"
}
```

`LinkShortenerCreate`:
```json
{
  "slug": "string",
  "url": "string"
}
```

`Error`:
```json
{
  "message": "string"
}
```

## Endpoints

| Endpoint | Método | Body | Response |
|:---------|:-------|:-----|:---------|
| `/links` | `GET` | - | `LinkShortener[]` |
| `/links` | `POST` | `LinkShortenerCreate` | `LinkShortener \| Error` |
| `/links/:id` | `GET` | - | `LinkShortener \| null` |
