"use client"

interface CreateTesimonialButtonProp {
  setCreateTestimonial: (value: boolean) => void;
}

export default function AskTestimonial({ setCreateTestimonial }: CreateTesimonialButtonProp) {
  return (
    <div>
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