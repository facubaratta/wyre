import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

test('every runtime source module is reachable from the application entry point', async () => {
  const { readdir } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const { join } = await import('node:path');
  const root = fileURLToPath(new URL('../src/', import.meta.url));
  const files = [];
  const collect = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await collect(path);
      else if (/\.tsx?$/.test(path) && !path.endsWith('.d.ts'))
        files.push(path);
    }
  };
  await collect(root);
  const reached = new Set();
  const visit = async (path) => {
    if (reached.has(path)) return;
    reached.add(path);
    const source = ts.createSourceFile(
      path,
      await readFile(path, 'utf8'),
      ts.ScriptTarget.Latest,
    );
    const specifiers = [];
    const collectSpecifiers = (node) => {
      if (
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        node.moduleSpecifier
      )
        specifiers.push(node.moduleSpecifier);
      if (
        ts.isCallExpression(node) &&
        node.expression.kind === ts.SyntaxKind.ImportKeyword
      )
        specifiers.push(node.arguments[0]);
      ts.forEachChild(node, collectSpecifiers);
    };
    collectSpecifiers(source);
    for (const specifier of specifiers) {
      if (
        !specifier ||
        !ts.isStringLiteral(specifier) ||
        !specifier.text.startsWith('.')
      )
        continue;
      const { resolvedModule } = ts.resolveModuleName(
        specifier.text,
        path,
        { moduleResolution: ts.ModuleResolutionKind.Bundler },
        ts.sys,
      );
      if (resolvedModule && files.includes(resolvedModule.resolvedFileName))
        await visit(resolvedModule.resolvedFileName);
    }
  };
  await visit(join(root, 'main.tsx'));
  await visit(join(root, 'entry-server.tsx'));
  assert.deepEqual(
    files.filter((path) => !reached.has(path)),
    [],
  );
});
