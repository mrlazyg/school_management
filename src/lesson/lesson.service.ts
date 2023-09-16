import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';

const logger = new Logger('LessonService');

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepo: Repository<Lesson>,
  ) {}

  async getLesson(id): Promise<Lesson> {
    logger.log(`Get a lesson. Query: ${JSON.stringify({ id })}`);
    return this.lessonRepo.findOne({
      where: { id },
    });
  }

  async createLesson(name, startDate, endDate): Promise<Lesson> {
    const lesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    logger.log(`Create a lesson. Payload: ${JSON.stringify(lesson)}`);
    return this.lessonRepo.save(lesson);
  }
}
