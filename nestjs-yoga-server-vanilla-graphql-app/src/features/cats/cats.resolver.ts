import {
  HttpException,
  HttpStatus,
  Logger,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {PubSub} from 'graphql-subscriptions';
import {Cat} from '@/graphql.schema';
import {CatsGuard} from '@/features/cats/cats.guard';
import {CatsService} from '@/features/cats/cats.service';
import {CreateCatDto} from '@/features/cats/dto/create-cat.dto';

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query('cats')
  @UseGuards(CatsGuard)
  async getCats() {
    return this.catsService.findAll();
  }

  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number
  ): Promise<Cat> {
    try {
      return this.catsService.findOneById(id);
    } catch (error) {
      console.log(error);
      Logger.error('Something went wrong...');
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong...',
        },
        500
      );
    }
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    console.log(args);
    const createdCat = this.catsService.create(args);
    pubSub.publish('catCreated', {catCreated: createdCat});
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}
