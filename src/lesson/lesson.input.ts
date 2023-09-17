import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, Length, MinLength } from 'class-validator';

@InputType()
export class CreateLessonInput {
  @MinLength(5)
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;

  // @IsUUID('4', { each: true })
  @Length(32, 36, { each: true })
  @Field(() => [ID], { defaultValue: [] })
  students: string[];
}
