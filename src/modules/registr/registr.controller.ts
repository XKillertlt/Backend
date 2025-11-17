import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {RegistrService} from "./registr.service";
import {RegistrEntity} from "./Entity/registr.entity";
import {RegisterDTO} from "./DTO/create-registr.dto";

@Controller('registr')
export class RegistrController {
    constructor(private readonly registrService: RegistrService) {}

    @Get('/get')
    async getRegistr(): Promise<RegistrEntity[]> {
        return this.registrService.findAll()
    }

    @Get('/get/:phone')
    async getRegistrByPhone(@Param("phone") phone: string): Promise<RegistrEntity | null> {
        return this.registrService.findOneByPhone(phone)
    }

    @Post('/create')
    async createRegisrt(@Body() createData: RegisterDTO): Promise<RegistrEntity> {
        return this.registrService.newRegistr(createData);
    }
}