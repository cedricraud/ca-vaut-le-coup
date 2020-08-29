install:
	npm install

run:
	npm run dev

run_prod:
	npm run build
	npm run start

package:
	npm run generate

deploy: package
	git add -A .
	git commit -m 'Make package'
	git push
