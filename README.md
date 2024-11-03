<div align="center" style="background: #6b21a8; padding: 24px; border-radius: 4px">
  <img src="./apps/b4h-next/./public/logo.svg" width="128">
</div>

##

**budget4home** is a comprehensive project designed to help you manage and control your personal budget effectively. With budget4home, you can track your expenses, categorize them, and gain insights into your spending habits. This project aims to provide a user-friendly interface and features to make personal finance management easier and more efficient.

### how to run

- `yarn install`
- `yarn nx dev b4h-next`
- open [localhost](http://localhost:3000/)

### environments

- `production` - https://budget4home.vercel.app
- `developer` - https://b4h-dev.vercel.app
- `localhost` - This configuration uses a pre-defined non-production Firestore setup. To use your own Firestore configuration, replace the Firebase data in the `.env.local` file.

### extra commands

- `yarn lint` - run lint
- `yarn test` - run tests

### libraries

- [@b4h/firebase](./libs/firebase/README.md)
- [@b4h/firebase-admin](./libs/firebase-admin/README.md)
- [@b4h/firestore](./libs/firestore/README.md)
- [@b4h/models](./libs/models/README.md)

### how to create new library

> yarn nx g @nx/js:lib --directory libs/newlib --importPath @b4h/new-lib --bundler vite --linter eslint --unitTestRunner jest
