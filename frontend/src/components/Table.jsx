import React from 'react'

function Table() {
  return (
    <div className="pt-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th cl>Name</th>
       
        <th>Level</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        
        <td>Blue</td>
      </tr>
      {/* row 2 */}
      <tr className="hover">
        <th>2</th>
        <td>Hart Hagerty</td>
       
        <td>Purple</td>
      </tr>
      {/* row 3 */}
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
       
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
  )
}

export default Table