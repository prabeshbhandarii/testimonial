"use client"

import AskTestimonial from "@/app/components/AskTestimonial"
import CreateTestimonialForm from "@/app/components/CreateTestimonialForm"
import PrivateRoute from "@/app/components/PrivateRoute"
import axios from "axios"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface SpaceData{
  id: string,
  name: string, 
  description: string, 
  message: string;
}

export default function TestimonialForm(){
  const url = usePathname()
  const spaceName = url.split('/')[2]
  const [createTestimonial, setCreateTestimonial] = useState(false)
  const [spaceData, setSpaceData] = useState<SpaceData>({
    id: '',
    name: '',
    description: '',
    message: ''
  });
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const space = await axios.get(`api/space/${spaceName}`, {
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
          const question = await axios.get(`api/question`, {
            headers: {
              'spaceId': space.data.data.id
            }
          })

          setQuestions(
            question.data.data
          )

        }        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [spaceName])

  return (
    <>
      <PrivateRoute>
        {!createTestimonial && <AskTestimonial questions={questions} space={spaceData} setCreateTestimonial={setCreateTestimonial} />}
        {createTestimonial && <CreateTestimonialForm questions={questions} space={spaceData} />}
      </PrivateRoute>
    </>
  )
}
