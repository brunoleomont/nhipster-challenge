import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalController } from '../web/rest/professional.controller';
import { ProfessionalRepository } from '../repository/professional.repository';
import { ProfessionalService } from '../service/professional.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProfessionalRepository])],
    controllers: [ProfessionalController],
    providers: [ProfessionalService],
    exports: [ProfessionalService],
})
export class ProfessionalModule {}
