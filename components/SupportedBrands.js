"use client"
import React from 'react'
import Image from 'next/image';

const SupportedBrands = () => {
  return (
  <section className="py-16 bg-white dark:bg-zinc-950 w-[100vw] text-center">
  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-zinc-900 dark:text-white">
    We Search Trusted Delivery Partners For You
  </h2>
  <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
    Our AI finds the best prices and availability from India's top grocery delivery platforms—so you never overpay or waste time.
  </p>
 <div className="relative w-full overflow-hidden">
<div className="flex animate-marquee gap-10 px-8">
  {[
    { name: 'Blinkit', src: '/logos/blinkit.png' },
    { name: 'Zepto', src: '/logos/zepto.png' },
    { name: 'Amazon', src: '/logos/amazon.png' },
    { name: 'Flipkart', src: '/logos/flipkart.png' },
    { name: 'JioMart', src: '/logos/jiomart.png' },
    { name: 'Instamart', src: '/logos/instamart.png' },
    { name: 'Amazon Fresh', src: '/logos/Amazonfresh.png' },
    { name: 'BigBasket', src: '/logos/bigbasket.jpg' },
  ].concat([
    // Repeat for seamless scroll:
    { name: 'Blinkit', src: '/logos/blinkit.png' },
    { name: 'Zepto', src: '/logos/zepto.png' },
    { name: 'Amazon', src: '/logos/amazon.png' },
    { name: 'Flipkart', src: '/logos/flipkart.png' },
    { name: 'JioMart', src: '/logos/jiomart.png' },
    { name: 'Instamart', src: '/logos/instamart.png' },
    { name: 'Amazon Fresh', src: '/logos/Amazonfresh.png' },
    { name: 'BigBasket', src: '/logos/bigbasket.jpg' },
  ]).map((brand, index) => (
   <div 
  key={index} 
  className="flex flex-col items-center min-w-[120px] p-4 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800"
>
  <div className="w-[40px] h-[40px] object-cover relative">
    <Image 
      src={brand.src} 
      alt={brand.name} 
      className="object-fill rounded-full" 
      fill
    />
  </div>
  <p className="mt-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
    {brand.name}
  </p>
</div>

  ))}
</div>

  </div>

  <style jsx>{`
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 20s linear infinite;
    }
  `}</style>
</section>

  )
}

export default SupportedBrands