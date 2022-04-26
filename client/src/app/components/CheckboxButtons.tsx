import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({items, checked, onChange}: Props ) {
    //local state, checkedItems can be empty so []
    const [checkedItems, setCheckedItems] = useState(checked || [])

 function handleChecked(value: string){
    const currentIndex = checkedItems.findIndex(item => item === value);
    //array to store checked values
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter(item => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);

 }
 return (
    <FormGroup>
        {items.map(item => (
            <FormControlLabel 
            control={<Checkbox 
                //-1 means not checked
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handleChecked(item)}
            />} 
            label={item} key={item} />
        ))}
    </FormGroup>
)
        
}