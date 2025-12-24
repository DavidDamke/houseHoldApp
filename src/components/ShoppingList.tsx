import { useCallback, useEffect, useState, type ReactElement } from "react";


type ShoppingListElement = {
    name: string, 
    checked: boolean
}

export const ShoppingList = ():ReactElement => {
    
    const [searchInput, setSearchInput] = useState<string>("");
    
    const [shoppingList, setShoppingList] = useState<ShoppingListElement[]>(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
    });



    useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    }, [shoppingList]);
    
    
    const addElement = () => {
        if ( searchInput || searchInput != "") {   
            setShoppingList(prevList => [...prevList, {name:searchInput, checked:false}]);  
        }   
        setSearchInput("")
    };
    const getNotSelectedItems = useCallback(() => {
        return shoppingList.filter((item) => !item.checked);
    }, [shoppingList])
    
    const getSelectedItems = useCallback(() => {
        return shoppingList.filter((item) => item.checked);
    }, [shoppingList])
    
    
    const removeElement = () => {
       setShoppingList( getNotSelectedItems());
    };


    const showList = shoppingList.map((item, index) => {
        
        const onClickCheckBox = () => {
            setShoppingList(prevList =>
            prevList.map((element, i) =>
                i === index ? { ...element, checked: !element.checked } : element
            )
            );
        };

        return <div onClick={onClickCheckBox} style={{ margin:"1px", border:"1px solid grey", borderRadius:"10" }} key={index}>
              <input 
         type="checkbox" 
                checked={item.checked}
                onChange={() =>onClickCheckBox()}
        />
            {item.name}
        </div>
    })




    return <div style={{margin:"10px"}}>
        <div >
        <input onChange={(event) => setSearchInput(event.target.value)} value={searchInput}></input>
            <button onClick={addElement } style={{color:"green"}} >  ADD </button>
            <button onClick={removeElement } style={{color:"red"}} >  REMOVE </button>

        </div>
        <div style={{display:"flex" ,flexDirection:"column"}}>
        {showList}

        </div>
        {getSelectedItems().length >0 ? ( getSelectedItems().length +  "Selected Items") : ""}
    </div>
}

