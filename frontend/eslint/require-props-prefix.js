// eslint-rules/require-props-prefix-in-template.js

export default {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Require props.<name> when using props in Vue components',
    },
    schema: [],
    messages: {
      missingPrefix: 'Use props.{{name}} instead of {{name}}.',
    },
  },

  create(context) {
    const propNames = new Set();
    let propsVariableName = null;

    function collectDefineProps(node) {
      if (
        node.id?.type !== 'Identifier' ||
        node.init?.type !== 'CallExpression' ||
        node.init.callee?.type !== 'Identifier' ||
        node.init.callee.name !== 'defineProps'
      ) {
        return;
      }

      propsVariableName = node.id.name;

      const arg = node.init.arguments?.[0];

      if (arg?.type === 'ObjectExpression') {
        for (const prop of arg.properties) {
          const key = prop.key;

          if (key?.type === 'Identifier') {
            propNames.add(key.name);
          }

          if (key?.type === 'Literal') {
            propNames.add(String(key.value));
          }
        }
      }
    }

    function isPropsObjectItself(node) {
      return node.name === propsVariableName;
    }

    function isAlreadyPropsAccess(node) {
      return (
        node.parent?.type === 'MemberExpression' &&
        node.parent.property === node &&
        node.parent.object?.type === 'Identifier' &&
        node.parent.object.name === propsVariableName
      );
    }

    function isMemberProperty(node) {
      return (
        node.parent?.type === 'MemberExpression' &&
        node.parent.property === node &&
        !node.parent.computed
      );
    }

    function isObjectKey(node) {
      return (
        node.parent?.type === 'Property' &&
        node.parent.key === node &&
        !node.parent.computed
      );
    }

    function isFunctionParameter(node) {
      let current = node;

      while (current.parent) {
        const parent = current.parent;

        if (
          parent.type === 'FunctionDeclaration' ||
          parent.type === 'FunctionExpression' ||
          parent.type === 'ArrowFunctionExpression'
        ) {
          return parent.params.includes(current);
        }

        current = parent;
      }

      return false;
    }

    function isPropertyValueInsideDefineProps(node) {
      let current = node.parent;

      while (current) {
        if (
          current.type === 'CallExpression' &&
          current.callee?.type === 'Identifier' &&
          current.callee.name === 'defineProps'
        ) {
          return true;
        }

        current = current.parent;
      }

      return false;
    }

    function isDeclarationIdentifier(node) {
      return (
        node.parent?.type === 'VariableDeclarator' &&
        node.parent.id === node
      );
    }

    function checkIdentifier(node) {
      if (!propsVariableName) return;
      if (!propNames.has(node.name)) return;

      if (isPropsObjectItself(node)) return;
      if (isAlreadyPropsAccess(node)) return;
      if (isMemberProperty(node)) return;
      if (isObjectKey(node)) return;
      if (isDeclarationIdentifier(node)) return;
      if (isPropertyValueInsideDefineProps(node)) return;
      if (isFunctionParameter(node)) return;

      context.report({
        node,
        messageId: 'missingPrefix',
        data: { name: node.name },
        fix(fixer) {
          return fixer.insertTextBefore(node, `${propsVariableName}.`);
        },
      });
    }

    const scriptVisitor = {
      VariableDeclarator: collectDefineProps,
      Identifier: checkIdentifier,
    };

    const templateVisitor = {
      Identifier: checkIdentifier,
    };

    if (context.parserServices?.defineTemplateBodyVisitor) {
      return context.parserServices.defineTemplateBodyVisitor(
        templateVisitor,
        scriptVisitor
      );
    }

    return scriptVisitor;
  },
};