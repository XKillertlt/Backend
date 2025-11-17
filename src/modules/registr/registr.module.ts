import {RegistrEntity} from "./Entity/registr.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RegistrController} from "./registr.controller";
import {RegistrService} from "./registr.service";

const entity = [RegistrEntity];

@Module({
    imports: [
        TypeOrmModule.forFeature(entity)
    ],
    controllers: [RegistrController],
    providers: [RegistrService],
    exports: [],
})

export class RegistrModule {}