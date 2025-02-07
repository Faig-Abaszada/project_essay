import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './searchInput.scss'
import BasicTable from "./DemoSimple.jsx";
import StickyColumnTable from "./StickyColumnTable.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicTable/>
      {/*<StickyColumnTable/>*/}
    </>
  )
}

export default App
