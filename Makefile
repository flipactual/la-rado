export FORCE_COLOR = true

ci: commitlint-ci lint type test
commitmsg: commitlint
prepublish: build
precommit: lint-staged type test documentation

commitlint:
	yarn commitlint \
		--config config/commitlint.config.js \
		--edit ${GIT_PARAMS}
commitlint-ci:
	yarn commitlint \
		--config config/commitlint.config.js \
		--from="${TRAVIS_BRANCH}" \
		--to="${TRAVIS_COMMIT}"
	yarn commitlint \
		--config config/commitlint.config.js \
		--from=${TRAVIS_COMMIT}
build:
	yarn babel \
		--config-file ./config/.babelrc.js \
		src \
		--out-dir lib
documentation:
	yarn emdaer
	git add *.md
	yarn documentation build src/** -f html -o docs 
	git add docs
lint:
	yarn eslint \
		--config config/.eslintrc.js \
		--ignore-path config/.eslintignore \
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
