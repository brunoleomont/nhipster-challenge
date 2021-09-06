import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProfessionalTypeDTO } from '../src/service/dto/professional-type.dto';
import { ProfessionalTypeService } from '../src/service/professional-type.service';

describe('ProfessionalType Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(ProfessionalTypeService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all professional-types ', async () => {
        const getEntities: ProfessionalTypeDTO[] = (
            await request(app.getHttpServer()).get('/api/professional-types').expect(200)
        ).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET professional-types by id', async () => {
        const getEntity: ProfessionalTypeDTO = (
            await request(app.getHttpServer())
                .get('/api/professional-types/' + entityMock.id)
                .expect(200)
        ).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create professional-types', async () => {
        const createdEntity: ProfessionalTypeDTO = (
            await request(app.getHttpServer()).post('/api/professional-types').send(entityMock).expect(201)
        ).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update professional-types', async () => {
        const updatedEntity: ProfessionalTypeDTO = (
            await request(app.getHttpServer()).put('/api/professional-types').send(entityMock).expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update professional-types from id', async () => {
        const updatedEntity: ProfessionalTypeDTO = (
            await request(app.getHttpServer())
                .put('/api/professional-types/' + entityMock.id)
                .send(entityMock)
                .expect(201)
        ).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE professional-types', async () => {
        const deletedEntity: ProfessionalTypeDTO = (
            await request(app.getHttpServer())
                .delete('/api/professional-types/' + entityMock.id)
                .expect(204)
        ).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
