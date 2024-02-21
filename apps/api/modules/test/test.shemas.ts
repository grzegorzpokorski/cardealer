import { Type } from "@fastify/type-provider-typebox";

export const testBasicRouteShema = {
  response: {
    200: Type.Object({
      message: Type.String(),
    }),
  },
};

export const testDataShema = {
  params: Type.Object({
    age: Type.Integer(),
  }),
  response: {
    200: Type.Object({
      data: Type.Object({
        name: Type.String(),
        surname: Type.String(),
        age: Type.Integer(),
      }),
    }),
  },
};
