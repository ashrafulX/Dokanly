import React, { useEffect, useState } from 'react';

const DiscountTimer = () => {
    const targetDate=new Date().getTime()+1000*60*60*24*29;

    const getTimeRemaining=()=>{
        const now=new Date().getTime();
        const difference=targetDate-now;
        return {
            days:Math.floor(difference/(1000*60*60*24)),
            hours:Math.floor((difference/(1000*60*60))%24),
            minutes:Math.floor((difference/(1000*60))%60),
            seconds:Math.floor((difference/1000)%60),
        }

    };
    const [timeleft,setTimeLeft]=useState(getTimeRemaining());
    
    useEffect(()=>{
        const timer=setInterval(()=>{
            setTimeLeft(getTimeRemaining());
        },1000);

        return()=>clearInterval(timer);
    },[]);
    return (
         <div className="flex gap-4 sm:gap-6 md:gap-8 mt-8">
                
                {/* Days */}
                <div className="flex flex-col items-center justify-center bg-red-50 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl shadow-sm border border-red-100">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600">{timeleft.days}</span>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-red-500 uppercase tracking-widest mt-1">Days</span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center justify-center bg-red-50 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl shadow-sm border border-red-100">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600">{timeleft.hours}</span>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-red-500 uppercase tracking-widest mt-1">Hours</span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center justify-center bg-red-50 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl shadow-sm border border-red-100">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600">{timeleft.minutes}</span>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-red-500 uppercase tracking-widest mt-1">Mins</span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center justify-center bg-red-50 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl shadow-sm border border-red-100">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black text-red-600">{timeleft.seconds}</span>
                    <span className="text-xs sm:text-sm md:text-base font-bold text-red-500 uppercase tracking-widest mt-1">Secs</span>
                </div>

            </div>
    );
};

export default DiscountTimer;