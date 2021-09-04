# dedupe

Literally a duplicate checker.

It checks the current working directory for duplicate files. It doesn't recurse into subdirectories (yet).

## Prerequisites

This project requires [NodeJS](https://nodejs.org/) (version 14 or later) and [NPM](https://npmjs.org/).
To make sure you have them available on your machine,
try running the following command:

```sh
$ npm -v && node -v
6.14.13
v14.16.0
```

## Clone the Repo

```sh
$ cd path/to/parent
$ git clone https://github.com/AverageHelper/dedupe.git
$ cd dedupe
```

## Table of contents

- [dedupe](#dedupe)
  - [Prerequisites](#prerequisites)
  - [Clone the Repo](#clone-the-repo)
  - [Table of contents](#table-of-contents)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Authors](#authors)
  - [License](#license)

## Usage

```sh
$ npm ci                # Install dependencies
$ cd /path/to/folder    # Go to the folder you wanna check
$ node /path/to/dedupe  # Run dedupe
```

## Contributing

We welcome contributions of all sorts!

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## License

[GNU General Public License v3.0](LICENSE)

This is just a simple project I built to help me check a folder for duplicates one time. Do with it what you want.
