(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{156:function(e,t,n){var content=n(159);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(43).default)("7c016eb2",content,!0,{sourceMap:!1})},157:function(e,t,n){"use strict";n.d(t,"a",(function(){return $}));const o=e=>e?new Date(e.getTime?e.getTime():e):e,r=()=>new Date(1970,0,1),l=(...e)=>{let t;for(const n of e)if(t=new Date(n&&n.getTime?n.getTime():n),t instanceof Date&&t.getTime())break;return t instanceof Date&&t.getTime()||(t=r()),t},c={milliseconds:1,seconds:1e3,minutes:6e4,hours:36e5,days:864e5,weeks:6048e5,months:26298e5,years:315576e5},d=["milliseconds","seconds","minutes","hours"],m={milliseconds:e=>e.getMilliseconds(),seconds:e=>e.getSeconds(),minutes:e=>e.getMinutes(),hours:e=>e.getHours(),days:e=>e.getDate(),months:e=>e.getMonth(),years:e=>e.getFullYear()},v={milliseconds:(e,t)=>l(e.setMilliseconds(t)),seconds:(e,t)=>l(e.setSeconds(t)),minutes:(e,t)=>l(e.setMinutes(t)),hours:(e,t)=>l(e.setHours(t)),days:(e,t)=>l(e.setDate(t)),months:(e,t)=>l(e.setMonth(t)),years:(e,t)=>l(e.setFullYear(t))},f={milliseconds:null,seconds:"milliseconds",minutes:"seconds",hours:"minutes",days:"hours",months:"days",years:"months"},h=e=>e.getHours()===_.hours(e)-1,y=e=>e.getDate()===_.days(e),_={milliseconds:e=>1e3,seconds:e=>60,minutes:e=>60,hours:e=>w(e),days:e=>D(e),months:e=>12,years:e=>1/0},w=e=>{const t=new Date(e.getFullYear(),e.getMonth(),e.getDate());return(new Date(e.getFullYear(),e.getMonth(),e.getDate()+1)-t)/36e5},D=e=>new Date(e.getFullYear(),e.getMonth()+1,0).getDate(),x=(e,t,n)=>{e=l(e),t=l(t);const o=!n||"days"===n;let r=((!n||"months"===n)&&y(e)?-75:0)+(o&&h(e)?-2:0);return r&&(e=new Date(e.getTime()+r*c.hours),t=new Date(t.getTime()+r*c.hours)),{startDate:e,endDate:t}},O=e=>P({...k,...e}),P=e=>((e.dateRef||"dateRef"in e)&&Object.defineProperty(e,"dateRef",{enumerable:!1,value:e.dateRef}),e),j=e=>P({...e}),k=P({dateRef:null,milliseconds:0,seconds:0,minutes:0,hours:0,days:0,weeks:0,months:0,years:0}),M=(e,t)=>{e=l(e);const n=(12*(t=O(t)).years+t.months)%1,o=(7*t.weeks+t.days)%1,r=t.hours%1,d=t.minutes%1,m=t.seconds%1;return e.setMonth(e.getMonth()+12*t.years+t.months),e.setDate(e.getDate()+7*t.weeks+t.days),e.setHours(e.getHours()+t.hours,e.getMinutes()+t.minutes,e.getSeconds()+t.seconds,e.getMilliseconds()+t.milliseconds+m*c.seconds+d*c.minutes+r*c.hours+o*c.days+n*c.months),e},C=(e,t,n,r=1)=>{e=l(e),t=l(t),"weeks"===n&&(n="days",r=7);const h=c[n]*r;if(d.includes(n))return Math.trunc((t-e)/h);let{startDate:y,endDate:_}=x(e,t,n);const w=((e,t,n)=>{e=l(e),t=l(t);let r=o(t),c=f[n];for(;c;)r=v[c](r,m[c](e)),c=f[c];const d=Math.sign(t-e)||1,h=Math.sign(r-t);return h&&d==h&&(r=v[n](r,m[n](t)-d)),r})(y,_,n)-y;let D=Math.round(w/c[n]);return D=Math.trunc(D*c[n]/h),D},V=(e,t,n,o=1)=>{"weeks"===n&&(n="days",o=7),e=l(e),t=l(t);const r=c[n]*o,d=C(e,t,n,o);return d+(t-e-d*r)/r},$=(e,t,n=1,r)=>{let c=l(r,e.dateRef);c=o(c);let d=M(c,e);return V(c,d,t,n)},S=e=>({amount:e.amount,per:j(e.per)});S({amount:1,per:{hours:1}})},158:function(e,t,n){"use strict";var o=n(156);n.n(o).a},159:function(e,t,n){(t=n(42)(!1)).push([e.i,".toggle-checkbox[data-v-3da89ea6]:checked{right:0}",""]),e.exports=t},160:function(e,t,n){"use strict";n.r(t);n(78),n(29),n(30),n(12),n(61);var o=n(41);function r(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var l=n(1).a.extend({props:{value:{type:Object,default:function(){return{}}}},data:function(){return{model:{}}},watch:{value:"initModel"},created:function(){this.initModel()},methods:{initModel:function(){this.model=function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?r(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):r(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},this.value)},emitModel:function(){this.$emit("input",this.model)}}}),c=n(26),component=Object(c.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("De quelle tâche parle-t-on ?")]),e._v(" "),n("textarea",{staticClass:"placeholder-gray-600",attrs:{placeholder:"Ouvrir un fichier avec Alfred plutôt qu'en naviguant dossier par dossier."}}),e._v(" "),n("h2",{staticClass:"mt-6"},[e._v("\n    Combien de temps vous ferait-elle gagner ?\n  ")]),e._v(" "),n("div",{staticClass:"text-center"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.gainValue,expression:"model.gainValue",modifiers:{number:!0}}],attrs:{type:"number",step:"1",min:"0",inputmode:"numeric",pattern:"[0-9]*"},domProps:{value:e.model.gainValue},on:{input:[function(t){t.target.composing||e.$set(e.model,"gainValue",e._n(t.target.value))},e.emitModel],blur:function(t){return e.$forceUpdate()}}}),e._v(" "),n("div",{staticClass:"w-32 select-container"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.model.gainPeriod,expression:"model.gainPeriod"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.model,"gainPeriod",t.target.multiple?n:n[0])},e.emitModel]}},[n("option",{attrs:{value:"seconds"}},[e._v("\n          secondes\n        ")]),e._v(" "),n("option",{attrs:{value:"minutes"}},[e._v("\n          minutes\n        ")]),e._v(" "),n("option",{attrs:{value:"hours"}},[e._v("\n          heures\n        ")])]),e._v(" "),n("div",{staticClass:"absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"},[n("svg",{staticClass:"w-4 h-4 fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])]),e._v(" "),n("h2"),e._v(" "),n("h2",{staticClass:"mt-6"},[e._v("\n    Quelle est sa fréquence ?\n  ")]),e._v(" "),n("div",{staticClass:"text-center"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.frequencyValue,expression:"model.frequencyValue",modifiers:{number:!0}}],attrs:{type:"number",step:"1",min:"0",inputmode:"numeric",pattern:"[0-9]*"},domProps:{value:e.model.frequencyValue},on:{input:[function(t){t.target.composing||e.$set(e.model,"frequencyValue",e._n(t.target.value))},e.emitModel],blur:function(t){return e.$forceUpdate()}}}),e._v(" "),n("span",{staticClass:"px-1"},[e._v("fois")]),e._v(" "),n("div",{staticClass:"w-36 select-container"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.model.frequencyPeriod,expression:"model.frequencyPeriod"}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.model,"frequencyPeriod",t.target.multiple?n:n[0])},e.emitModel]}},[n("option",{attrs:{value:"days"}},[e._v("\n          par jour\n        ")]),e._v(" "),n("option",{attrs:{value:"weeks"}},[e._v("\n          par semaine\n        ")]),e._v(" "),n("option",{attrs:{value:"months"}},[e._v("\n          par mois\n        ")]),e._v(" "),n("option",{attrs:{value:"years"}},[e._v("\n          par an\n        ")])]),e._v(" "),n("div",{staticClass:"absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"},[n("svg",{staticClass:"w-4 h-4 fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])])])])}),[],!1,null,"23aa7b30",null);t.default=component.exports},161:function(e,t,n){"use strict";n.r(t);n(78),n(29),n(62),n(63);var o=n(41),r=(n(30),n(12),n(61),n(1)),l=n(157);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var d={seconds:"seconde",minutes:"minute",hours:"heure",days:"jour",weeks:"semaine",months:"mois"},m=r.a.extend({props:{value:{type:Object,default:function(){}},totalDuration:{type:Object,default:function(){}}},data:function(){return{model:{}}},computed:{periods:function(){return d},formattedDuration:function(){for(var e=Object.keys(this.periods),t="",i=e.length;i>=0;i--){var n=e[i],o=Object(l.a)(this.totalDuration,n);if(o>=2||0===i){Math.floor(o);t=this.formatDuration(this.totalDuration,n,this.periods[n]);break}}return t}},watch:{value:"initModel"},created:function(){this.initModel()},methods:{initModel:function(){this.model=function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},this.value)},emitModel:function(){this.$emit("input",this.model)},formatJokeAmounts:function(){var e=Math.round(Object(l.a)(this.totalDuration,"seconds")/90);return"".concat(e.toLocaleString()," ").concat("blague").concat(e>1&&"s"!=="blague"["blague".length-1]?"s":"")},isDurationSignificant:function(e){return Object(l.a)(this.totalDuration,e)>=.1},formatDurationParts:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r=Object(l.a)(e,t),c="fr-FR",d=["seconds","minutes"].includes(t)||o,m={maximumFractionDigits:d?0:1},v=r.toLocaleString(c,m),f="".concat(n).concat(r>1&&"s"!==n[n.length-1]?"s":"");return[v,f]},formatDuration:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return this.formatDurationParts(e,t,n,o).join(" ")}}}),v=(n(158),n(26)),component=Object(v.a)(m,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Temps gagné")]),e._v(" "),n("div",[e._v("\n    Sur un horizon de\n    "),n("div",{staticClass:"w-24 select-container"},[n("select",{directives:[{name:"model",rawName:"v-model.number",value:e.model.horizonValue,expression:"model.horizonValue",modifiers:{number:!0}}],on:{change:[function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(t){var n="_value"in t?t._value:t.value;return e._n(n)}));e.$set(e.model,"horizonValue",t.target.multiple?n:n[0])},e.emitModel]}},[n("option",{attrs:{value:"1"}},[e._v("\n          1 an\n        ")]),e._v(" "),n("option",{attrs:{value:"2"}},[e._v("\n          2 ans\n        ")]),e._v(" "),n("option",{attrs:{value:"3"}},[e._v("\n          3 ans\n        ")]),e._v(" "),n("option",{attrs:{value:"4"}},[e._v("\n          4 ans\n        ")]),e._v(" "),n("option",{attrs:{value:"5"}},[e._v("\n          5 ans\n        ")]),e._v(" "),n("option",{attrs:{value:"10"}},[e._v("\n          10 ans\n        ")])]),e._v(" "),n("div",{staticClass:"absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"},[n("svg",{staticClass:"w-4 h-4 fill-current",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20"}},[n("path",{attrs:{d:"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"}})])])]),e._v("\n    , cette optimisation vous fera gagner :\n  ")]),e._v(" "),n("div",{staticClass:"text-center"},[n("div",{staticClass:"inline-flex items-center mt-4 mb-1 text-gray-700",attrs:{title:"Le temps de travail est une estimation sur la base d’une semaine de 35 heures avec 5 semaines de congés par an."}},[n("label",[e._v("Temps de vie")]),e._v(" "),n("div",{staticClass:"relative inline-block w-10 mx-2 align-middle transition duration-200 ease-in"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.model.isWorkingPeriod,expression:"model.isWorkingPeriod"}],staticClass:"absolute block w-6 h-6 bg-gray-600 border-none rounded-full appearance-none cursor-pointer toggle-checkbox focus:bg-indigo-400",attrs:{id:"toggle",type:"checkbox",name:"toggle"},domProps:{checked:Array.isArray(e.model.isWorkingPeriod)?e._i(e.model.isWorkingPeriod,null)>-1:e.model.isWorkingPeriod},on:{change:[function(t){var n=e.model.isWorkingPeriod,o=t.target,r=!!o.checked;if(Array.isArray(n)){var l=e._i(n,null);o.checked?l<0&&e.$set(e.model,"isWorkingPeriod",n.concat([null])):l>-1&&e.$set(e.model,"isWorkingPeriod",n.slice(0,l).concat(n.slice(l+1)))}else e.$set(e.model,"isWorkingPeriod",r)},e.emitModel]}}),e._v(" "),n("label",{staticClass:"block h-6 overflow-hidden bg-white border-2 border-gray-500 rounded-full cursor-pointer select-none toggle-label",attrs:{for:"toggle"}})]),e._v(" "),n("label",[e._v("Temps de travail")])]),e._v(" "),n("div",{staticClass:"mt-4 text-3xl font-semibold text-blue-600 duration-label"},[e._v("\n      "+e._s(e.formattedDuration)+"\n    ")]),e._v(" "),e.isDurationSignificant(Object.keys(e.periods)[0])?n("div",{staticClass:"grid items-center grid-cols-2 gap-6 mt-4 -ml-32 text-lg font-medium"},[n("div",{staticClass:"text-right"},[e._v("\n        Soit\n      ")]),e._v(" "),n("div",{staticClass:"font-medium text-left duration-label"},[n("table",[n("tbody",e._l(e.periods,(function(t,o){return e.isDurationSignificant(o)&&!e.formattedDuration.includes(t)?n("tr",{key:o},[n("td",{staticClass:"pr-1 text-right"},[e._v("\n                "+e._s(e.formatDurationParts(e.totalDuration,o,t)[0])+"\n              ")]),e._v(" "),n("td",[e._v("\n                "+e._s(e.formatDurationParts(e.totalDuration,o,t)[1])+"\n              ")])]):e._e()})),0)])])]):e._e(),e._v(" "),n("div",{staticClass:"mt-2",attrs:{title:"Au rythme d’une blague toutes les 1 minute ½ !"}},[e._v("\n      (Ou le temps pour raconter "),n("span",{staticClass:"text-lg font-medium duration-label"},[e._v(e._s(e.formatJokeAmounts()))]),e._v(" de qualité discutable.)\n    ")])])])}),[],!1,null,"3da89ea6",null);t.default=component.exports},162:function(e,t,n){"use strict";n.r(t);var o=n(41),r=n(1),l=n(157),c=r.a.extend({data:function(){return{model:{gainValue:15,gainPeriod:"seconds",frequencyValue:3,frequencyPeriod:"days",horizonValue:1,horizonPeriod:"years",isWorkingPeriod:!1},totalDuration:{seconds:0}}},created:function(){this.computeDuration()},methods:{getDuration:function(e,t){return Object(o.a)({},t,e)},computeDuration:function(){var e=this.model,t=e.gainValue,n=e.gainPeriod,o=e.frequencyValue,r=e.frequencyPeriod,c=e.horizonValue,d=e.isWorkingPeriod,m=Object(l.a)(this.getDuration(t,n),"seconds"),v=365/Object(l.a)(this.getDuration(1,r),"days");d&&"years"!==r&&(v=228/Object(l.a)(this.getDuration(1,r),"days"));var f=m*(o*v)*c;this.totalDuration={seconds:f}}}}),d=n(26),component=Object(d.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"grid max-w-screen-lg grid-cols-1 gap-6 mx-auto md:grid-cols-8"},[n("Form",{staticClass:"box md:col-span-3",on:{input:e.computeDuration},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}}),e._v(" "),n("Result",{staticClass:"box md:col-span-5",attrs:{"total-duration":e.totalDuration},on:{input:e.computeDuration},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}})],1)}),[],!1,null,"2d28d743",null);t.default=component.exports;installComponents(component,{Form:n(160).default,Result:n(161).default})}}]);