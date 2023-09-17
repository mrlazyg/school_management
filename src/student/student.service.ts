import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';

const logger = new Logger('StudentService');

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  async getStudent(id: string): Promise<Student> {
    logger.log(`Get a student. Query: ${JSON.stringify({ id })}`);
    return await this.studentRepo.findOne({
      where: { id },
    });
  }

  async getAllStudent(): Promise<Student[]> {
    logger.log(`Get all student`);
    return await this.studentRepo.find();
  }

  async createStudent(studentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = studentInput;
    const student = this.studentRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });

    logger.log(`Create a student. Payload: ${JSON.stringify(student)}`);
    return await this.studentRepo.save(student);
  }
}
