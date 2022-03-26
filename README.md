# monorepo-starter



#### Creating a New Package
To create a new package in the monorepo, there are a couple of steps that you have to follow.
1. Create a new directory in the monorepo root directory.
2. Add a package.json file, with a name for the package.
3. Add the package to the root package.json
4. Add the package to the root tsconfig.json

To add your new package as a dep for another package:
1. Run `yarn workspace @main/other-package add @main/my-new-package` to add the new package as a dep
2. Add the package to the other package's tsconfig.json
