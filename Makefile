export FORCE_COLOR = true

ci: commitlint-ci lint type test
commitmsg: commitlint
prepublish: build
precommit: lint-staged type test documentation

commitlint:
	yarn commitlint -e ${GIT_PARAMS}
commitlint-ci:
	yarn commitlint --from="${TRAVIS_BRANCH}" --to="${TRAVIS_COMMIT}"
	yarn commitlint --from=${TRAVIS_COMMIT}
build:
	yarn babel src -d lib
documentation:
	yarn emdaer
	git add *.md
	yarn documentation build src/** -f html -o docs 
	git add docs
lint:
	yarn eslint .
lint-staged:
	yarn lint-staged
release:
	yarn semantic-release
test:
	yarn jest
type:
	yarn flow status
