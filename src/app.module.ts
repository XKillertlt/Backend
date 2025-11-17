import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RegistrModule} from "./modules/registr/registr.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>("DATABASE_URL");
        const isProd = !!dbUrl;

        if (isProd) {
          return {
            type: "postgres",
            url: dbUrl,
            autoLoadEntities: true,
            synchronize: false,
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
          }
        }

        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("DB_USER"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          ssl: false,
          autoLoadEntities: true,
          synchronize: true,
        }
      }
    }),
    RegistrModule
  ]
})
export class AppModule {}
