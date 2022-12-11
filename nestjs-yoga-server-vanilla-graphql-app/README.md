- Reference
  - [graphql-yoga-nestjs-v9](https://the-guild.dev/blog/graphql-yoga-nestjs-v9)
  - [schema-first](https://github.com/charlypoly/graphql-yoga-nestjs/tree/master/examples/schema-first)
  - [nestjs quick-start](https://docs.nestjs.com/graphql/quick-start)
  - [prisma seed-database](https://www.prisma.io/docs/guides/database/seed-database)
  - [NestJS で Prisma クライアントを使用する](https://zenn.dev/rince/articles/50a66241d04f0b#5.-nestjs%E3%81%A7prisma%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)
  - [対処方法](https://zenn.dev/tatsuyasusukida/articles/why-prisma-migrate-dev-fails-in-myql#%E5%AF%BE%E5%87%A6%E6%96%B9%E6%B3%95)
  - [planetscale prisma-quickstart](https://planetscale.com/docs/tutorials/prisma-quickstart#initialize-prisma)
  - [planetscale-environment-setup](https://planetscale.com/docs/concepts/planetscale-environment-setup#linux-instructions)
  - [planetscale available-regions](https://planetscale.com/docs/concepts/regions#available-regions)
  - [shadow-database-user-permissions](prisma.io/docs/concepts/components/prisma-migrate/shadow-database#shadow-database-user-permissions)
  - [script-to-create-user](https://planetscale.com/docs/reference/import-tool-user-requirements#script-to-create-user)
  - [コードファーストとスキーマファースト](https://zenn.dev/waddy/books/graphql-nestjs-nextjs-bootcamp/viewer/nestjs#%E3%82%B3%E3%83%BC%E3%83%89%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B9%E3%83%88%E3%81%A8%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B9%E3%83%88)

### DB setup

```bash
$ pscale auth login

$ pscale db create nice_db --region ap-northeast
Database nice_db was successfully created.

View this database in the browser: https://app.planetscale.com/app-club/nice_db
```

### Define GraphQL mapping

add below content.

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

```bash
$ time npx prisma db push
```

### Create Branch

```bash
$ pscale branch create nice_db xxx
```

### Connect Shell

```bash
$ pscale shell nice_db initial-setup
```

```bash
nice_db/initial-setup> show tables;
+--------------------+
| Tables_in_nice_db  |
+--------------------+
| Cat                |
| Owner              |
| _prisma_migrations |
+--------------------+

nice_db/initial-setup> describe Cat;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int          | NO   | PRI | NULL    | auto_increment |
| name    | varchar(191) | NO   |     | NULL    |                |
| age     | int          | NO   |     | NULL    |                |
| ownerId | int          | NO   | MUL | NULL    |                |
+---------+--------------+------+-----+---------+----------------+

nice_db/initial-setup> describe Owner;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| name  | varchar(191) | NO   |     | NULL    |                |
| age   | int          | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
```

### Launch Prisma Studio

```bash
$ npx prisma studio
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```

### Generate Types

```bash
$ npx prisma generate
```
