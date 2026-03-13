export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Tailwind CSS Test
        </h1>
        
        <div className="space-y-4">
          <p className="text-xl text-blue-600 font-semibold">
            ✅ If you can see this styled beautifully, Tailwind is working!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-red-500 text-white p-4 rounded-md">Red Box</div>
            <div className="bg-green-500 text-white p-4 rounded-md">Green Box</div>
            <div className="bg-yellow-500 text-white p-4 rounded-md">Yellow Box</div>
            <div className="bg-pink-500 text-white p-4 rounded-md">Pink Box</div>
          </div>
          
          <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
            Hover me!
          </button>
        </div>
      </div>
    </div>
  )
}
