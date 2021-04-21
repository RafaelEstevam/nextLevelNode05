
import {getCustomRepository} from "typeorm";
import {SettingsRepository} from "../repositories/SettingsRepository";

interface SettingsConfig {
    chat: boolean,
    username: string
}

class SettingsService {

    async create({chat, username}: SettingsConfig) {
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExists = await settingsRepository.findOne({
            username
        });

        if(userAlreadyExists){
            throw new Error("User already exists!");
        }

        const settings = settingsRepository.create({
            chat,
            username
        });

        await settingsRepository.save(settings);

        return settings;
    }

}

export {SettingsService}