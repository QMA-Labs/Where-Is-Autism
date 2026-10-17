'use client';
import {useEffect,useRef} from 'react';
export default function Field({paused=false}:{paused?:boolean}){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,tick=0,width=0,height=0,px=0,py=0;
 const resize=()=>{const r=canvas.getBoundingClientRect();width=r.width;height=r.height;const d=Math.min(devicePixelRatio,2);canvas.width=width*d;canvas.height=height*d;ctx.setTransform(d,0,0,d,0,0);};const observer=new ResizeObserver(()=>{resize();if(paused||media.matches)draw();});observer.observe(canvas);resize();
 const move=(e:PointerEvent)=>{if(media.matches||paused)return;px=(e.clientX/innerWidth-.5)*.13;py=(e.clientY/innerHeight-.5)*.08;};window.addEventListener('pointermove',move);
 const draw=()=>{ctx.clearRect(0,0,width,height);const time=paused||media.matches?0:tick*.002,radius=Math.min(width*.35,height*.36),cx=width*.51,cy=height*.49,tilt=.35+py;
 const project=(u:number,v:number)=>{const rr=1+.12*Math.sin(3*u+time)*Math.cos(2*v);let x=rr*Math.sin(v)*Math.cos(u),y=rr*Math.cos(v),z=rr*Math.sin(v)*Math.sin(u);const a=time*.25+px,rx=x*Math.cos(a)-z*Math.sin(a);z=x*Math.sin(a)+z*Math.cos(a);x=rx;const ry=y*Math.cos(tilt)-z*Math.sin(tilt);z=y*Math.sin(tilt)+z*Math.cos(tilt);y=ry;return[cx+x*radius,cy+y*radius,z];};
 const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*1.5);glow.addColorStop(0,'rgba(72,117,164,.15)');glow.addColorStop(.65,'rgba(70,98,162,.05)');glow.addColorStop(1,'transparent');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
 for(let j=1;j<35;j++){ctx.beginPath();for(let i=0;i<=100;i++){const[x,y]=project(i/100*Math.PI*2,j/35*Math.PI);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.strokeStyle=`rgba(150,190,222,${j%3===0?.3:.12})`;ctx.lineWidth=.6;ctx.stroke();}
 for(let i=0;i<44;i++){ctx.beginPath();for(let j=0;j<=70;j++){const[x,y]=project(i/44*Math.PI*2,j/70*Math.PI);if(j===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.strokeStyle='rgba(142,170,214,.14)';ctx.stroke();}
 for(let i=0;i<170;i++){const[x,y,z]=project(i*2.39996,Math.acos(1-2*(i+.5)/170));ctx.beginPath();ctx.arc(x,y,z>0?1.35:.65,0,Math.PI*2);ctx.fillStyle=z>0?'rgba(192,227,244,.75)':'rgba(147,179,211,.2)';ctx.fill();}
 ctx.strokeStyle='rgba(170,198,222,.25)';ctx.beginPath();ctx.ellipse(cx,cy,radius*1.23,radius*.29,-.35,0,Math.PI*2);ctx.stroke();if(!document.hidden)tick++;if(!paused&&!media.matches)frame=requestAnimationFrame(draw);};draw();return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('pointermove',move);};},[paused]);
 return <canvas ref={ref} className="field" aria-hidden="true"/>;
}

