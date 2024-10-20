"use client"
import { useEffect, useState } from 'react';
import axios from "axios"
import { usePathname } from 'next/navigation';

interface TestimonialData{
  name: string, 
  content: string, 
  email: string,
  spaceId: string
}

interface CreateTesimonialButtonProp {
  space: {
    name: string,
    description: string,
    message: string
  };
  questions: string[]
}

const CreateTestimonialForm = ({ space, questions }: CreateTesimonialButtonProp) => {
  
  const [testimonialData, setTestimonialData] = useState<TestimonialData>({
    content: '',
    name: '',
    email: '',
    spaceId: ''
  });

  const [spaceId, setSpaceId] = useState<string>('');

  const url = usePathname()
  const spaceName = url.split('/')[2]

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const space = await axios.get(`/api/space/${spaceName}`, {
          headers: {
            'spaceName': spaceName
          }
        })

        setSpaceId(space.data.data.id)
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [spaceName])

  const handleTestimonialDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonialData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await axios.post(`/api/testimonial`, testimonialData, {
        headers: {
          'spaceId': spaceId
        }
      })
      
    }catch (err) {
      console.error("could not create testimonial" + err)
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg mt-5">
      <h1 className='text-white text-5xl'>{space.name}</h1>
      {questions.map((question, index)=>{
        return <p key={index} className='text-lg text-white'>{question}</p>
      })}
      <h2 className="text-2xl font-bold mb-4 text-white">Create a testimonial</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-300">feedback</label>
          <textarea id="content" name="content" value={testimonialData.content} onChange={handleTestimonialDataChange} rows={2} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Your name</label>
          <input type="text" id="name" name="name" value={testimonialData.name} onChange={handleTestimonialDataChange} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">email</label>
          <input type="text" id="email" name="email" value={testimonialData.email} onChange={handleTestimonialDataChange} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white" required />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Create Space</button>
      </form>
    </div>
  );
};

export default CreateTestimonialForm