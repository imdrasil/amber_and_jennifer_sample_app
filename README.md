# Jennifer + Amber sample application

This is a project presenting efficient integration of [Jennifer](https://github.com/imdrasil/jennifer.cr) ORM and [Amber](https://amberframework.org) web framework.

This project is inspired by [Ruby on Rails Tutorial sample application](https://bitbucket.org/railstutorial/sample_app_4th_ed).

## Getting Started

To get started with the app, clone the repo and then install the needed dependencies:

```shell
$ cd /path/to/repos
$ git clone git@github.com:imdrasil/amber_jennifer_sample_app.git
$ cd amber_jennifer_sample_app
$ shards
$ make setup
```

The last command copies `./config/database.yml.example` to `./config/database.yml`. All database parameters are located in `./config/database.yml` - complete them with your own values.

Next make the database setup.

```shell
$ make sam db:setup
```

This will automatically create development database, run all migrations and populate seeds.

To start a dev server just run:

```shell
$ amber watch
```

### Dependencies

* [amber](https://github.com/amberframework/amber)
* [jennifer](https://github.com/imdrasil/jennifer.cr)
* [sam](https://github.com/imdrasil/sam.cr)
* [pg](https://github.com/will/crystal-pg)
* [carbon](https://github.com/luckyframework/carbon)
* [jasper_helpers](https://github.com/amberframework/jasper-helpers) - Amber library of helpers for working with html;
* [citrine-i18n](https://github.com/amberframework/citrine-i18n) - Amber library for parsing translation local for I18n from request headers;
* [form_object](https://github.com/imdrasil/form_object)
* [pager](https://github.com/imdrasil/pager) -.

#### Development dependencies

* [email_opener](https://github.com/imdrasil/email_opener)
* [garnet_spec](https://github.com/amberframework/garnet-spec)

## Tests

TBA

## TODO

* [ ] implement "Remember me* using cookies
* [ ] cover functionality with tests
* [ ] 404 and 500 pages; "rescue from" functionality

## Contributing

1. Fork it ( https://github.com/imdrasil/test/fork )
2. Create your feature branch ( `git checkout -b my-new-feature` )
3. Commit your changes ( `git commit -am 'Add some feature'` )
4. Push to the branch ( `git push origin my-new-feature` )
5. Create a new Pull Request

## Contributors

- [imdrasil](https://github.com/imdrasil) Roman Kalnytskyi - creator, maintainer
