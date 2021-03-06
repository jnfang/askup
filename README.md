# AskUp

AskUp is an application designed to improve learning and retention.

## Local configuration

### Ruby, rails
* App has been developed thus far using Ruby 2.1.4 and Rails 4.2.0
* You need a Ruby environment (you can use e.g. rbenv or rvm to manage different environments)
* AskUp uses bundler for dependencies, so you'll need to run `bundle install` in your Ruby environment 
  to ensure all the gems are available that the app uses.

### Settings
There are two types of application configuration settings in AskUp.

1. `Rails.configuration.askup` is defined in `application.rb`, and other application-wide settings
 can be found in `config/environments/`.
2. Secrets are handled by [Figaro](https://github.com/laserlemon/figaro). Copy `application.yml.example` to 
 `application.yml` and edit any settings you need. For deployment to Heroku or running under the production 
  environment you will need at least `askup_secret_key_base` (used to set the Rails secret key base for the 
  production environment); the others are needed if you plan to use/test different functions of the app, like
  sending mail for password resets (via Devise; see below).

#### Mail settings (optional)

*Note: You only need to define these if you need to test/use the mail components, e.g. in Devise.*

* Mail server settings

        askup_mail_host_username
        askup_mail_host_password
        askup_mail_host_address
        askup_mail_host_domain
        askup_mail_host_port

    * You could use e.g. gmail or mailgun for this. If using mailgun, 
      username will be the Default SMTP Login value (e.g. `postmaster@sandbox...`) 
      in your [sandbox domain](https://mailgun.com/app/domains), and the password will 
      come from that domain's Default Password. 
      ([More info on gmail or mailgun setup](http://www.gotealeaf.com/blog/handling-emails-in-rails).)
    * (Note that in development, default settings disable mail delivery.)

* App server settings

        askup_url_options_host
        askup_url_options_protocol

    * When Devise sends out emails to reset password, etc, we need to be able to direct
      the user to the right server. These settings default to `localhost:3000` and `http`
      for local development, but will need to be the publicly accessible domain and `https` in
      production (e.g. the heroku app domain for staging, or askup.net for production).

### Database and seed data
* `bundle exec rake db:setup` to set up your (development) database (this will seed it as well)

#### Running the production environment locally (optional)
* install postgres
* run postgres (set up agent, or run manually)
* `bundle exec rake db:setup RAILS_ENV=production` to set up your production database
* `bundle exec rake assets:precompile RAILS_ENV=production` to ensure your JS and CSS files are compiled
* make sure `askup_secret_key_base` is defined in your `application.yml`

## Heroku configuration

You can deploy the app to heroku as well. Below is a streamlined list of instructions, 
based on Heroku's [getting started guide](https://devcenter.heroku.com/articles/getting-started-with-rails4).

* [local workstation setup](https://devcenter.heroku.com/articles/getting-started-with-rails4#local-workstation-setup)
* `heroku create`
* `figaro heroku:set -e production`
* `git push heroku (my git branch):master`
* `heroku run rake db:setup`
* `heroku open`
