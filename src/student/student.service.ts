import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getMongoRepository } from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { CreateStudentInput } from './student.input';
import { Utility } from '../utils/utility';

const logger = new Logger('StudentService');

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    private utils: Utility,
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
      id: this.utils.generateUUID(),
      firstName,
      lastName,
    });

    logger.log(`Create a student. Payload: ${JSON.stringify(student)}`);
    return await this.studentRepo.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    const studentRepository = getMongoRepository(Student);
    return await studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
