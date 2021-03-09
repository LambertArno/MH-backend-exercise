const { default: axios } = require('axios');
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            commit(owner: String!, repo: String!, commit_sha: String!): Commit
        }

        type Commit {
            sha: String
            node_id: String
            url: String
            html_url: String
            author: User
            committer: User
            message: String
            tree: Tree,
            parents: [Parent]
            verification: Verification
        }

        type User {
            name: String
            email: String
            date: String
        }

        type Tree {
            sha: String
            url: String
        }

        type Parent {
            sha: String
            url: String
            html_url: String
        }
    
        type Verification {
            verified: Boolean
            reason: String
            signature: String
            payload: String
        }
        
        schema {
            query: RootQuery
        }
    `),
    rootValue: {
        commit: async (args) => {
            try {
                const result = await axios.get(`https://api.github.com/repos/${args.owner}/${args.repo}/git/commits/${args.commit_sha}`)
                return result.data
            } catch (err) {
                console.log(err)
            }
        },
    },
    graphiql: true,
}))


app.listen(8888, () => console.log('GraphQL Server listening on 8888'));
