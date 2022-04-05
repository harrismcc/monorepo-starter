# monorepo-starter
This repo is a template for creating a yarn + typescript monorepo. The packages can be swapped out easily, so this template is not opinionated about things like frontend frameworks or backend providers. This template is, however, opinionated about some build tools and libraries - these are listed below.


## Included Tools and Libraries
- Typescript
- Yarn v2 - Used for dependency management in the monorepo
- [pre-commit](https://pre-commit.com/) - For running pre-commit checks
- [eslint](https://eslint.org/) - For code linting & formatting
- [prettier](https://prettier.io/) - For code linting & formatting
- [Github Actions](https://github.com/features/actions) - CI/CD for this repo
#### Optional Tools and Libraries
- [Vite](https://vitejs.dev/) - Frontend tooling
- [Express](https://expressjs.com/) - Backend tooling

## Usage
#### Running the monorepo
To run both the frontend and backend, you can simply run `yarn start`. Under the hood, this uses `concurrently` to run as many of the packages as you want in parallel.

#### Creating a New Package
To create a new package in the monorepo, there are a couple of steps that you have to follow.
1. Create a new directory in the monorepo `/packages` directory.
2. Add a package.json file, with a name for the package.

To add your new package as a dep for another package:
1. Run `yarn workspace @main/other-package add @main/my-new-package` to add the new package as a dep
2. In the monorepo root, run `yarn fix-ts-refs` to update the typescript references for the monorepo

#### Adding New CI/CD Tasks
To add a new CI/CD task, you can either add it in `pr.yml` or create a new `.yml` file in the `.github/workflows` directory. There is a handy shortcut for installing yarn deps with a cache, which you will most likely want to use.
```yaml
# Install Yarn Deps
- uses: ./.github/commands/install_yarn_deps
```

#### Pre-Commit Checks
This repo is configured to run some pre-commit checks by defualt. These run every time you commit locally, as well as on pull requests. To create a new pre-commit check, you can add the script to the `/pre_commit_hooks` directory, and then reference in in `.pre-commit-config.yaml`.
