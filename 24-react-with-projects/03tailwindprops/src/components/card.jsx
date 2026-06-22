// import React from 'react'

const card = ({title="Wall of Flame", text="You are forced to turn back by an intense, roaring flame. There is no way forward here.", image="/images/firePal.png"}) => {
  return (

    <div className="min-h-[67vh] sm:p-10 p- lg:px-10 bg-gray-800 flex flex-col items-center justify-center">
      <div className="bg-gray-100 shadow-lg rounded-xl overflow-hidden max-w-xs order-first lg:order-none">
        <div>
          <img className="w-96" src={image} alt="card image"/>
        </div>
        <div className="py-5 px-6 sm:px-8">
          <h2 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-3 bg-green-200 p-2 rounded-md">{title}</h2>
          <p className="text-gray-500 leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default card
