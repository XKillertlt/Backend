import {Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RegistrEntity} from "./Entity/registr.entity";
import {Repository} from "typeorm";
import {RegisterDTO} from "./DTO/create-registr.dto";

@Injectable()
export class RegistrService {
    private readonly logger = new Logger(RegistrService.name);
    constructor(
        @InjectRepository(RegistrEntity)
        private readonly registrEntityRepository: Repository<RegistrEntity>,
    ) {}

    public async findAll(): Promise<RegistrEntity[]> {
        this.logger.log("Get all Registr found");
        try {
            const registrs = await this.registrEntityRepository.find();

            if (registrs.length === 0) {
                this.logger.warn("No Registr");
            }

            this.logger.log(`Found ${registrs.length} registr`);

            return registrs;
        } catch (e) {
            this.logger.error('Failed to find a Registration', e.stack);
            throw e;
        }
    }

    public async findOneByPhone(phone: string): Promise<RegistrEntity | null> {
        this.logger.log(`Get Registr with phone: ${phone}`);
        try {
            const findReg = await this.registrEntityRepository.findOneBy({
                phone: phone
            });

            if (!findReg) {
                this.logger.warn(`Registr with phone: ${phone} not found`);
            }

            return findReg;
        } catch (e) {
            this.logger.error(`Failed to find a Registr with phone: ${phone}`, e.stack);
            throw e;
        }
    }

    public async newRegistr(createData: RegisterDTO): Promise<RegistrEntity> {
        this.logger.log(`Add new Registr`);
        try {
            const newRegistr = this.registrEntityRepository.create({
                city: createData.city,
                type: createData.type,
                amountSeed: createData.amountSeed,
                amountHectares: createData.amountHectares,
                price: createData.price,
                phone: createData.phone
            });

            const saved = await this.registrEntityRepository.save(newRegistr);
            this.logger.log(`Saved Registr with Id: ${saved.id}`);

            return saved;
        } catch (e) {
            this.logger.error('Failed to add new Registr ', e.stack);
            throw e;
        }
    }
}