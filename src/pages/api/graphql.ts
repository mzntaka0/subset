// pages/api/graphql.ts
import { makeSchema, queryType } from 'nexus'
import { ApolloServer } from 'apollo-server-micro'
const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world!' })
  },
})
const schema = makeSchema({
  types: [Query],
})
const server = new ApolloServer({
  schema,
})
export const config = {
  api: {
    bodyParser: false,
  },
}
export default server.createHandler({
  path: '/api/graphql',
})
