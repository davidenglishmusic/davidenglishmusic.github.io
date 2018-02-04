lessc --clean-css assets/stylesheets/index.less assets/stylesheets/index.min.css
lessc --clean-css assets/stylesheets/reading_list.less assets/stylesheets/reading_list.min.css
lessc --clean-css assets/stylesheets/shared.less assets/stylesheets/shared.min.css
lessc --clean-css assets/stylesheets/side_projects.less assets/stylesheets/side_projects.min.css
npx babel assets/javascripts/reading_list.js --out-file assets/javascripts/reading_list.min.js --minified --presets=env
