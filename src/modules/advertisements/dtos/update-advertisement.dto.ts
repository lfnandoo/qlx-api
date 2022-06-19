import { MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
class UpdateAdvertisementDTO {
  @Field({ nullable: true })
  @MaxLength(100)
  title?: string;

  @Field({ nullable: true })
  @MaxLength(250)
  address?: string;

  @Field(() => ID, { nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  description?: string;
}

export { UpdateAdvertisementDTO };
