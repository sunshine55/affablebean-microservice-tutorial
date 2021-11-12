# Kubernetes Cluster Setup with Vagrant

## Prerequisites

Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html) on host machine.

## Provisioning

See `Vagrantfile` for cluster setup (3 nodes)

Forked from (gist)[https://gist.github.com/danielepolencic/ef4ddb763fd9a18bf2f1eaaa2e337544] (see comments for latest setup updates)

## Startup

```bash
$ vagrant up
```

## Destroy

```bash
$ vagrant destroy -f
```