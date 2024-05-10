import "whatwg-fetch";
import { server } from "./libs/global/src";




beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());