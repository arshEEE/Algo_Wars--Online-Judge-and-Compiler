import React from 'react'

function Problembanner(item) {
  return (
    <>
    <div className="flex flex-col md:flex-row ml-5 mr-5 ">
    <div className='Question md:w-1/2 w-full mt-5' >
    <h1 className='text-3xl mt-5'>{item.name}</h1>
    <h1 className='mt-5'>Difficulty : </h1>
    <p className='mt-5 mb-5 '>{item.description}</p>
    <h1 className=' text-2xl mb-3'>Tescases:</h1>
    <h1 className='font-bold'>Input:</h1>
    <p>{item.input}</p>
    <h1 className='font-bold mt-5'>Output</h1>
    <p className='mb-5'>{item.output}</p>
     </div>
    <div className='code md:w-1/2 w-full mt-10'>
    <textarea className=" w-full h-1/2 textarea textarea-bordered" placeholder="Write your code here"></textarea>
    <div className='mt-5'>display result</div>
    <div className='w-full mt-5'>
    <button className="btn w-1/3 ">RUN</button>
    <button className="btn w-1/3 ">Compile</button>
    <button className="btn w-1/3 ">Submit</button>
    </div>
    
    </div>
    </div>
    
    </>
  )
}

export default Problembanner