import { servicesMap } from "../../services/services.js";
import { controllers } from "../controllers/controllers.js";
import { loadController } from "../loadController.js";

/**
 *
 * @param {import("fastify").FastifyInstance} fastify
 */
export const controllersPlugin = (fastify) => {
  fastify.decorateRequest("bot", null);
  controllers.forEach((ControllerClass) => {
    const controllerArguments = ControllerClass.services.reduce(
      (result, serviceClass) => {
        result[serviceClass.name] = servicesMap[serviceClass.name];
        if (!result[serviceClass.name]) {
          throw new Error(
            `${serviceClass.name} service was not found for ${ControllerClass.name}`,
          );
        }
        return result;
      },
      {},
    );
    fastify.log.info(`loading ${ControllerClass.name} controller`);
    // @ts-ignore
    loadController(fastify, new ControllerClass(controllerArguments));
  });
};
