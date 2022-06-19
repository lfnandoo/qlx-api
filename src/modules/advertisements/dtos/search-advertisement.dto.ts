import { IsEnum, IsPositive } from 'class-validator';
import { Field, ID, ArgsType } from 'type-graphql';
import { OrderDirectionEnum } from '../../../type-utils/enums/order-direction.enum';

@ArgsType()
class SearchAdvertisementDTO {
  @Field()
  page: number;

  @Field()
  @IsPositive()
  pageSize: number;

  @Field()
  searchTerm: string;

  @Field()
  orderColumn: string;

  @Field(() => String)
  @IsEnum(OrderDirectionEnum)
  orderDirection: OrderDirectionEnum;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}

export { SearchAdvertisementDTO };
