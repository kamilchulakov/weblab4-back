import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Result } from './results.model';
import { ResultCreateDto } from './dto/result.create.dto';
import { ResultsService } from './results.service';

@ApiTags('Results')
@Controller('api/results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Post results here.' })
  @ApiResponse({ status: 200, type: Result })
  @Post()
  postResult(@Body() dto: ResultCreateDto, @Request() req) {
    return this.resultsService.addResult(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get results here.' })
  @ApiResponse({ status: 200, type: Result })
  @Get()
  getAllResults(@Request() req) {
    return this.resultsService.getResults(req.user.id);
  }
}
