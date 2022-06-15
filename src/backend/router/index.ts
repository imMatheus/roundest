import * as trpc from '@trpc/server'
import { z } from 'zod'

import { PokemonClient } from 'pokenode-ts'
import { prisma } from '@/backend/utils/prisma'

export const appRouter = trpc
    .router()
    .query('get-pokemon-by-id', {
        input: z.object({
            id: z.number(),
        }),
        async resolve({ input }) {
            console.log('gggg')

            const api = new PokemonClient()
            const pokemon = await api.getPokemonById(input.id)
            return { name: pokemon.name, sprites: pokemon.sprites }
        },
    })
    .mutation('cast-vote', {
        input: z.object({
            votedFor: z.number(),
            votedAgainst: z.number(),
        }),
        async resolve({ input }) {
            console.log('llll')

            const voteInDb = await prisma.vote.create({
                data: {
                    ...input,
                },
            })
            console.log('kkk')

            console.log(voteInDb)

            return { success: true, voteInDb }
        },
    })

// export type definition of API
export type AppRouter = typeof appRouter
