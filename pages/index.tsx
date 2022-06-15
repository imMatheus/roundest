import type { NextPage } from 'next'

const Home: NextPage = () => {
    return (
        <div className='h-screen w-screen justify-center flex flex-col'>
            <div className='text-2xl text-center'>
                Which pokemon is rounder?
            </div>
            <div className='border mt-4 rounded p-8 flex justify-between max-w-2xl mx-auto w-full items-center'>
                <div className='w-16 h-16 bg-red-200'></div>
                <div>vs</div>
                <div className='w-16 h-16 bg-red-200'></div>
            </div>
        </div>
    )
}

export default Home
