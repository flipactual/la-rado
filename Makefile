export FORCE_COLOR = true

ci: commitlint-ci lint type test
commitmsg: commitlint
prepublish: compile
precommit: lint-staged type test documentation

commitlint:
	yarn commitlint -e ${GIT_PARAMS}
commitlint-ci:
	yarn commitlint --from="${TRAVIS_BRANCH}" --to="${TRAVIS_COMMIT}"
	yarn commitlint --from=${TRAVIS_COMMIT}
compile:
	yarn flow-remove-types -p src -i .test.js -d lib
documentation:
	yarn documentation build src/** -f html -o docs 
	git add docs
lint:
	yarn eslint .
lint-staged:
	yarn lint-staged
test:
	yarn jest
type:
	yarn flow status
