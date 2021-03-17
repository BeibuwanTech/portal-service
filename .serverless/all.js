const { BootstrapStarter } = require('@midwayjs/bootstrap');
const { Framework } = require('@midwayjs/faas');
const { asyncWrapper, start } = require('@midwayjs/serverless-fc-starter');
const { match } = require('path-to-regexp');
const layers = [];


let starter;
let runtime;
let inited = false;

const initializeMethod = async (initializeContext = {}) => {
  layers.unshift(engine => {
    engine.addRuntimeExtension({
      async beforeFunctionStart(runtime) {
        starter = new Framework();
        starter.configure({
          initializeContext,
          preloadModules: [],
          applicationAdapter: runtime
        });
        const boot = new BootstrapStarter();
        boot.configure({
          appDir: __dirname,
        }).load(starter);

        await boot.init();
        await boot.run();
      }
    });
  })
  runtime = await start({
    layers: layers,
    initContext: initializeContext,
    runtimeConfig: {"service":{"name":"beibuwan-portal-service"},"provider":{"name":"aliyun","runtime":"nodejs12"},"aggregation":{"all":{"functionsPattern":"*","handler":"all.handler","_isAggregation":true,"events":[{"http":{"method":"any","path":"/*"}}],"_handlers":[{"handler":"apiService.get","events":{"http":{"method":["get"],"path":"/standard"}},"path":"/standard"},{"handler":"apiService.service","events":{"http":{"method":["get"],"path":"/service/:type"}},"path":"/service/:type"},{"handler":"apiService.ad","events":{"http":{"method":["get"],"path":"/ad/:type"}},"path":"/ad/:type"}],"_allAggred":[{"path":"/standard","method":["get"]},{"path":"/service/:type","method":["get"]},{"path":"/ad/:type","method":["get"]}]}},"functions":{"all":{"functionsPattern":"*","handler":"all.handler","_isAggregation":true,"events":[{"http":{"method":"any","path":"/*"}}],"_handlers":[{"handler":"apiService.get","events":{"http":{"method":["get"],"path":"/standard"}},"path":"/standard"},{"handler":"apiService.service","events":{"http":{"method":["get"],"path":"/service/:type"}},"path":"/service/:type"},{"handler":"apiService.ad","events":{"http":{"method":["get"],"path":"/ad/:type"}},"path":"/ad/:type"}],"_allAggred":[{"path":"/standard","method":["get"]},{"path":"/service/:type","method":["get"]},{"path":"/ad/:type","method":["get"]}]}},"globalDependencies":{"@midwayjs/serverless-fc-starter":"*"}},
  });

  inited = true;
};

const getHandler = (hanlderName, ...originArgs) => {
  
    if (hanlderName === 'handler') {
      return  async (ctx) => {
        const allHandlers = [
  {
    "handler": "apiService.service",
    "router": "/service/:type",
    "pureRouter": "/service/:type",
    "regRouter": "/service/:type",
    "level": 2
  },
  {
    "handler": "apiService.ad",
    "router": "/ad/:type",
    "pureRouter": "/ad/:type",
    "regRouter": "/ad/:type",
    "level": 2
  },
  {
    "handler": "apiService.get",
    "router": "/standard",
    "pureRouter": "/standard",
    "regRouter": "/standard",
    "level": 1
  }
];
        let handler = null;
        let ctxPath = ctx && ctx.path || '';
        let matchRes;
        if (ctxPath) {
          handler = allHandlers.find(handler => {
            matchRes = match(handler.regRouter)(ctxPath);
            return matchRes;
          });
        }

        if (handler) {
          if (matchRes && matchRes.params) {
            const req = originArgs && originArgs[0];
            if (req) {
              req.pathParameters = Object.assign({}, matchRes.params, req.pathParameters);
            }
          }
          return starter.handleInvokeWrapper(handler.handler)(ctx);
        }
        ctx.status = 404;
        ctx.set('Content-Type', 'text/html');
        return '<h1>404 Page Not Found</h1>';
      }; 
    }
  
}

exports.initializer = asyncWrapper(async (...args) => {
  if (!inited) {
    await initializeMethod(...args);
  }
});


exports.handler = asyncWrapper(async (...args) => {
  if (!inited) {
    await initializeMethod();
  }

  const handler = getHandler('handler', ...args);
  return runtime.asyncEvent(handler)(...args);
});

