# Local Development Setup

## Goals

Avoid installing tools and packages on host machine

Adopt infrastruct as code practice to create remote development environment on guest machine

Capture the installation state to easy destroy, easy setup whenever devbox is messed up

## Prepare

Host machine required: Virutal, Vagrant, VSCode

```
mkdir <workspace_directory>/affablebean-microservice-tutorial/localdev/guest<n>
cd <workspace_directory>/affablebean-microservice-tutorial/localdev/guest<n>
touch ansible.yml
touch Vagrantfile
touch ssh_config

# Copy contents into ansible.yml and Vagrantfile
# Then startup guest machine
vagrant up

# After guest machine done setup
# Copy the output into ssh_config
vagrant ssh-config
```

Install VSCode [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

Point the extension SSH configuration file to `ssh_config` file

Guest machine `/vagrant` is sync with `/affablebean-microservice-tutorial` of host machine