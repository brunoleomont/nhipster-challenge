import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalTypeController } from '../web/rest/professional-type.controller';
import { ProfessionalTypeRepository } from '../repository/professional-type.repository';
import { ProfessionalTypeService } from '../service/professional-type.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProfessionalTypeRepository])],
    controllers: [ProfessionalTypeController],
    providers: [ProfessionalTypeService],
    exports: [ProfessionalTypeService],
})
export class ProfessionalTypeModule {}
