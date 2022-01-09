import React from "react";

const SearchPanel = ({param,setParam,users,setUsers}) => {
  return (
    <div>
      <input type="text" value={param.name} onChange={e => setParam({...param, name:e.target.value})}></input>
      <select value={param.personID} onChange={e => setParam({...param,personId: e.target.value})}>
        <option value={''}>负责人</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  )
}
export default SearchPanel;