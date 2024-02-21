import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";
import { testBasicRouteShema, testDataShema } from "./test.shemas.js";

const testPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/test",
    schema: testBasicRouteShema,
    async handler() {
      return {
        message: "Hello from the test route!",
      };
    },
  });

  fastify.withTypeProvider<TypeBoxTypeProvider>().route({
    method: "GET",
    url: "/test/:age",
    schema: testDataShema,
    async handler(request) {
      return {
        data: {
          age: request.params.age,
          name: "Grzegorz",
          surname: "Pokorski",
        },
      };
    },
  });
};

export default testPlugin;
