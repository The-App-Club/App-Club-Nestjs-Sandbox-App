import {Injectable, Logger} from '@nestjs/common';
import {Cat} from '@/graphql.schema';
import {PrismaService} from '@/prisma.service';
import {Cat as ICat, Prisma} from '@prisma/client';

@Injectable()
export class CatsService {
  // https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
  constructor(private prisma: PrismaService) {}

  // supabaseやらplanetscale,faunaにつなぐレイヤー
  private readonly cats: Array<Cat & {ownerId?: number}> = [
    {id: 1, name: 'Cat', age: 5, ownerId: 1},
  ];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  // https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services:~:text=Still%20inside%20the%20src%20directory%2C%20create%20a%20new%20file%20called%20post.service.ts%20and%20add%20the%20following%20code%20to%20it%3A
  async findAll(): Promise<ICat[]> {
    const response = await this.prisma.cat.findMany();
    console.log(response);
    return response;
    // return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }
}
