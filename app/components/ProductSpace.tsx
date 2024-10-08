"use client"
import React, { useEffect, useState } from 'react';
import { Search, Star, Heart, Award } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface SpaceData{
  id: string,
  name: string, 
  description: string, 
  message: string;
}

const ProductSpace = () => {
  const url = usePathname()
  const spaceName = url.split('/')[3]
  
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState([{
    id: '',
    name: '',
    email: '',
    content: ''
  }])
  const [spaceData, setSpaceData] = useState<SpaceData>({
    id: '',
    name: '',
    description: '',
    message: ''
  });

  const sidebarItems = [
    { icon: <Star size={20} />, label: 'All' },
    { icon: <Award size={20} />, label: 'Featured' },
    { icon: <Heart size={20} />, label: 'Liked' },
  ];

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const space = await axios.get(`http://localhost:3000/api/space/${spaceName}`, {
          headers: {
            'spaceName': spaceName
          }
        })

        const fetchedSpaceData = space.data.data;
        
        setSpaceData({
          id: fetchedSpaceData.id,
          name: fetchedSpaceData.name,
          description: fetchedSpaceData.description,
          message: fetchedSpaceData.message
        });

        if(fetchedSpaceData.id){
          const testimonial = await axios.get('http://localhost:3000/api/testimonial', {
            headers: {
              'spaceId': space.data.data.id
            }
          })

          setTestimonials(
            testimonial.data.data
          )

        }        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [spaceName])

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Testimonial</h2>
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>


{/* get spaceData */}

      {/* Main content */}
      <div className="flex-1 p-8">
        <strong className='text-white text-3xl m-2'>{spaceData.name}</strong><br />
        <Link href={`http://localhost:3000/pages/${spaceData.name}`}>Space public url: http://localhost:3000/pages/{spaceData.name}</Link>
        {/* Search bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search by name, email, or testimonial keywords"
            className="w-full bg-gray-700 text-white rounded-md py-2 px-4 pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Testimonial cards */}
        <div className="space-y-4">
          {testimonials.map((testimonial: any, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {/* <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div> */}
                  <p className="mt-2">{testimonial.content}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Award size={20} />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {testimonials[0].content}
                <p>Name: {testimonial.name}</p>
                <p>Email: {testimonial.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSpace;