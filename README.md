# MJML Email Template Generator

This email template generation tool uses [mjml][], a framework for creating responsive emails that are widely supported by email clients.

## Getting started

Install the required dependencies using [Yarn][].

```shell
yarn
```

Start developing and watch for changes.

```shell
yarn dev
```

### Lint

Lint your code.

```shell
yarn lint
```

## Production email templates

For production builds compile minified email templates.

```shell
yarn build
```

## Creating a new template

Add your new `.mjml` email template to the `./src/templates/` directory. Compiled templates can be found as an `.html` file in the `./dist/` directory.

## Creating custom components

Custom components can be added to the `./src/components/` directory. Any new custom components will also need to be added to the `./.mjmlconfig` file. Use the `./dist` path.

### Examples

3 examples can be found in */components*. Each of them introduce new features, so they should be checked in this order: MjBasicComponent, MjImageText, MjLayout.

For more complex examples, have a look at standard MJML components code such as [mj-carousel](https://github.com/mjmlio/mjml/tree/master/packages/mjml-accordion).

A step-by-step tutorial is available [here](https://medium.com/mjml-making-responsive-email-easy/tutorial-creating-your-own-component-with-mjml-4-1c0e84e97b36).

[mjml]: https://mjml.io/
[Yarn]: ps://yarnpkg.com
