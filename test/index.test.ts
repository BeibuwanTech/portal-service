import { createFunctionApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/serverless-app';

describe('test/index.test.ts', () => {

  it('should get /', async () => {
    // create app
    const app = await createFunctionApp<Framework>();

    // make request
    const res1 = await createHttpRequest(app).get('/ad/top');
    // use expect by jest
    expect(res1.body.result.length).toBe(2);

    const res2 = await createHttpRequest(app).get('/service/recommend');
    expect(res2.body.result.length).toBe(2);

    // close app
    await close(app);
  });
});
