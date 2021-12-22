import { Injectable } from '@nestjs/common';
import { ResultCreateDto } from './dto/result.create.dto';
import { Result } from './results.model';
import { InjectModel } from '@nestjs/sequelize';
import { ResultProgressedDto } from './dto/result.progressed.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result) private resultRepository: typeof Result) {}
  async addResult(dto: ResultCreateDto, userId: number) {
    const result: ResultProgressedDto = new ResultProgressedDto(dto, userId);
    return await this.resultRepository.create(result);
  }
  async getResults(userId: number) {
    return await this.resultRepository.findAll({
      where: { userId },
    });
  }

  async deleteResults(userId: number) {
    return await this.resultRepository.destroy({
      where: { userId },
    });
  }
}
