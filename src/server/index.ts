import { ApolloServer, UserInputError, gql } from 'apollo-server'
import { IResolvers } from 'graphql-tools'
import uuid from 'uuid/v1'
import { ITodo, FILTER } from '../global'

let filter: FILTER = FILTER.SHOW_ALL
let todos: ITodo[] = [
    { id: '6a679350-2aed-11ea-b2b6-89f5b6bcf823', text: '買い物', completed: false },
    { id: '6a679351-2aed-11ea-b2b6-89f5b6bcf823', text: '映画', completed: true, },
    { id: '6a679352-2aed-11ea-b2b6-89f5b6bcf823', text: 'ゲーム', completed: false, },
]

const typeDefs = gql`
    enum FILTER {
        SHOW_ALL
        SHOW_COMPLETED
        SHOW_ACTIVE
    }

    type Todo {
        id: ID!
        text: String!
        completed: Boolean!
    }

    type Query {
        allTodos: [Todo!]!
    }

    type Mutation {
        addTodo(text: String!): Todo!
        toggleCompleted(id: ID!): Todo!
        setFilter(filter: FILTER!): FILTER!
    }
`

const resolvers: IResolvers = {
    Query: {
        allTodos: () => {
            if (filter === 'SHOW_ALL') {
                return todos
            }
            return todos.filter(t => 
                filter === 'SHOW_COMPLETED' ? t.completed : !t.completed
            )
        },
    },
    Mutation: {
        addTodo: (root, args) => {
            const todo = { ...args, id: uuid(), completed: false }
            todos = [...todos, todo];
            return todo
        },
        toggleCompleted: (root, args) => {
            const todo = todos.find(t => t.id === args.id)
            if (!todo) {
                throw new UserInputError('id not found', {
                    invalidArgs: args.id,
                })
            }

            todo.completed = !todo.completed
            todos = todos.map(t => t.id === todo.id ? todo : t)
            return todo
        },
        setFilter: (root, args) => {
            return filter = args.filter
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
