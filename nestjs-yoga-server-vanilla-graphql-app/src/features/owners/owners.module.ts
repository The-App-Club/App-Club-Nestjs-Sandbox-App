import {Module} from '@nestjs/common';
import {OwnersService} from '@/features/owners/owners.service';

@Module({
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}
