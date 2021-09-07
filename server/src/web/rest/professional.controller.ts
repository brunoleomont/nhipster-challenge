import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ProfessionalDTO } from '../../service/dto/professional.dto';
import { ProfessionalService } from '../../service/professional.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/professionals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('professionals')
export class ProfessionalController {
    logger = new Logger('ProfessionalController');

    constructor(private readonly professionalService: ProfessionalService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProfessionalDTO,
    })
    async getAll(@Req() req: Request): Promise<ProfessionalDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.professionalService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ProfessionalDTO,
    })
    async getOne(@Param('id') id: string): Promise<ProfessionalDTO> {
        return await this.professionalService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create professional' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProfessionalDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() professionalDTO: ProfessionalDTO): Promise<ProfessionalDTO> {
        const created = await this.professionalService.save(professionalDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Professional', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update professional' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProfessionalDTO,
    })
    async put(@Req() req: Request, @Body() professionalDTO: ProfessionalDTO): Promise<ProfessionalDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Professional', professionalDTO.id);
        return await this.professionalService.update(professionalDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update professional with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProfessionalDTO,
    })
    async putId(@Req() req: Request, @Body() professionalDTO: ProfessionalDTO): Promise<ProfessionalDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Professional', professionalDTO.id);
        return await this.professionalService.update(professionalDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete professional' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Professional', id);
        return await this.professionalService.deleteById(id);
    }
}
