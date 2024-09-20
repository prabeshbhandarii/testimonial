export default function Overview (){
    return(
        <div className="mb-8 text-white p-10">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Text</h3>
          <p className="text-2xl">1</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Plan</h3>
          <p className="text-2xl">Free plan</p>
          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded">Upgrade</button>
        </div>
      </div>
    </div>
    )
}