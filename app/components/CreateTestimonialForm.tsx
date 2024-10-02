import { useState } from 'react';
import axios from "axios"
import { log } from 'console';

interface TestimonialData{
  name: string, 
  content: string, 
  email: string,
  spaceId: string
}


const CreateTestimonialForm = () => {
  const [testimonialData, setTestimonialData] = useState<TestimonialData>({
    content: '',
    name: '',
    email: '',
    spaceId: ''
});

const handleTestimonialDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestimonialData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const userSpaceId = await axios.get("http://localhost:3000/api/space")
      const spaceId = userSpaceId.data.data.id
      
      setTestimonialData((prevData)=>({...prevData, spaceId: spaceId}))

      const newTestimonial = await axios.post("http://localhost:3000/api/testimonial", testimonialData)
      
    }catch (err) {
      console.error("could not create testimonial" + err)
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg mt-5">
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

export default CreateTestimonialForm;