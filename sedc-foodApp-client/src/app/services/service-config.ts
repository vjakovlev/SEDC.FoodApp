import { environment } from '../../environments/environment'

export class ServiceConfig {
    private static _SERVER_URL = environment.apiServer;
}


// public static ADD_RESTORAUNT = `${ServiceConfig._SERVER_URL}`