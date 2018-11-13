'use strict';

module.exports = class HtmlbarsPlugin {
  transform(ast) {
    this.syntax.traverse(ast, {
      MustacheStatement: this.transformStatementOrExpression.bind(this),
      BlockStatement: this.transformStatementOrExpression.bind(this),
      SubExpression: this.transformStatementOrExpression.bind(this),
    });

    return ast;
  }

  transformStatementOrExpression(node) {
    if (node.path.original === 'jss') {
      this.transformJSSHelperInvocation(node);
    }
  }

  transformJSSHelperInvocation(node) {
    const existingPair = node.hash.pairs.find(item => item.key === 'classes');

    if (existingPair) {
      return;
    }

    const pair = this.syntax.builders.pair(
      'classes',
      this.createPathExpression(),
    );

    node.hash.pairs.push(pair);
  }

  createPathExpression() {
    const classesPath = this.syntax.builders.path('classes');
    return this.syntax.builders.path(classesPath);
  }
};
