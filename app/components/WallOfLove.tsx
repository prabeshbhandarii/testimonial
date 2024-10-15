"use client"
import axios from 'axios';
//@ts-ignore
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
  
interface Testimonial {
    id: number,
    name: string,
    email: string,
    content: string,
    liked: boolean
    createdAt: string
}

const WallOfLove = () => {
    const url = usePathname()
    const spaceName = url.split('/')[3]
    
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])

    useEffect(()=>{
        try {
            const fetchData = async ()=>{
                const space = await axios.get(`http://localhost:3000/api/space/${spaceName}`, {
                    headers: {
                      'spaceName': spaceName
                    }
                  })
          
                  const fetchedSpaceData = space.data.data;                  
          
                  if(fetchedSpaceData.id){
                    const testimonial = await axios.get('http://localhost:3000/api/testimonial', {
                      headers: {
                        'spaceId': fetchedSpaceData.id
                      }
                    })                    

                    setTestimonials(
                      testimonial.data.data
                        .filter((t:Testimonial)=>t.liked).map((t:Testimonial)=>t)
                    )
                }
            }
            fetchData()
        } catch (err) {
            console.error(err)
        }
    }, [spaceName])

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Wall of Love</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:scale-105">
              <p className="text-lg mb-4">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-gray-400 text-sm">{testimonial.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WallOfLove;