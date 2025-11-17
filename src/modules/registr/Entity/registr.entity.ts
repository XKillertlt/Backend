import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity('registration')
export class RegistrEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    city: string;

    @Index()
    @Column()
    type: string;

    @Column({name: "amount_seed"})
    amountSeed: number;

    @Column({name: "amount_hectares"})
    amountHectares: number;

    @Column()
    price: number;

    @Column()
    phone: string;
}