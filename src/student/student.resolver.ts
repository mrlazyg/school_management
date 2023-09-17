import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  async student(@Args('id') id: string) {
    return await this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  async students() {
    return await this.studentService.getAllStudent();
  }

  @Mutation(() => StudentType)
  async createStudent(@Args('studentInput') studentInput: CreateStudentInput) {
    return await this.studentService.createStudent(studentInput);
  }
}
