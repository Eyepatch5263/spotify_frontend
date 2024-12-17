import React from 'react'

type Stats={
    iconColor:string,
    iconType:React.ElementType,
    value:number,
    label:string,
    bgColor:string}
const StatsCard = ({iconColor,bgColor,value,label,iconType:Icon}:Stats) => {
    return (
        <div className={`bg-zinc-800/40 p-4 rounded-lg`}>
            <div className='flex items-center justify-between'>
                <div className={`p-3 rounded-full ${bgColor}`}>
                    <Icon className={`size-8 ${iconColor}`} />
                </div>
                <div>
                    <p className='text-lg font-bold'>{value}</p>
                    <p className='text-sm text-zinc-400'>{label}</p>
                </div>
            </div>
        </div>
    )
}

export default StatsCard
