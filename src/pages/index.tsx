import type { NextPage } from 'next'
import { trpc } from '@/utils/trpc'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { useState } from 'react'

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
                <div className='w-64 flex flex-col'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={firstPokemon.data?.sprites.front_default || ''}
                        alt=''
                        className='w-full h-64'
                    />
                    <div className='text-xl text-center capitalize'>
                        {firstPokemon.data?.name}
                    </div>
                    <button
                        className='bg-indigo-700 block py-1.5 rounded-md px-2'
                        onClick={() => voteForRoundest(first)}
                    >
                        Rounder
                    </button>
                </div>
                <div>vs</div>
                <div className='w-64 flex flex-col'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={secondPokemon.data?.sprites.front_default || ''}
                        alt=''
                        className='w-full h-64'
                    />
                    <div className='text-xl text-center capitalize'>
                        {secondPokemon.data?.name}
                    </div>
                    <button
                        className='bg-indigo-700 block py-1.5 rounded-md px-2'
                        onClick={() => voteForRoundest(second)}
                    >
                        Rounder
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home
