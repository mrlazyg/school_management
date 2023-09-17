import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { LessonStudentsInput } from './lesson-students.input';
import { StudentService } from '../student/student.service';
import { Lesson } from './lesson.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query(() => [LessonType])
  lessons() {
    return this.lessonService.getAllLesson();
  }

  @Mutation(() => LessonType)
  createLesson(@Args('lessonInput') lessonInput: CreateLessonInput) {
    return this.lessonService.createLesson(lessonInput);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignLessonToStudents') assignLessonToStudents: LessonStudentsInput,
  ) {
    try {
      const { lessonId, studentIds } = assignLessonToStudents;
      return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    } catch (error) {
      console.log(error);
    }
  }

  @ResolveField()
  students(@Parent() lesson: Lesson) {
    try {
      return this.studentService.getManyStudents(lesson.students);
    } catch (error) {
      console.error(error);
    }
  }
}
