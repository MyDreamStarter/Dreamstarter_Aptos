"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[783],{59968:function(t,i,n){n.d(i,{n:function(){return e}});function e(t){return"string"==typeof t?Number.parseInt(t,"0x"===t.trim().substring(0,2)?16:10):"bigint"==typeof t?Number(t):t}},60783:function(t,i,n){n.d(i,{SignerConnector:function(){return d}});var e=n(53061),s=n(75460),r=n(64140),a=n(85982),h=n(59968);n(11953);var o=new WeakMap,c=new WeakMap;class d extends r.C{constructor(t){super(),(0,s._)(this,o,{writable:!0,value:void 0}),(0,s._)(this,c,{writable:!0,value:void 0}),(0,e._)(this,"onChainChanged",t=>{let i=(0,h.n)(t),n=!this.options.chains.find(t=>t.chainId===i);this.emit("change",{chain:{id:i,unsupported:n}})}),this.options=t}async connect(t){t.chainId&&this.switchChain(t.chainId);let i=await this.getSigner(),n=await i.getAddress();return n}async disconnect(){(0,s.a)(this,o,void 0),(0,s.a)(this,c,void 0)}async getAddress(){let t=await this.getSigner();if(!t)throw Error("No signer found");return await t.getAddress()}async isConnected(){try{let t=await this.getAddress();return!!t}catch{return!1}}async getProvider(){return(0,s.b)(this,o)||(0,s.a)(this,o,(0,a.b1)(this.options.chain,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,s.b)(this,o)}async getSigner(){if(!(0,s.b)(this,c)){let t=await this.getProvider();(0,s.a)(this,c,u(this.options.signer,t))}return(0,s.b)(this,c)}async switchChain(t){let i=this.options.chains.find(i=>i.chainId===t);if(!i)throw Error(`Chain not found for chainId ${t}, please add it to the chains property when creating this wallet`);(0,s.a)(this,o,(0,a.b1)(i,{clientId:this.options.clientId,secretKey:this.options.secretKey})),(0,s.a)(this,c,u(this.options.signer,(0,s.b)(this,o))),this.onChainChanged(t)}async setupListeners(){}updateChains(t){this.options.chains=t}}function u(t,i){return i?t.connect(i):t}}}]);