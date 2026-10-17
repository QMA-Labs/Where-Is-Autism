import React from 'react';
import {createRoot} from 'react-dom/client';
import Explorer from './Explorer';
class Boundary extends React.Component<{children:React.ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<main className="j-shell"><h1>این بخش باز نشد.</h1><p>برای شروع دوباره، فایل را ببند و باز کن. اطلاعات پژوهشی در فایل باقی مانده است.</p><a href="#scene-0" onClick={()=>location.reload()}>بازگشت به آغاز</a></main>:this.props.children;}
}
createRoot(document.getElementById('explorer-root')!).render(<Boundary><Explorer/></Boundary>);
