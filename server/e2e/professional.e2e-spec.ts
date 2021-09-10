import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ProfessionalDTO } from '../src/service/dto/professional.dto';
import { ProfessionalService } from '../src/service/professional.service';

describe('Professional Controller', () => {
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
            .overrideProvider(ProfessionalService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all professionals ', async () => {
        const getEntities: ProfessionalDTO[] = (await request(app.getHttpServer())
            .get('/api/professionals')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET professionals by id', async () => {
        const getEntity: ProfessionalDTO = (await request(app.getHttpServer())
            .get('/api/professionals/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create professionals', async () => {
        const createdEntity: ProfessionalDTO = (await request(app.getHttpServer())
            .post('/api/professionals')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update professionals', async () => {
        const updatedEntity: ProfessionalDTO = (await request(app.getHttpServer())
            .put('/api/professionals')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update professionals from id', async () => {
        const updatedEntity: ProfessionalDTO = (await request(app.getHttpServer())
            .put('/api/professionals/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE professionals', async () => {
        const deletedEntity: ProfessionalDTO = (await request(app.getHttpServer())
            .delete('/api/professionals/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
