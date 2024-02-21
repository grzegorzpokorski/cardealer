import Fastify from "fastify";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";

const fastify = Fastify({
  logger:
    process.env.NODE_ENV === "production"
      ? true
      : {
          transport: {
            target: "pino-pretty",
            options: {
              levelFirst: true,
              ignore: "pid,hostname",
            },
          },
        },
  ajv: {
    customOptions: {
      strict: "log",
      keywords: ["kind", "modifier"],
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

await fastify.register(import("@fastify/helmet"), { global: true });
await fastify.register(import("@fastify/cors"));

await fastify.register(import("./modules/test/test.routes.js"));

fastify.get(
  "/",
  {
    schema: {
      response: {
        200: Type.String(),
      },
    },
  },
  async () => {
    return `Zostań na chwilę i posłuchaj`;
  },
);

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`fastify listening at ${address}`);
});

export { fastify };
