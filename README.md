# Sprinklers
A simple webserver I use to manage my irrigation system.

# Sprinklers
A simple webserver I use to manage my irrigation system.

## Setup
### Avahi
Install [avahi](http://elinux.org/RPi_Advanced_Setup) on the raspberry pi. gain ssh access by `ssh {{hostname}}.local`

### Node
Install [NVM](https://github.com/creationix/nvm). Use nvm to install a node version (I'm using 7.2.1).
```bash
$ nvm install 7.2.1
```

### Bulletproof
The pi should start the webserver on boot and keep the webserver running no matter what errors occur. This way the lawn is always green. 

- forever
- cron

### Loggging
TODO: Set up email logging so errors are known.
