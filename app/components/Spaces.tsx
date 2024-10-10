import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Space{
  id: string,
  name: string,
  description: string,
  message: string
}

const Spaces = () => {
  const [spaces, setSpaces] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/space").then(
      (spaces)=>{
        setSpaces(spaces.data.data)
      },
      (error)=>{
        console.error(error)
      }
    )
  }, [])

  return (
    <div className="mb-8 text-white p-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Spaces</h2>
      </div>
              
          {spaces.map((space: Space, index)=>{
            return(
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <Link href={`/pages/products/${space.name}`}>{space.name}</Link>
              </div>
            )
          })}
      
    </div>
  )
}

export default Spaces
