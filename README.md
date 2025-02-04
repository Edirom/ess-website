[![ESS Logo](https://github.com/Edirom/ess-website/raw/main/assets/img/ViFE-ESS-logo-ohne-Jahr/ViFE-ESS-logo-ohne-Jahr.png)](http://ess.uni-paderborn.de)

# Edirom Summer School Website

Web pages for the [Edirom Summer School] built via [Jekyll].


## Editing pages

The regular website routine involves these issues:

1. Adding news posts: 
   New posts must follow the filename format `YYYY-MM-DD-someName.suffix` 
   and are to be put in the `_posts` folder. The most recent three are 
   displayed on the start page and all are accessible from the "archiv" page.  
2. Adding new programs: 
   Summer School programs for every year are found in the `_archiv` folder, 
   named `programm.html`. It's important that the metadata "title" string 
   contains "Kursprogramm", otherwise the programm will not properly be 
   displayed on the "archiv" page.  
3. Updating the top navigation:
   To have the top navigation point at the right program, please modify the 
   YAML file at `_data/navigation.yml`.


## Building locally

With Node (npm), Ruby, RubyGems and Bundler (`gem install bundler`) 
installed as prerequisites it should be enough to enter
```shell
npm install
bundle install
bundle exec jekyll serve --livereload
```
Now browse to `http://localhost:4000` to see the page live.


## Docker

There's a docker image available at [Docker Hub], based on an Nginx web server. 
Run it with 
```shell
docker run --rm --name ess -p8080:80 edirom/ess-website
```
and point your browser at `http://localhost:8080`.

To build the image on your local machine (before running) use, e.g.,
```shell
docker build -t ess -f Dockerfile.nginx .
```
(.nginx is for building a static page)

## Credits 

Software and Frameworks used:

* Static site generator [Jekyll]
* CSS Framework by [Bootstrap]
* Webicons by [Font Awesome]
* jQuery JavaScript library by [The OpenJS Foundation]
* FormMail by [Tectite](http://www.tectite.com/)


## License

This work is licensed under a [Creative Commons Attribution 4.0 Unported License (CC BY 4.0)]

[Jekyll]: https://jekyllrb.com
[Edirom Summer School]: http://ess.uni-paderborn.de
[Bootstrap]: https://getbootstrap.com
[Font Awesome]: https://fontawesome.com
[The OpenJS Foundation]: https://openjsf.org
[Creative Commons Attribution 4.0 Unported License (CC BY 4.0)]: https://creativecommons.org/licenses/by/4.0/
[Docker Hub]: https://hub.docker.com/r/edirom/ess-website/
