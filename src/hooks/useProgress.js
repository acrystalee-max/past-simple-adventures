import {useEffect,useState} from 'react';
const initial={name:'Time Scout',coins:0,stars:0,completed:[false,false,false],parts:[false,false,false],sound:true,music:true};
export function useProgress(){
 const [progress,setProgress]=useState(()=>{try{return {...initial,...JSON.parse(localStorage.getItem('psa-progress'))}}catch{return initial}});
 useEffect(()=>localStorage.setItem('psa-progress',JSON.stringify(progress)),[progress]);
 const win=(i,coins,stars)=>setProgress(p=>{const completed=[...p.completed],parts=[...p.parts];completed[i]=true;parts[i]=true;return {...p,coins:p.coins+coins,stars:p.stars+stars,completed,parts}});
 const reset=()=>{localStorage.removeItem('psa-progress');setProgress({...initial})};
 return {progress,setProgress,win,reset};
}
