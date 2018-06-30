export FORCE_COLOR = true

ci: commitlint-ci lint type test
commitmsg: commitlint
prepublish: build
precommit: lint-staged type test documentation

commitlint:
	yarn commitlint \
		--edit ${GIT_PARAMS}
commitlint-ci:
	yarn commitlint \
		--from="${TRAVIS_BRANCH}" \
		--to="${TRAVIS_COMMIT}"
	yarn commitlint \
		--from=${TRAVIS_COMMIT}
build:
	yarn babel \
		src \
		--out-dir lib
	yarn --silent flow gen-flow-files \
	  ./src/index.js > ./lib/index.js.flow
documentation:
	yarn emdaer
	git add *.md
	git add docs
lint:
	yarn eslint \
		.	\
		--ext .js
lint-staged:
	yarn lint-staged
release:
	yarn semantic-release
test:
	yarn jest
type:
	yarn flow status
