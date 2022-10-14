"use strict";(self.webpackChunkbenchmarking=self.webpackChunkbenchmarking||[]).push([[359],{359:(b,o,t)=>{t.r(o),t.d(o,{MakeSuperHotComponent:()=>S});var u=t(6895),p=t(1028),m=t(4654),l=t(7579),c=t(7272),a=t(4870),e=t(4650);let S=(()=>{class n{constructor(){this.hotSnippet="\n    export const makeSuperHotObs$ = <T>(input: Observable<T>, takeCount = 1, takeUntilObs?: Observable<any>): Observable<T> => {\n  const destroy$ = new Subject<void>();\n  const toReturn = new ReplaySubject<T>(1);\n  input\n    .pipe(\n      takeCount > 0 ? take(takeCount) : map((res) => res),\n      takeUntilObs ? takeUntil(takeUntilObs) : map((res) => res),\n      takeUntil(destroy$)\n    )\n    .subscribe(toReturn);\n  let refs = 0;\n  return new Observable<T>((observer) => {\n    refs++;\n    const sub = toReturn.subscribe(observer);\n    return () => {\n      refs--;\n      if (refs === 0) {\n        destroy$.next();\n      }\n      sub.unsubscribe();\n    };\n  });\n};\n  ",this.codeSnippet="\ncallsToMake = [\n    makeStream(1, this.runStream$),\n    makeStream(2, this.runStream$),\n    makeStream(3, this.runStream$),\n    makeStream(4, this.runStream$),\n    makeStream(5, this.runStream$),\n    makeStream(6, this.runStream$),\n    makeStream(7, this.runStream$)\n  ]\n  testStream$ = makeSuperHotObs$(concat(\n    ...this.callsToMake\n  ), this.callsToMake.length, -1)\n  ",this.runStream$=new l.x,this.callsToMake=[(0,a.lV)(1,this.runStream$),(0,a.lV)(2,this.runStream$),(0,a.lV)(3,this.runStream$),(0,a.lV)(4,this.runStream$),(0,a.lV)(5,this.runStream$),(0,a.lV)(6,this.runStream$),(0,a.lV)(7,this.runStream$)],this.testStream$=(0,a.n4)((0,c.z)(...this.callsToMake),this.callsToMake.length,-1)}ngOnInit(){}}return n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-make-hot"]],standalone:!0,features:[e.jDz],decls:16,vars:4,consts:[[3,"codeSnippet"],[3,"codeSnippet","runStream$","testStream$"]],template:function(r,s){1&r&&(e.TgZ(0,"div")(1,"p"),e._uU(2,"If we consider that streams needs subscribers to run..."),e.qZA(),e.TgZ(3,"p"),e._uU(4,"we can undo that behaviour by making it like a promise:"),e.qZA(),e._UZ(5,"app-code-snippet",0),e.TgZ(6,"div")(7,"app-observable-area",1)(8,"p"),e._uU(9,"Here we wrap up a stream in makeSuperHotObs$ to make it run like a promise"),e.qZA(),e.TgZ(10,"p"),e._uU(11,"This can be useful for when logic is an observable but people may not subscribe or care about results"),e.qZA(),e.TgZ(12,"p"),e._uU(13,"E.g. selecting a new tab, opening a dropdown, loading an image, etc"),e.qZA(),e.TgZ(14,"p"),e._uU(15,'In code I call this a "super hot" observable, because not only does it share it\'s results like a hot observable but it runs eagerly like a promise'),e.qZA()()()()),2&r&&(e.xp6(5),e.Q6J("codeSnippet",s.hotSnippet),e.xp6(2),e.Q6J("codeSnippet",s.codeSnippet)("runStream$",s.runStream$)("testStream$",s.testStream$))},dependencies:[u.ez,p.N,m.U],encapsulation:2}),n})()}}]);