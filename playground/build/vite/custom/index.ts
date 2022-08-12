import { projRoot } from "../../paths";
import type { Connect, PluginOption } from "vite";
import fs from "fs";
import { resolve } from "path";

const output = resolve(projRoot, "./config.json");

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

/**
 * @description parse request body to json
 */
export function parseContent(
  content: Record<string, unknown>
): Record<string, unknown> {
  const k = Object.keys(content);
  const res = {};
  k.forEach(item => {
    res[item] = JSON.parse(content[item]);
  });

  return res || {};
}

/**
 * @description content writer into the config.json
 */

export async function io(content: Record<string, unknown>): unknown {
  if (!content || !projRoot) {
    return;
  }
  fs.writeFileSync(output, JSON.stringify(content), "utf-8");
}

export default (): PluginOption => {
  return {
    name: "vite-plugin-template",
    configureServer({ middlewares }) {
      middlewares.use("/sendingSave", async (req: unknown, res: unknown) => {
        const body = await parseBody(req);

        const ctx = parseContent(body);
        await io(ctx);

        res.end(
          JSON.stringify({
            message: "保存成功",
            status: 200,
            data: ctx
          })
        );
      });
    }
  };
};
