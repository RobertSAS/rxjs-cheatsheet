"use strict";(self.webpackChunkbenchmarking=self.webpackChunkbenchmarking||[]).push([[592],{4707:(I,v,n)=>{n.d(v,{t:()=>o});var a=n(7579),y=n(6063);class o extends a.x{constructor(r=1/0,l=1/0,i=y.l){super(),this._bufferSize=r,this._windowTime=l,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=l===1/0,this._bufferSize=Math.max(1,r),this._windowTime=Math.max(1,l)}next(r){const{isStopped:l,_buffer:i,_infiniteTimeWindow:d,_timestampProvider:c,_windowTime:h}=this;l||(i.push(r),!d&&i.push(c.now()+h)),this._trimBuffer(),super.next(r)}_subscribe(r){this._throwIfClosed(),this._trimBuffer();const l=this._innerSubscribe(r),{_infiniteTimeWindow:i,_buffer:d}=this,c=d.slice();for(let h=0;h<c.length&&!r.closed;h+=i?1:2)r.next(c[h]);return this._checkFinalizedStatuses(r),l}_trimBuffer(){const{_bufferSize:r,_timestampProvider:l,_buffer:i,_infiniteTimeWindow:d}=this,c=(d?1:2)*r;if(r<1/0&&c<i.length&&i.splice(0,i.length-c),!d){const h=l.now();let u=0;for(let t=1;t<i.length&&i[t]<=h;t+=2)u=t;u&&i.splice(0,u+1)}}}},7445:(I,v,n)=>{n.d(v,{F:()=>o});var a=n(4049),y=n(5963);function o(m=0,r=a.z){return m<0&&(m=0),(0,y.H)(m,m,r)}},5963:(I,v,n)=>{n.d(v,{H:()=>r});var a=n(9751),y=n(4049),o=n(3532);function r(l=0,i,d=y.P){let c=-1;return null!=i&&((0,o.K)(i)?d=i:c=i),new a.y(h=>{let u=function m(l){return l instanceof Date&&!isNaN(l)}(l)?+l-d.now():l;u<0&&(u=0);let t=0;return d.schedule(function(){h.closed||(h.next(t++),0<=c?this.schedule(void 0,c):h.complete())},u)})}},1005:(I,v,n)=>{n.d(v,{g:()=>t});var a=n(4049),y=n(7272),o=n(5698),m=n(4482),r=n(5403),l=n(5032),d=n(9718),c=n(5577);function h(e,s){return s?f=>(0,y.z)(s.pipe((0,o.q)(1),function i(){return(0,m.e)((e,s)=>{e.subscribe((0,r.x)(s,l.Z))})}()),f.pipe(h(e))):(0,c.z)((f,p)=>e(f,p).pipe((0,o.q)(1),(0,d.h)(f)))}var u=n(5963);function t(e,s=a.z){const f=(0,u.H)(e,s);return h(()=>f)}},4049:(I,v,n)=>{n.d(v,{P:()=>h,z:()=>c});var a=n(727);class y extends a.w0{constructor(t,e){super()}schedule(t,e=0){return this}}const o={setInterval(u,t,...e){const{delegate:s}=o;return s?.setInterval?s.setInterval(u,t,...e):setInterval(u,t,...e)},clearInterval(u){const{delegate:t}=o;return(t?.clearInterval||clearInterval)(u)},delegate:void 0};var m=n(8737),l=n(6063);class i{constructor(t,e=i.now){this.schedulerActionCtor=t,this.now=e}schedule(t,e=0,s){return new this.schedulerActionCtor(this,t).schedule(s,e)}}i.now=l.l.now;const c=new class d extends i{constructor(t,e=i.now){super(t,e),this.actions=[],this._active=!1}flush(t){const{actions:e}=this;if(this._active)return void e.push(t);let s;this._active=!0;do{if(s=t.execute(t.state,t.delay))break}while(t=e.shift());if(this._active=!1,s){for(;t=e.shift();)t.unsubscribe();throw s}}}(class r extends y{constructor(t,e){super(t,e),this.scheduler=t,this.work=e,this.pending=!1}schedule(t,e=0){var s;if(this.closed)return this;this.state=t;const f=this.id,p=this.scheduler;return null!=f&&(this.id=this.recycleAsyncId(p,f,e)),this.pending=!0,this.delay=e,this.id=null!==(s=this.id)&&void 0!==s?s:this.requestAsyncId(p,this.id,e),this}requestAsyncId(t,e,s=0){return o.setInterval(t.flush.bind(t,this),s)}recycleAsyncId(t,e,s=0){if(null!=s&&this.delay===s&&!1===this.pending)return e;null!=e&&o.clearInterval(e)}execute(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(t,e);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(t,e){let f,s=!1;try{this.work(t)}catch(p){s=!0,f=p||new Error("Scheduled action threw falsy error")}if(s)return this.unsubscribe(),f}unsubscribe(){if(!this.closed){const{id:t,scheduler:e}=this,{actions:s}=e;this.work=this.state=this.scheduler=null,this.pending=!1,(0,m.P)(s,this),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null,super.unsubscribe()}}}),h=c},6063:(I,v,n)=>{n.d(v,{l:()=>a});const a={now:()=>(a.delegate||Date).now(),delegate:void 0}}}]);