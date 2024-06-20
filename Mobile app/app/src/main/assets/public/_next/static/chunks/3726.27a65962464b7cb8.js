"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3726],{83726:function(e,t,i){i.d(t,{E:function(){return N},U:function(){return w},c:function(){return g}});var r,a,s=i(66529),n=i(53061),o=i(14941),l=i(86816),c=i(6691);let h=()=>`${(0,s.OB)().replace("withpaper.com","embedded-wallet.thirdweb.com")}`,d=e=>`thirdwebEwsWalletUserId-${e}`,u=e=>`walletToken-${e}`,p=(e,t)=>`a-${e}-${t}`,g=((r={}).COGNITO="Cognito",r.GOOGLE="Google",r.EMAIL_OTP="EmailOtp",r.CUSTOM_JWT="CustomJWT",r.FACEBOOK="Facebook",r.APPLE="Apple",r),w=((a={}).LOGGED_OUT="Logged Out",a.LOGGED_IN_WALLET_UNINITIALIZED="Logged In, Wallet Uninitialized",a.LOGGED_IN_NEW_DEVICE="Logged In, New Device",a.LOGGED_IN_WALLET_INITIALIZED="Logged In, Wallet Initialized",a),m=new Map;class I{constructor(e){let{clientId:t}=e;this.isSupported=!!window.localStorage,this.clientId=t}async getItem(e){return this.isSupported?window.localStorage.getItem(e):m.get(e)??null}async setItem(e,t){if(this.isSupported)return window.localStorage.setItem(e,t);m.set(e,t)}async removeItem(e){let t=await this.getItem(e);return!!this.isSupported&&!!t&&(window.localStorage.removeItem(e),!0)}async saveAuthCookie(e){await this.setItem(u(this.clientId),e)}async getAuthCookie(){return this.getItem(u(this.clientId))}async removeAuthCookie(){return this.removeItem(u(this.clientId))}async saveDeviceShare(e,t){await this.saveWalletUserId(t),await this.setItem(p(this.clientId,t),e)}async getDeviceShare(){let e=await this.getWalletUserId();return e?this.getItem(p(this.clientId,e)):null}async removeDeviceShare(){let e=await this.getWalletUserId();return!!e&&this.removeItem(p(this.clientId,e))}async getWalletUserId(){return this.getItem(d(this.clientId))}async saveWalletUserId(e){await this.setItem(d(this.clientId),e)}async removeWalletUserId(){return this.removeItem(d(this.clientId))}}function L(e){return new Promise(t=>{setTimeout(t,1e3*e)})}let E={height:"100%",width:"100%",border:"none",backgroundColor:"transparent",colorScheme:"light",position:"fixed",top:"0px",right:"0px",zIndex:"2147483646",display:"none"},y=new Map;class v{constructor(e){let{link:t,iframeId:i,container:r=document.body,iframeStyles:a,onIframeInitialize:s}=e;(0,n._)(this,"POLLING_INTERVAL_SECONDS",1.4),this.iframeBaseUrl=h();let o=document.getElementById(i),l=new URL(t),c="2.1.9";if(l.searchParams.set("sdkVersion",c),!o||o.src!==l.href){if(!o){o=document.createElement("iframe");let e={...E,...a};Object.assign(o.style,e),o.setAttribute("id",i),o.setAttribute("fetchpriority","high"),r.appendChild(o)}o.src=l.href,o.setAttribute("data-version",c);let e=t=>{if("ewsIframeLoaded"===t.data.eventType){if(window.removeEventListener("message",e),!o){console.warn("thirdweb Iframe not found");return}this.onIframeLoadHandler(o,s)()}};window.addEventListener("message",e)}this.iframe=o}async onIframeLoadedInitVariables(){return{}}onIframeLoadHandler(e,t){return async()=>{let i=new Promise(async(i,r)=>{let a=new MessageChannel;a.port1.onmessage=s=>{let{data:n}=s;return(a.port1.close(),n.success)?(y.set(e.src,!0),t&&t(),i(!0)):r(Error(n.error))},e?.contentWindow?.postMessage({eventType:"initIframe",data:await this.onIframeLoadedInitVariables()},this.iframeBaseUrl,[a.port2])});await i}}async call(e){let{procedureName:t,params:i,showIframe:r=!1}=e;for(;!y.get(this.iframe.src);)await L(this.POLLING_INTERVAL_SECONDS);r&&(this.iframe.style.display="block",await L(.005));let a=new Promise((e,a)=>{let s=new MessageChannel;s.port1.onmessage=async t=>{let{data:i}=t;s.port1.close(),r&&(await L(.1),this.iframe.style.display="none"),i.success?e(i.data):a(Error(i.error))},this.iframe.contentWindow?.postMessage({eventType:t,data:i},this.iframeBaseUrl,[s.port2])});return a}destroy(){y.delete(this.iframe.src)}}class f extends v{constructor(e){let{clientId:t,customizationOptions:i}=e;super({iframeId:O,link:function(e){let{clientId:t,path:i,queryParams:r}=e,a=new URL(`${i}`,h());if(r)for(let e of Object.keys(r))a.searchParams.set(e,r[e]?.toString()||"");return a.searchParams.set("clientId",t),a}({clientId:t,path:"/sdk/2022-08-12/embedded-wallet",queryParams:i}).href,container:document.body}),this.clientId=t}async onIframeLoadedInitVariables(){let e=new I({clientId:this.clientId});return{authCookie:await e.getAuthCookie(),deviceShareStored:await e.getDeviceShare(),walletUserId:await e.getWalletUserId(),clientId:this.clientId}}}let O="thirdweb-embedded-wallet-iframe";class _{constructor(e){let{querier:t,preLogin:i,postLogin:r,clientId:a}=e;this.LoginQuerier=t,this.preLogin=i,this.postLogin=r,this.clientId=a}async sendEmailLoginOtp(e){let{email:t}=e;await this.preLogin();let i=await this.LoginQuerier.call({procedureName:"sendThirdwebEmailLoginOtp",params:{email:t}});return i}}class S extends _{constructor(){super(...arguments),(0,n._)(this,"closeWindow",e=>{let{isWindowOpenedByFn:t,win:i,closeOpenedWindow:r}=e;t?i?.close():i&&r?r(i):i&&i.close()})}async getOauthLoginUrl(e){let t=await this.LoginQuerier.call({procedureName:"getHeadlessOauthLoginLink",params:{authProvider:e}});return t}async loginWithModal(){await this.preLogin();let e=await this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:void 0,showIframe:!0});return this.postLogin(e)}async loginWithEmailOtp(e){let{email:t}=e;await this.preLogin();let i=await this.LoginQuerier.call({procedureName:"loginWithThirdwebModal",params:{email:t},showIframe:!0});return this.postLogin(i)}getOauthPopUpSizing(e){return e===g.FACEBOOK?"width=715, height=555":"width=350, height=500"}async loginWithOauth(e){let t=e?.openedWindow,i=!1;if(t||(t=window.open("","Login",this.getOauthPopUpSizing(e.oauthProvider)),i=!0),!t)throw Error("Something went wrong opening pop-up");let[{loginLink:r}]=await Promise.all([this.getOauthLoginUrl(e.oauthProvider),this.preLogin()]);t.location.href=r;let a=await new Promise((r,a)=>{let s=window.setInterval(async()=>{t&&t.closed&&(clearInterval(s),window.removeEventListener("message",n),a(Error("User closed login window")))},1e3),n=async o=>{if(o.origin===h()){if("object"!=typeof o.data){a(Error("Invalid event data"));return}switch(o.data.eventType){case"userLoginSuccess":window.removeEventListener("message",n),clearInterval(s),this.closeWindow({isWindowOpenedByFn:i,win:t,closeOpenedWindow:e?.closeOpenedWindow}),o.data.authResult&&r(o.data.authResult);break;case"userLoginFailed":window.removeEventListener("message",n),clearInterval(s),this.closeWindow({isWindowOpenedByFn:i,win:t,closeOpenedWindow:e?.closeOpenedWindow}),a(Error(o.data.error));break;case"injectDeveloperClientId":t?.postMessage({eventType:"injectDeveloperClientIdResult",developerClientId:this.clientId,authOption:e.oauthProvider},h())}}};window.addEventListener("message",n)});return this.postLogin({storedToken:{...a.storedToken,shouldStoreCookieString:!0},walletDetails:{...a.walletDetails,isIframeStorageEnabled:!1}})}async loginWithCustomJwt(e){let{encryptionKey:t,jwt:i}=e,r=await this.LoginQuerier.call({procedureName:"loginWithCustomJwt",params:{encryptionKey:t,jwt:i}});return this.postLogin(r)}async verifyEmailLoginOtp(e){let{email:t,otp:i,recoveryCode:r}=e,a=await this.LoginQuerier.call({procedureName:"verifyThirdwebEmailLoginOtp",params:{email:t,otp:i,recoveryCode:r}});return this.postLogin(a)}}class b{constructor(e){let{clientId:t,querier:i,onAuthSuccess:r}=e;this.clientId=t,this.AuthQuerier=i,this.localStorage=new I({clientId:t}),this.onAuthSuccess=r,this.BaseLogin=new S({postLogin:async e=>this.postLogin(e),preLogin:async()=>{await this.preLogin()},querier:i,clientId:t})}async preLogin(){await this.logout()}async postLogin(e){let{storedToken:t,walletDetails:i}=e;t.shouldStoreCookieString&&await this.localStorage.saveAuthCookie(t.cookieString);let r=await this.onAuthSuccess({storedToken:t,walletDetails:i});return r}async loginWithModal(){return await this.preLogin(),this.BaseLogin.loginWithModal()}async loginWithEmailOtp(e){return this.BaseLogin.loginWithEmailOtp(e)}async loginWithCustomJwt(e){return this.BaseLogin.loginWithCustomJwt(e)}async loginWithOauth(e){return this.BaseLogin.loginWithOauth(e)}async sendEmailLoginOtp(e){let{email:t}=e;return this.BaseLogin.sendEmailLoginOtp({email:t})}async verifyEmailLoginOtp(e){return this.BaseLogin.verifyEmailLoginOtp(e)}async logout(){let{success:e}=await this.AuthQuerier.call({procedureName:"logout",params:void 0}),t=await this.localStorage.removeAuthCookie(),i=await this.localStorage.removeWalletUserId();return{success:e||t||i}}}class A extends o.Signer{constructor(e){let{provider:t,clientId:i,querier:r}=e;super(),(0,n._)(this,"DEFAULT_ETHEREUM_CHAIN_ID",5),this.clientId=i,this.querier=r,this.endpoint=t.connection?.url,(0,c.defineReadOnly)(this,"provider",t)}async getAddress(){let{address:e}=await this.querier.call({procedureName:"getAddress",params:void 0});return e}async signMessage(e){let{signedMessage:t}=await this.querier.call({procedureName:"signMessage",params:{message:e,chainId:(await this.provider?.getNetwork())?.chainId??this.DEFAULT_ETHEREUM_CHAIN_ID,rpcEndpoint:this.endpoint}});return t}async signTransaction(e){let{signedTransaction:t}=await this.querier.call({procedureName:"signTransaction",params:{transaction:e,chainId:(await this.provider?.getNetwork())?.chainId??this.DEFAULT_ETHEREUM_CHAIN_ID,rpcEndpoint:this.endpoint}});return t}async _signTypedData(e,t,i){let{signedTypedData:r}=await this.querier.call({procedureName:"signTypedDataV4",params:{domain:e,types:t,message:i,chainId:(await this.provider?.getNetwork())?.chainId??this.DEFAULT_ETHEREUM_CHAIN_ID,rpcEndpoint:this.endpoint}});return r}connect(e){return new A({clientId:this.clientId,provider:e,querier:this.querier})}}class T{constructor(e){let{clientId:t,chain:i,querier:r}=e;this.clientId=t,this.chain=i,this.walletManagerQuerier=r,this.localStorage=new I({clientId:t})}async postWalletSetUp(e){let{deviceShareStored:t,walletAddress:i,isIframeStorageEnabled:r,walletUserId:a}=e;return r||await this.localStorage.saveDeviceShare(t,a),{walletAddress:i}}async getUserWalletStatus(){let e=await this.walletManagerQuerier.call({procedureName:"getUserStatus",params:void 0});return e.status===w.LOGGED_IN_WALLET_INITIALIZED?{status:w.LOGGED_IN_WALLET_INITIALIZED,...e.user,wallet:this}:e.status===w.LOGGED_IN_NEW_DEVICE?{status:w.LOGGED_IN_WALLET_UNINITIALIZED,...e.user}:e.status===w.LOGGED_IN_WALLET_UNINITIALIZED?{status:w.LOGGED_IN_WALLET_UNINITIALIZED,...e.user}:{status:e.status}}async setChain(e){let{chain:t}=e;this.chain=t}async getEthersJsSigner(e){let t=new A({clientId:this.clientId,provider:(0,l.getDefaultProvider)(e?.rpcEndpoint??s.g1[this.chain]),querier:this.walletManagerQuerier});return t}}class N{isClientIdLegacyPaper(e){return e.indexOf("-")>0&&36===e.length}constructor(e){let{clientId:t,chain:i,styles:r,onAuthSuccess:a}=e;if(this.isClientIdLegacyPaper(t))throw Error("You are using a legacy clientId. Please use the clientId found on the thirdweb dashboard settings page");this.clientId=t,this.querier=new f({clientId:t,customizationOptions:r}),this.wallet=new T({clientId:t,chain:i,querier:this.querier}),this.auth=new b({clientId:t,querier:this.querier,onAuthSuccess:async e=>(a?.(e),await this.wallet.postWalletSetUp({...e.walletDetails,walletUserId:e.storedToken.authDetails.userWalletId}),await this.querier.call({procedureName:"initIframe",params:{deviceShareStored:e.walletDetails.deviceShareStored,clientId:this.clientId,walletUserId:e.storedToken.authDetails.userWalletId,authCookie:e.storedToken.cookieString}}),{user:{status:w.LOGGED_IN_WALLET_INITIALIZED,authDetails:e.storedToken.authDetails,wallet:this.wallet,walletAddress:e.walletDetails.walletAddress}})})}async getUser(){return this.wallet.getUserWalletStatus()}}},66529:function(e,t,i){i.d(t,{OB:function(){return n},g1:function(){return r}});var r={Ethereum:"https://ethereum.rpc.thirdweb.com",Goerli:"https://goerli.rpc.thirdweb.com",Mumbai:"https://mumbai.rpc.thirdweb.com",Polygon:"https://polygon.rpc.thirdweb.com",Avalanche:"https://avalanche.rpc.thirdweb.com",Optimism:"https://optimism.rpc.thirdweb.com",OptimismGoerli:"https://optimism-goerli.rpc.thirdweb.com",BSC:"https://binance.rpc.thirdweb.com",BSCTestnet:"https://binance-testnet.rpc.thirdweb.com",ArbitrumOne:"https://arbitrum.rpc.thirdweb.com",ArbitrumGoerli:"https://arbitrum-goerli.rpc.thirdweb.com",Fantom:"https://fantom.rpc.thirdweb.com",FantomTestnet:"https://fantom-testnet.rpc.thirdweb.com",Sepolia:"https://sepolia.rpc.thirdweb.com",AvalancheFuji:"https://avalanche-fuji.rpc.thirdweb.com"},a=()=>"undefined"!=typeof window&&"true"===window.localStorage.getItem("IS_PAPER_DEV"),s=()=>"undefined"!=typeof window&&window.location.origin.includes("paper.xyz"),n=()=>{var e;return a()?null!=(e=window.localStorage.getItem("PAPER_DEV_URL"))?e:"http://localhost:3000":s()?window.location.origin:"https://withpaper.com"}}}]);