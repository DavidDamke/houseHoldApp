import { useState, type ReactElement } from 'react'
import { ShoppingList } from './components/ShoppingList'


enum NavigationType {
  SHOPPINGLIST
}


type NavigaionButtonProps = {
  name: string, 
  navigationKey?: NavigationType
}

function App() {
  
  const [mainContent, setMainContent] = useState<ReactElement | null>(null)
  

  const NavigaionButton = ({name, navigationKey}: NavigaionButtonProps):ReactElement => {
  
    const content = navigationKey == NavigationType.SHOPPINGLIST ? <ShoppingList/> : null
    
    return <div style={{cursor:"pointer"}} onClick={()=>setMainContent(content)}>
      {name}
    </div>
  }


  return (
    <div style={{ display: 'flex', flexDirection: "row", height: "100%" }}>
      
      <div style={{ backgroundColor: "grey", padding: "8px" , gap:"8px"}}> <h3>HouseHoldApp</h3>
        
        <div style={{display:"flex", flexDirection:"column"}}>
       <NavigaionButton name={"ShoppingList"} navigationKey={NavigationType.SHOPPINGLIST}></NavigaionButton>
       <NavigaionButton name={"Empty"}></NavigaionButton>
      </div></div>
      
        {mainContent}
    </div>
  )
}

export default App
