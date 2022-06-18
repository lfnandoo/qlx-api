import { IsDate, IsNotEmpty } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('advertisement')
@ObjectType()
class AdvertisementEntity {
  @PrimaryColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ length: 100 })
  @Field()
  @IsNotEmpty()
  title: string;

  @Column({ length: 250, nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ length: 250 })
  @Field()
  @IsNotEmpty()
  address: string;

  @Column({ length: 250, name: 'category_id' })
  @Field()
  @IsNotEmpty()
  categoryId: string;

  @Column({ name: 'creation_date' })
  @Field()
  @IsDate()
  creationDate: Date;

  constructor({
    title = '',
    address = '',
    categoryId = '',
    creationDate = new Date(),
    description = undefined || '',
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.address = address;
    this.categoryId = categoryId;
    this.creationDate = creationDate;
    this.description = description;
  }
}

export { AdvertisementEntity };
