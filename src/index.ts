import h from 'solid-js/h';
import {Component} from 'solid-js';

const SOLIDJSTAG = '_web.spread';

const stw = (base: string | Component<any>) => {
  return (classesTemplateLiteral: TemplateStringsArray) => {
    const tailwindClasses = getClassesFromLiteral(classesTemplateLiteral.raw[0]);
    const tailwindClassesInjection = {
      'class': tailwindClasses,
      'className': tailwindClasses,
    }
    if(typeof base === 'function') {
      const functionSourceCode = base.toString();
      if (functionSourceCode.includes(SOLIDJSTAG)) {
        return (props: object) => h(
          h(base)().tagName.toLowerCase(),
          {...tailwindClassesInjection, ...props}
        );
      }
      return (props: object) => {
        return h(base, {...tailwindClassesInjection, ...props});
      };
    }
    return (props: object) => h(base, {...tailwindClassesInjection, ...props});
  };
};

const getClassesFromLiteral = (literal: string) => {
  return literal.split('\n').map((key: string) => {
    return key.trim().replace(/^\s+|\s+$/gm, '');
  }).filter(Boolean).join(' ');
};

export default stw;
