"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7494],{64865:function(t,r,e){e.d(r,{C:function(){return a}});class a{constructor(t){this.contractWrapper=t}overrideNextTransaction(t){this.contractWrapper.withTransactionOverride(t)}}},92645:function(t,r,e){e.d(r,{C:function(){return c}});var a=e(33154),n=e(85982);class c{featureName=n.dm.name;constructor(t){this.contractWrapper=t}async get(){let[t,r]=await this.contractWrapper.read("getPlatformFeeInfo",[]);return n.bI.parseAsync({platform_fee_recipient:t,platform_fee_basis_points:r})}set=(0,a.c)(async t=>{let r=await n.bI.parseAsync(t);return a.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setPlatformFeeInfo",args:[r.platform_fee_recipient,r.platform_fee_basis_points]})})}},75884:function(t,r,e){e.d(r,{C:function(){return c}});var a=e(33154),n=e(85982);class c{featureName=n.d5.name;constructor(t){this.contractWrapper=t}async getRecipient(){let t=await this.contractWrapper.read("primarySaleRecipient",[]);return t}setRecipient=(0,a.c)(async t=>a.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"setPrimarySaleRecipient",args:[t]}))}},8069:function(t,r,e){e.d(r,{S:function(){return s}});var a=e(85982),n=e(33154),c=e(73453);class s{get chainId(){return this._chainId}constructor(t,r,e){this.contractWrapper=t,this.storage=r,this.erc721=new c.h(this.contractWrapper,this.storage,e),this._chainId=e}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async getAll(t){return this.erc721.getAll(t)}async getOwned(t,r){return t&&(t=await (0,a.aO)(t)),this.erc721.getOwned(t,r)}async getOwnedTokenIds(t){return t&&(t=await (0,a.aO)(t)),this.erc721.getOwnedTokenIds(t)}async totalSupply(){return this.erc721.totalCirculatingSupply()}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}transfer=(0,n.c)(async(t,r)=>this.erc721.transfer.prepare(t,r));setApprovalForAll=(0,n.c)(async(t,r)=>this.erc721.setApprovalForAll.prepare(t,r));setApprovalForToken=(0,n.c)(async(t,r)=>n.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:"approve",args:[await (0,a.aO)(t),r]}))}},17494:function(t,r,e){e.r(r),e.d(r,{NFTCollection:function(){return W}});var a=e(5572),n=e(85982),c=e(33154),s=e(85089),i=e(16810),p=e(64865),o=e(25266),h=e(92645),l=e(31049),d=e(75884),u=e(8069),f=e(73453);e(56662),e(68870),e(11953),e(53010);class W extends u.S{static contractRoles=n.dy;constructor(t,r,e){let a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=arguments.length>4?arguments[4]:void 0,u=arguments.length>5?arguments[5]:void 0,m=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new n.ct(t,r,c,a,e);super(m,e,u),this.abi=n.bm.parse(c||[]),this.metadata=new s.C(this.contractWrapper,n.cg,this.storage),this.app=new s.b(this.contractWrapper,this.metadata,this.storage),this.roles=new l.C(this.contractWrapper,W.contractRoles),this.royalties=new o.C(this.contractWrapper,this.metadata),this.sales=new d.C(this.contractWrapper),this.encoder=new i.C(this.contractWrapper),this.estimator=new s.G(this.contractWrapper),this.events=new s.a(this.contractWrapper),this.platformFees=new h.C(this.contractWrapper),this.interceptor=new p.C(this.contractWrapper),this.signature=new f.i(this.contractWrapper,this.storage),this.owner=new o.a(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.address}async isTransferRestricted(){let t=await this.contractWrapper.read("hasRole",[(0,n.H)("transfer"),a.d]);return!t}mint=(0,c.c)(async t=>this.erc721.mint.prepare(t));mintTo=(0,c.c)(async(t,r)=>this.erc721.mintTo.prepare(t,r));async getMintTransaction(t,r){return this.erc721.getMintTransaction(t,r)}mintBatch=(0,c.c)(async t=>this.erc721.mintBatch.prepare(t));mintBatchTo=(0,c.c)(async(t,r)=>this.erc721.mintBatchTo.prepare(t,r));burn=(0,c.c)(t=>this.erc721.burn.prepare(t));async prepare(t,r,e){return c.T.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:r,overrides:e})}async call(t,r,e){return this.contractWrapper.call(t,r,e)}}}}]);