import { useLayoutEffect, useRef } from 'react'
import tuitkf from '../../assets/tuitkf.webp'


export default function Home() {

  const tuitkfRef = useRef()

  useLayoutEffect(() => {
    if (tuitkfRef.current) {
      tuitkfRef.current.style.height = '430px';
      tuitkfRef.current.style.width = '430px';
    }
  }, [tuitkfRef]);

  return (
    <div className="py-20 px-2 md:h-screen md:flex md:flex-col md:justify-center">
      <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-center md:items-center md:gap-8">
        <img ref={tuitkfRef} src={tuitkf} alt="tuitkf image" />
        <div className='max-w-[600px] flex flex-col gap-4'>
          <h1 className='text-center font-bold text-2xl md:text-[42px] leading-10'>Muhammad al-Xorazmiy, Toshkent Axborot texnologiyalari universiteti, Qarshi filiali.</h1>
          <p className='text-center font-thin hyphens-manual'>Assalomu aleykum do'stlar bu saytda TUITKF yakuniy testlariga tayyorgarlik ko'rishingiz mumkin</p>
        </div>
      </div>
    </div>
  )
}
