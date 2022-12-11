import {Module} from '@nestjs/common';
import {OwnersModule} from '@/owners/owners.module';
import {CatOwnerResolver} from '@/cats/cat-owner.resolver';
import {CatsResolver} from '@/cats/cats.resolver';
import {CatsService} from '@/cats/cats.service';

@Module({
  imports: [OwnersModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver],
})
export class CatsModule {}
