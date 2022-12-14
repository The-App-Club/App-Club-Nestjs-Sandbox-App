import {YogaDriver, YogaDriverConfig} from '@graphql-yoga/nestjs';
import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {CatsModule} from '@/features/cats/cats.module';
import {PrismaService} from '@/prisma.service';

@Module({
  imports: [
    CatsModule,
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
  providers: [PrismaService],
})
export class AppModule {}
