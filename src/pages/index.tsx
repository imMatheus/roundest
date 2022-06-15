import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState } from 'react'
import { inferQueryResponse } from './api/trpc/[trpc]'

const Home: NextPage = () => {
    const [[first, second], updateId] = useState(getOptionsForVote())

    const firstPokemon = trpc.useQuery(['get-pokemon-by-id', { id: first }])
    const secondPokemon = trpc.useQuery(['get-pokemon-by-id', { id: second }])

    if (firstPokemon.isLoading || secondPokemon.isLoading) return null

    const voteForRoundest = (selected: number) => {
        updateId(getOptionsForVote())
    }

    return (
        <div className='h-screen w-screen justify-center flex flex-col'>
            <div className='text-2xl text-center'>
                Which pokemon is rounder?
            </div>
            <div className='border mt-4 rounded p-8 flex justify-between max-w-2xl mx-auto w-full items-center'>
                {!firstPokemon.isLoading &&
                    firstPokemon.data &&
                    !secondPokemon.isLoading &&
                    secondPokemon.data && (
                        <>
                            <PokemonListing
                                pokemon={firstPokemon.data}
                                vote={() => voteForRoundest(first)}
                            />
                            <div>vs</div>
                            <PokemonListing
                                pokemon={secondPokemon.data}
                                vote={() => voteForRoundest(second)}
                            />
                        </>
                    )}
            </div>
        </div>
    )
}

export default Home

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>

const PokemonListing: React.FC<{
    pokemon: PokemonFromServer
    vote: () => void
}> = ({ pokemon, vote }) => {
    return (
        <div className='w-64 flex flex-col'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={pokemon.sprites.front_default || ''}
                alt=''
                className='w-full h-64'
            />
            <div className='text-xl text-center capitalize'>{pokemon.name}</div>
            <button
                className='bg-indigo-700 block py-1.5 rounded-md px-2'
                onClick={vote}
            >
                Rounder
            </button>
        </div>
    )
}
