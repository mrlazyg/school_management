import { Field, ID, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class LessonStudentsInput {
  // @IsUUID()
  @Length(32, 36, { each: true })
  @Field(() => ID)
  lessonId: string;

  // @IsUUID('4', { each: true })
  @Length(32, 36, { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
