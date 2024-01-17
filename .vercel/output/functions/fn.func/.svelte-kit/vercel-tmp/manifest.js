export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["fail-svgrepo-com.svg","favicon.png","heart-alt-svgrepo-com.svg","note-medical-svgrepo-com.svg","pass-svgrepo-com.svg","spark-svgrepo-com.svg","trash-blank-svgrepo-com.svg","trash-can-svgrepo-com.svg","trash-can-with-cover-svgrepo-com.svg"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.8eMaMy2Q.js","app":"_app/immutable/entry/app.R0YyE6tn.js","imports":["_app/immutable/entry/start.8eMaMy2Q.js","_app/immutable/chunks/scheduler.ZIB-3X42.js","_app/immutable/chunks/singletons.wgnWz9mo.js","_app/immutable/chunks/index.-YLKjFAA.js","_app/immutable/entry/app.R0YyE6tn.js","_app/immutable/chunks/scheduler.ZIB-3X42.js","_app/immutable/chunks/index.M2rPet9x.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/characterCreation",
				pattern: /^\/characterCreation\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
