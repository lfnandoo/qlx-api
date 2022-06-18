import { IsNotEmpty, MaxLength } from 'class-validator';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
class CreateAdvertisementDTO {
  @Field()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @Field()
  @MaxLength(250)
  @IsNotEmpty()
  address: string;

  @Field(() => ID)
  @IsNotEmpty()
  categoryId: string;

  @Field({ nullable: true })
  @MaxLength(250)
  description?: string;
}

export { CreateAdvertisementDTO };
