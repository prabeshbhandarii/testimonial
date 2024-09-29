import { useState } from 'react';
import axios from "axios"
import { prisma } from '../lib/db';

interface SpaceData{
  name: string, 
  description: string, 
  message: string;
}

interface QuestionData{
  content: string;
}

const CreateSpaceForm = () => {
  const [spaceData, setSpaceData] = useState<SpaceData>({
    name: '',
    description: '',
    message: ''
  });

  const [questions, setQuestions] = useState<QuestionData[]>([
    { content: '' },
    { content: '' },
    { content: '' }
  ]);

  const handleSpaceDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSpaceData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleQuestionChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuestions(prevQuestions => 
      prevQuestions.map((q, i) =>
        i === index ? { ...q, content: value } : q
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newSpace = await axios.post("http://localhost:3000/api/space", spaceData)
      const spaceId = newSpace.data.data.id
      //consolelog
      console.log("newSpace Created")
      console.log(newSpace.data.data.id)

      const questionData = {
        spaceId: spaceId,
        questions: questions.map(q => ({content: q.content}))
      }

      const newQuestion = await axios.post("http://localhost:3000/api/question", questionData)
      
    } catch (err) {
      console.error("could not create space" + err)
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg mt-5">
      <h2 className="text-2xl font-bold mb-4 text-white">Create a New Space</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Space Name</label>
          <input type="text" id="name" name="name" value={spaceData.name} onChange={handleSpaceDataChange} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea id="description" name="description" value={spaceData.description} onChange={handleSpaceDataChange} rows={3} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Custom Message</label>
          <textarea id="message" name="message" value={spaceData.message} onChange={handleSpaceDataChange} rows={2} className="mt-1 block p-2 w-full rounded-md bg-gray-700 border-gray-600 text-white"></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">Questions</label>
          {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question-${index}`}>Question {index + 1}</label>
            <input
              type="text"
              id={`question-${index}`}
              name={'questions'}
              value={question.content}
              onChange={handleQuestionChange(index)}
              className="mt-1 block p-2 w-full"
            />
          </div>
          ))}

        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700">Create Space</button>
      </form>
    </div>
  );
};

export default CreateSpaceForm;