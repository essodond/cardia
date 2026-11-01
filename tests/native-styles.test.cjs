const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type) visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(item => walk(item, visit));
    else if (value && typeof value === 'object') walk(value, visit);
  }
}

test('UI StyleSheet APIs exist in the installed native React Native version', () => {
  // A web export alone cannot catch APIs that exist on web but were removed on native.
  const root = path.dirname(require.resolve('react-native/package.json'));
  const native = parser.parse(fs.readFileSync(path.join(root, 'Libraries/StyleSheet/StyleSheetExports.js'), 'utf8'), { sourceType: 'module', plugins: ['flow'] });
  const exported = native.program.body.find(n => n.type === 'ExportDefaultDeclaration').declaration;
  const supported = new Set(exported.properties.map(p => p.key.name));
  const nativeFill = native.program.body.find(n => n.type === 'VariableDeclaration' && n.declarations[0].id.name === 'absoluteFill').declarations[0].init;
  assert.ok(supported.has('absoluteFill'));
  assert.equal(nativeFill.properties.find(p => p.key.name === 'position').value.value, 'absolute');
  for (const file of ['App.js', 'src/components.js', 'src/CardCarousel.js', 'src/TogoIdentityCard.js', 'src/NationalDocument.js']) {
    const ast = parser.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
    walk(ast, node => {
      if (node.type === 'MemberExpression' && node.object.name === 'StyleSheet') {
        assert.ok(supported.has(node.property.name), `${file}: StyleSheet.${node.property.name} is unavailable on native`);
      }
    });
  }
});
