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
import { ProfessionalTypeDTO } from '../../service/dto/professional-type.dto';
import { ProfessionalTypeService } from '../../service/professional-type.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/professional-types')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('professional-types')
export class ProfessionalTypeController {
    logger = new Logger('ProfessionalTypeController');

    constructor(private readonly professionalTypeService: ProfessionalTypeService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ProfessionalTypeDTO,
    })
    async getAll(@Req() req: Request): Promise<ProfessionalTypeDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.professionalTypeService.findAndCount({
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
        type: ProfessionalTypeDTO,
    })
    async getOne(@Param('id') id: string): Promise<ProfessionalTypeDTO> {
        return await this.professionalTypeService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create professionalType' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProfessionalTypeDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() professionalTypeDTO: ProfessionalTypeDTO): Promise<ProfessionalTypeDTO> {
        const created = await this.professionalTypeService.save(professionalTypeDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfessionalType', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update professionalType' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProfessionalTypeDTO,
    })
    async put(@Req() req: Request, @Body() professionalTypeDTO: ProfessionalTypeDTO): Promise<ProfessionalTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfessionalType', professionalTypeDTO.id);
        return await this.professionalTypeService.update(professionalTypeDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update professionalType with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProfessionalTypeDTO,
    })
    async putId(@Req() req: Request, @Body() professionalTypeDTO: ProfessionalTypeDTO): Promise<ProfessionalTypeDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'ProfessionalType', professionalTypeDTO.id);
        return await this.professionalTypeService.update(professionalTypeDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete professionalType' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'ProfessionalType', id);
        return await this.professionalTypeService.deleteById(id);
    }
}
