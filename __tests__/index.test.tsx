/* eslint-disable require-jsdoc */
import {Component} from 'solid-js';
import {BiCompass} from 'solid-icons/bi';

import {render} from 'solid-testing-library';

import stw from '../src/index';

async function getElementWithIdAfterRender(renderFunction: Function, id: string) {
  await renderFunction();
  console.info(document.body.innerHTML);
  return document.getElementById(id);
}

async function styleAndContentsCheck(renderFunction: Function, id: string) {
  const spawnedElement = await getElementWithIdAfterRender(renderFunction, id);
  const appliedClasses = [...spawnedElement.classList.values()];
  expect(appliedClasses).toContain('h-10');
  expect(appliedClasses).toContain('w-8');
  const areChildrenAppended = spawnedElement.hasChildNodes();
  expect(areChildrenAppended).toBeTruthy();
}

test('Styling semantic HTML element', () => {
  const StyledDiv = stw('div')`
        h-10
        w-8
    `;

  const testElementId = 'test_div';

  return styleAndContentsCheck(() => {
    render(
        <StyledDiv id={testElementId}>
                Test content
        </StyledDiv>,
    );
  }, testElementId);
});

test('Styling SolidJS component', () => {
  const UnstyledSolidJSComponent: Component<string> = (title: string, ...props) => {
    // @ts-ignore
    return <h1 {...props}>{title}</h1>;
  };

  const StyledSolidJSComponent = stw(UnstyledSolidJSComponent)`
        h-10
        w-8
    `;

  const testElementId = 'test_div';

  return styleAndContentsCheck(() => {
    render(
        <StyledSolidJSComponent id={testElementId}>
                Test content
        </StyledSolidJSComponent>,
    );
  }, testElementId);
});

test('Styling external library component', () => {
  const StyledIcon = stw(BiCompass)`
        h-10
        w-8
    `;

  const testElementId = 'test_div';

  return styleAndContentsCheck(() => {
    render(<StyledIcon id={testElementId}/>);
  }, testElementId);
});
