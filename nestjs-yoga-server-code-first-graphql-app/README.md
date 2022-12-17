### DB setup

```bash
$ pscale auth login

$ pscale db create nice_db --region ap-northeast
```

### Define Schema

```prisma
model Owner {
  id   Int    @id @default(autoincrement())
  name String
  age  Int
  cats Cat[]
}

// https://www.prisma.io/docs/concepts/components/prisma-schema/relations
model Cat {
  id      Int    @id @default(autoincrement())
  name    String
  age     Int
  owner   Owner  @relation(fields: [ownerId], references: [id])
  ownerId Int

  // https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#indexes
  @@index([ownerId])
}
```

### Reflect planetscale

スキーマを変更したら、Planetscale にはマイグレードではなく、[以下のコマンド反映](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/relation-mode#:~:text=If%20you%20use%20PlanetScale%2C%20which%20does%20not%20support%20foreign%20keys%2C%20we%20generally%20recommend%20that%20you%20use%20db%20push%20rather%20than%20Prisma%20Migrate.)

```bash
$ time npx prisma db push
```

### Generate Types

```bash
$ npx prisma generate
```

### Create Branch

```bash
$ pscale branch create nice_db xxx
```

### Connect Shell

```bash
$ pscale shell nice_db main
```

### Populate Data

```bash
$ time yarn seed
```

### Launch Prisma Studio

```bash
$ npx prisma studio
```

- Points

  - Code first
    - ハンディ
  - Schema first
    - GraphQL の DTO と Prisma から自動生成された型で整合性とるのがしんどい

- Reference
  - [TypeScript + Prisma + NestJS で GraphQL サーバを作ってみる](https://zenn.dev/rince/articles/50a66241d04f0b)
