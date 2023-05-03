import React from 'react'

export function TodoList() {
  return (
    <div>
      <h3>To Do Something</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        <li><input type="checkbox" checked={true} /><span>HTML & CSS</span></li>
        <li><input type="checkbox" checked={true} /><span>JavaScript</span></li>
        <li><input type="checkbox" checked={false} /><span>React</span></li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complited</button>
      </div>
    </div>
  )
}