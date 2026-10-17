import React from 'react';
import {createRoot} from 'react-dom/client';
import ResearchEdition from './ResearchEdition';
class Boundary extends React.Component<{children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?<main><h1>The dossier could not open.</h1><p>Please reopen index.html. The downloadable research documents are also included in the package.</p></main>:this.props.children;}}
createRoot(document.getElementById('root')!).render(<Boundary><ResearchEdition/></Boundary>);
