import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvironmentConfig;
  constructor() {
    dotenv.config();
    this.envConfig = this.validateInput(process.env);
  }

  get<K extends keyof EnvironmentConfig>(key: K): EnvironmentConfig[K] {
    return this.envConfig[key];
  }

  private validateInput(envVars: NodeJS.ProcessEnv) {
    const envVarsSchema = Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      NODE_ENV: Joi.string().required(),
      BASE_URL: Joi.string().uri().required(),
      PORT: Joi.number(),
      HOST: Joi.string(),
    }).options({
      stripUnknown: true,
    });
    const { error, value } = envVarsSchema.validate(envVars);
    if (error) {
      throw error;
    }
    return value;
  }
}

export interface EnvironmentConfig {
  PORT: number;
  HOST: string;
  NODE_ENV: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  BASE_URL: string;
}
