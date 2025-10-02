import Image from "next/image";
import HeroImage from "../../../public/Hero.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className='w-screen h-[100vh]'>
      <div className='text-7xl font-medium text-center mt-5 space-y-2'>
        <h1>Connect. Share. Grow.</h1>
        <h1>Your Social Circle</h1>
      </div>
      <div className='w-full text-xl text-center mt-4 flex justify-center'>
        <p className='w-[28rem]'>
          A simple place to share your thoughts, meet new people, and build real
          connections.
        </p>
      </div>
      <div className='mt-5 flex justify-center'>
        <Button className='rounded-full font-semibold dark:!bg-white'>Get Started</Button>
      </div>
      <div className='flex justify-center relative'>
        <Image src={HeroImage} alt='HeroImage' className='w-auto h-[25rem]' />
      </div>
      <div className='custom-shape-divider-bottom-1759337452'>
        <svg
          data-name='Layer 1'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
        >
          <path
            d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
            className='fill-white dark:fill-black'
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
