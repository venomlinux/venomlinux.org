# Introduction
Venom Linux use [BSD-style init](https://github.com/venomlinux/rc) based on sysvinit which inspired by CRUX. Its written in simple shell script without dependency handling. Its up to user on which service need to start first or last. This BSD-style init contains:
* `/etc/rc` - main bootscript executed by /sbin/init
* `/etc/rc.conf` - configuration file
* `/etc/rc.single` - single-user mode script
* `/etc/rc.multi` - multi-user mode script
* `/etc/rc.local` - local script executed by rc.multi script
* `/etc/rc.shutdown` - shutdown script
* `/etc/rc.subr` - subroutine script sourced by other scripts to run certain function
* `/etc/inittab` - sysinit's inittab file
* `/etc/rc.d/` - directories for services/daemons
* `/etc/modules-load.d/` - directories for load kernel modules on boot up
* `/usr/bin/modules-load` - script for loading kernel modules listed in /etc/modules-load.d/

## /etc/rc.conf
`/etc/rc.conf` - contain variables sourced by `/etc/rc` script during boot up. These variables are:
* `HARDWARECLOCK` - need to set to either `UTC` or `localtime`
* `TIMEZONE` - set your timezone, eg: `Asia/Kuala_Lumpur`. Check `/usr/share/zoneinfo` for more timezones.
* `KEYMAP` - set your keymap to load. Can be left empty. See loadkeys(8).
* `FONT` - set your console font to load. Can be left empty. See setfont(8).
* `DAEMONS` - set your desire service to load on boot up with order of your choice. Check `/etc/rc.d/` for existing services.

## /etc/modules-load.d/
Place your desired kernel modules to load on boot with `.conf` suffix, eg:
```
$ cat /etc/modules-load.d/kvm.conf
# Load kvm.ko at boot
kvm
```

## starting/restarting/stopping service
You can start/restart/stop service without reboot by running `/etc/rc.d/<service name> <start/restart/stop>`, eg:
* To start a service:
```
# /etc/rc.d/networkmanager start
```
* To restart a service:
```
# /etc/rc.d/networkmanager restart
```
* To stop a service:
```
# /etc/rc.d/networkmanager stop
```

## Writing your own service
Writing service is dead simple, you can to use certain function into your service:
* print nice message - `msg <your message>`
* to start - `start_daemon [-f] [-n nicelevel] [-p pidfile] program [args...]`
* to stop - `stop_daemon [-p pidfile] program [signal]`
* get status - `status_daemon [-p pidfile] program`
* get process id - `procpid [-p pidfile] program`

Example of simple service script:
```
# cat /etc/rc.d/test
#!/bin/sh

. /etc/rc.subr

case $1 in
        start)
                msg "Starting test daemon..."
                start_daemon /usr/bin/test --example-option
                ;;
        stop)
                msg "Stopping test daemon..."
                stop_daemon /usr/bin/test
                ;;
        restart)
                $0 stop
                sleep 1
                $0 start
                ;;
        status)
                status_daemon /usr/bin/test
                ;;
        *)
                echo "usage: $0 [start|stop|restart|status]"
                ;;
esac
```
`NOTE: make sure source /etc/rc.subr at top of the script`

Then you can start it by running `/etc/rc.d/test start`. You can check `/etc/rc.d/` for existing services to learn from.