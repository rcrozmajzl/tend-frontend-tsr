import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const LoadingToAccess = (props: Props) => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate()


    useEffect(()=>{
        const interval = setInterval (()=>{
            setCount(currentCount => currentCount - 1)
        }, 1000)
        
        count === 0 && navigate("/greenhouse")
        return () => clearInterval(interval)
    }, [count, navigate])


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className="h-full">
                <div className="flex justify-center h-full">
                    <video autoPlay loop muted className='h-full'>
                        <source src={require("../assets/backgrounds/loading-your-garden.mp4")} type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default LoadingToAccess;