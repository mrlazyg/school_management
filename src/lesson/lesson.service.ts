import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { Utility } from '../utils/utility';

const logger = new Logger('LessonService');

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
    private utils: Utility,
  ) {}

  async getLesson(id): Promise<Lesson> {
    logger.log(`Get a lesson. Query: ${JSON.stringify({ id })}`);
    return this.lessonRepo.findOne({
      where: { id },
    });
  }

  async getAllLesson(): Promise<Lesson[]> {
    logger.log(`Get all lesson`);
    return this.lessonRepo.find();
  }

  async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = lessonInput;
    const lesson = this.lessonRepo.create({
      id: this.utils.generateUUID(),
      name,
      startDate,
      endDate,
      students,
    });

    logger.log(`Create a lesson. Payload: ${JSON.stringify(lesson)}`);
    return this.lessonRepo.save(lesson);
  }

  async assignStudentsToLesson(lessonId: string, studentIds: string[]) {
    try {
      const lesson = await this.lessonRepo.findOne({
        where: { id: lessonId },
      });

      const students = [...lesson.students, ...studentIds];
      lesson.students = [...new Set(students)];

      return await this.lessonRepo.save(lesson);
    } catch (error) {
      logger.error(error);
    }
  }
}
