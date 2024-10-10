"use client"

interface CreateTesimonialButtonProp {
  setCreateTestimonial: (value: boolean) => void;
  space: {
    name: string,
    description: string,
    message: string
  };
  questions: string[]
}

export default function AskTestimonial({ setCreateTestimonial, space, questions }: CreateTesimonialButtonProp) {
  return (
    <div>
      <h1 className="text-5xl text-white">{space.name}</h1>
      {questions.map((question, index)=>{
        return <p className="text-lg text-white" key={index}>{question}</p>
      })}
      <button 
        onClick={() => setCreateTestimonial(true)}
        className="text-gray-200 hover:text-gray-100 bg-blue-700
         hover:bg-blue-800 rounded-sm text-md px-5 py-2.5 flex
          justify-center align-middle"
      >
        Send a feedback
      </button>
    </div>
  );
}