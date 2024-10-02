"use client"

import AskTestimonial from "@/app/components/AskTestimonial"
import CreateTestimonialForm from "@/app/components/CreateTestimonialForm"
import { useState } from "react"

export default function TestimonialForm(){
  const [createTestimonial, setCreateTestimonial] = useState(false)
  return (
    <>
      {!createTestimonial && <AskTestimonial setCreateTestimonial={setCreateTestimonial} />}
      {createTestimonial && <CreateTestimonialForm />}
    </>
  )
}
