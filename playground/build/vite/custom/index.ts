import type { Connect, PluginOption } from "vite";

function safeJsonParse<T extends Record<string | number | symbol, unknown>>(
  jsonStr: string,
  defaultValue: T
) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    return defaultValue;
  }
}

function parseBody(
  req: Connect.IncomingMessage
): Promise<Record<string, unknown>> {
  return new Promise(resolve => {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });
    req.on("end", function () {
      resolve(safeJsonParse(body, {}));
    });
  });
}

export default (): PluginOption => {
  return {
    name: "vite-plugin-template",
    configureServer({ middlewares }) {
      middlewares.use("/sendingSave", async (req: unknown, res: unknown) => {
        // 自定义请求处理...
        // const body = await parseBody(req);
        res.end(
          JSON.stringify({
            message: "保存成功",
            status: 200
          })
        );
      });
    }
  };
};
