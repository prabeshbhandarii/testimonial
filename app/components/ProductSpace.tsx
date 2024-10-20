"use client"
import React, { useEffect, useState } from 'react';
import { Search, Star, Heart, Award } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SpaceData{
  id: string,
  name: string, 
  description: string, 
  message: string;
}

interface Testimonial {
  id: number,
  name: string,
  email: string,
  content: string,
  liked: boolean
}

const ProductSpace = () => {
  const url = usePathname()
  const spaceName = url?.split('/')[3] || ''
  
  const [searchTerm, setSearchTerm] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [spaceData, setSpaceData] = useState<SpaceData>({
    id: '',
    name: '',
    description: '',
    message: ''
  });

  const sidebarItems = [
    { icon: <Star size={20} />, label: 'All', href: '' },
    { icon: <Award size={20} />, label: 'Featured', href: '' },
    { icon: <Heart size={20} />, label: 'Embed Wall of Love', href: `/pages/w` },
  ];

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const space = await axios.get(`/api/space/${spaceName}`, {
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
          const testimonial = await axios.get(`/api/testimonial`, {
            headers: {
              'spaceId': space.data.data.id
            }
          })

          setTestimonials(
            testimonial.data.data.map((t: Testimonial)=>({...t, liked: false}))
          )

        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [spaceName])

  const handleLike = async (testimonialId: number)=>{
    try {
      const response = await axios.put(`/api/testimonial`, { testimonialId });
      const updatedLiked = response.data.data.liked;
    
      setTestimonials(prevTestimonials =>
        prevTestimonials.map(t =>
          t.id === testimonialId ? {...t, liked: updatedLiked} : t
        )
      );
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="text-xl font-bold mb-4">Testimonial</h2>
        <ul>
          {sidebarItems.map((item, index) => (
            <Link key={index} href={item.href}>
            <li className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded">
              {item.icon}
              <span>{item.label}</span>
            </li>
            </Link>
          ))}
        </ul>
      </div>


{/* get spaceData */}

      {/* Main content */}
      <div className="flex-1 p-8">
        <strong className='text-white text-3xl m-2'>{spaceData.name}</strong><br />
        <Link href={`/pages/${spaceData.name}`}>Space public url: 
        https://testimonial-e28m.vercel.app/pages/{spaceData.name}</Link>
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
          {testimonials.map((testimonial: Testimonial, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {/* <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div> */}
                </div>
                <div className="flex space-x-2">
                  <button onClick={()=>handleLike(testimonial.id)} className="text-red-400 hover:text-red-300">
                    {!testimonial.liked && <Heart color="#f7f7f7" strokeWidth={0.5} />}
                    {testimonial.liked && <Heart color="#ff0000" strokeWidth={3} />}
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                {testimonial.content}
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
