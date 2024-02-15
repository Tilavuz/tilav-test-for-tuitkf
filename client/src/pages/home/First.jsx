import { useLayoutEffect, useRef } from 'react'
import tuitkf from '../../assets/tuitkf.webp'


function First() {

    const tuitkfRef = useRef()


    useLayoutEffect(() => {
        if (tuitkfRef.current) {
        tuitkfRef.current.style.maxHeight = '430px';
        tuitkfRef.current.style.maxWidth = '430px';
        tuitkfRef.current.style.height = '100%';
        tuitkfRef.current.style.width = '100%';
        }
    }, [tuitkfRef]);

  return (
    <div className="container mx-auto flex flex-col min-h-screen items-center md:flex-row md:justify-center md:items-center md:gap-8">
        <img loading='eager' ref={tuitkfRef} src={tuitkf} alt="tuitkf image" />
        <div className='max-w-[600px] flex flex-col gap-4'>
            <h1 className='text-center font-bold text-2xl md:text-[42px] leading-10'>Muhammad al-Xorazmiy, Toshkent Axborot texnologiyalari universiteti, Qarshi filiali.</h1>
            <p className='text-center font-thin hyphens-manual'>Assalomu aleykum do'stlar bu saytda TUITKF yakuniy testlariga tayyorgarlik ko'rishingiz mumkin</p>
        </div>
    </div>
  )
}

export default First