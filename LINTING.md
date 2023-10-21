# Linting and Formatting

## Requirements

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) `dbaeumer.vscode-eslint`

  - Eslint must be installed as an extension for local linting to work within VS Code on save.
  - Eslint is installed in app dependencies. If not using VS Code, linting the project may be done by calling:

    ```sh
    yarn lint
    ```

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) `esbenp.prettier-vscode`

  - Prettier must be installed as an extension for local formatting to work within VS Code on save.
  - Prettier is installed in app dependencies. If not using VS Code, formatting the project may be done by calling:

    ```sh
    yarn format
    ```

## Configuration

Eslint uses [`./.eslintrc.js`](./.eslintrc.js) and [`./.eslintignore`](./.eslintignore) for configuration.

Prettier uses [`./.prettierrc.js`](./.prettierrc.js) and [`./.prettierignore`](./.prettierignore) for configuration.
