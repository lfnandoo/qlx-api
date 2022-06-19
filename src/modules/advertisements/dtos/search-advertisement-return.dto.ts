import { Field, ObjectType } from 'type-graphql';
import { AdvertisementEntity } from '../infra/entities/advertisement.entity';

@ObjectType()
class SearchAdvertisementReturnDTO {
  @Field(() => [AdvertisementEntity])
  rows: AdvertisementEntity[];

  @Field()
  count: number;
}

export { SearchAdvertisementReturnDTO };
