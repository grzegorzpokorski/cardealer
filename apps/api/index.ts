import Fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

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

fastify.get("/ping", async (request, reply) => {
  return "pong\n";
});

fastify.route({
  method: "GET",
  url: "/",
  handler: () => {
    return { message: "hello" };
  },
});

fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`fastify listening at ${address}`);
});
