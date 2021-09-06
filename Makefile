build-reset-only:
	npx sass scripts/reset-only.scss dist/reset-only.css
	npx sass scripts/reset-only.scss dist/reset-only.min.css --style=compressed

build-duomo:
	npx sass scripts/duomo.scss dist/duomo.css
	npx sass scripts/duomo.scss dist/duomo.min.css --style=compressed

build-duomo-root-only:
	npx sass scripts/duomo-root-only.scss dist/duomo-root-only.css
	npx sass scripts/duomo-root-only.scss dist/duomo-root-only.min.css --style=compressed

build-all:
	rm -rf dist
	make -j3 \
		build-reset-only \
		build-duomo \
		build-duomo-root-only
	node scripts/generate-stats.js
