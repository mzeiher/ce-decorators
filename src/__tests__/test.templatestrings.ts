import { StaticTemplateComponent } from './components/StaticTemplateComponent';

export default () => {
  describe('static template test', () => {
    it('render test', async (done) => {
      const element = new StaticTemplateComponent();
      document.body.appendChild(element);
      await element.waitForRender();

      element.icon = 'one';
      await element.waitForRender();

      element.icon = 'two';
      await element.waitForRender();

      document.body.removeChild(element);
      done();
    });
  });
};
