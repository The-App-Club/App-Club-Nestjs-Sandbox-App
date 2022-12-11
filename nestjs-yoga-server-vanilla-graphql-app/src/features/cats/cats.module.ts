import {Module} from '@nestjs/common';
import {OwnersModule} from '@/features/owners/owners.module';
import {CatOwnerResolver} from '@/features/cats/cat-owner.resolver';
import {CatsResolver} from '@/features/cats/cats.resolver';
import {CatsService} from '@/features/cats/cats.service';

@Module({
  imports: [OwnersModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver],
})
export class CatsModule {}
