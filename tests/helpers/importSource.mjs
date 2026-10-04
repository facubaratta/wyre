import { readFile } from 'node:fs/promises';
import ts from 'typescript';

// Compile the real pure modules in memory; no test framework or generated files.
export const modules = new Map();
export async function importSource(relativePath) {
  const path = new URL(relativePath, new URL('../', import.meta.url));
  const load = async (url) => {
    if (modules.has(url.href)) return modules.get(url.href);
    const source = await readFile(url, 'utf8');
    let code = ts.transpileModule(source, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
    }).outputText;
    for (const match of [...code.matchAll(/from ['"](\.[^'"]+)['"]/g)]) {
      const dependency = new URL(`${match[1]}.ts`, url);
      code = code.replace(match[0], `from '${await load(dependency)}'`);
    }
    const compiled = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
    modules.set(url.href, compiled);
    return compiled;
  };
  return import(await load(path));
}
