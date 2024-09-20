"use client"

interface CreateSpaceButtonProps {
  setCreateSpace: (value: boolean) => void;
}

export default function CreateSpaceButton({ setCreateSpace }: CreateSpaceButtonProps) {
  return (
    <div>
      <button 
        onClick={() => setCreateSpace(true)}
        className="text-gray-200 hover:text-gray-100 bg-blue-700
         hover:bg-blue-800 rounded-sm text-md px-5 py-2.5 flex
          justify-center align-middle"
      >
        + Create new space
      </button>
    </div>
  );
}