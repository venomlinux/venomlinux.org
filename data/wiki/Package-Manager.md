# Introduction
Venom Linux use [scratchpkg](https://github.com/venomlinux/scratchpkg) as main package manager. `scratchpkg` is simple package manager that written in POSIX shell script. Here is basic use as end user should know:

## scratch
Mostly user need to use `scratch` to manage packages.
```
$ scratch help                                                                                                            
Usage:
    scratch <options> [<arg>]
    
Options:
    install <ports> <arg>    install ports (use pkgbuild arg, except '-i' & '-u')
                             -r            reinstall
                             -n            skip dependencies
                             -y            skip ask user confirmation
                             -o            fetch sources only
                             --exclude=*   exclude dependencies, comma separated

    upgrade <ports> <arg>    upgrade ports (use pkgbuild arg, except '-i' & '-r')
                             -n            skip dependencies
                             -y            skip ask user confirmation
                             -o            fetch sources only
                             --exclude=*   exclude dependencies, comma separated

    remove  <ports> <arg>    remove installed ports (use pkgdel arg)
                             -y            skip ask user confirmation

    sysup           <arg>    full system upgrade (use pkgbuild arg, except '-i', '-r'  & '-u')
                             -n            skip dependencies
                             -y            skip ask user confirmation
                             -o            fetch sources only
                             --exclude=*   exclude dependencies, comma separated

    deplist <ports>          print all dependencies for ports
                             -q            skip installed ports
                             --exclude=*   exclude dependencies, comma separated

    build   <ports> <arg>    build ports (use pkgbuild arg, except '-i', '-u', '-r', '-g', & '-p')
                             --log         log build process (/var/log/pkgbuild.log)

    trigger      [ports]     run system trigger
    search       <pattern>   find ports in repo
    cat          <port>      print spkgbuild
    depends      <port>      print dependencies
    dependent    <port>      print dependent
    path         <port>      print path in repo
    provide      <file>      print port's provided file
    readme       <port>      print readme file, if exist
    files        <port>      print files installed
    info         <port>      print information
    locate       <file>      print location of file in ports repo
    isinstalled  <port>      check whether port is installed (status 0=installed, 1=not installed)
    purge        [ports]     remove installed ports and its orphan dependencies
    world        [ports]     print/add/remove world list
    sync                     update ports database
    outdate                  print outdated ports
    cache                    print and clear old pkg and src caches
    integrity                check installed port integrity
    dup                      print duplicate ports in repo
    installed                print all installed ports
    missingdep               print missing dependencies
    orphan                   print orphan installed ports
    foreign                  print foreign ports
    printconfig <opts>       print scratchpkg configs
    help                     print this help msg

Global options:
    --append-repo=<repo path>       append custom local repo path (can use multiple times)
    --prepend-repo=<repo path>      prepend custom local repo path (can use multiple times)
    --override-repo=<repo path>     override repo in /etc/scratchpkg.repo with custom local repo (can use multiple times)
    --repo-file=<repo file>         use custom repo file (default: /etc/scratchpkg.repo)
    --config-file=<config file>     use custom config file (default: /etc/scratchpkg.conf)
    --alias-file=<alias file>       use custom alias file (default: /etc/scratchpkg.alias)
    --mask-file=<mask file>         use custom mask file (default: /etc/scratchpkg.mask)
    --nocolor                       disable colour for output
```

## revdep
`revdep` is script to check broken packages caused by changed soname by certain installed library. `revdep` is advised to run after package upgrades and removals. 
```
$ revdep -h
Usage:
  revdep [option] [arg]

Options:
  -a, --all                         print all affected files
  -r, --rebuild                     rebuild & reinstall broken package
  -p, --package <pkg>               check for certain package
  -f, --no-filter                   skip filter (exclude) dirs, files and libraries
  -e, --exclude <pkg1 pkg2 pkgN>    exclude package when rebuild (use with -r/--rebuild)
  -y, --yes                         dont ask user confirmation to rebuild package (use with -r/--rebuild)
  -h, --help
```

## portsync
`portsync` is script to sync latest ports. `portsync` is similar to `scratch sync`.

## /etc/scratchpkg.repo
Repo directory is define in `/etc/scratchpkg.repo` with the `url` to fetch from. Example:
```
# your local repo
/usr/ports/myrepo

# official venom repo
/usr/ports/core        https://github.com/venomlinux/ports/tree/repos/core
/usr/ports/main        https://github.com/venomlinux/ports/tree/repos/main
/usr/ports/multilib    https://github.com/venomlinux/ports/tree/repos/multilib
/usr/ports/nonfree     https://github.com/venomlinux/ports/tree/repos/nonfree
#/usr/ports/testing    https://github.com/venomlinux/ports/tree/repos/testing
```
repo order is matter, if theres duplicate ports exist within repos, ports in higher priority repo is used.

## local repo
If you want to set up local repo just add your repo path into `/etc/scratchpkg.repo`. If you have duplicate ports from other repos, make sure your repo is above other repos.

## /etc/scratchpkg.mask
You can exclude certain packages upgrades from `scratch sysup` by adding it into `/etc/scratchpkg.mask`. Example if you want to keep current version of `gcc` and `glibc`:
```
# echo gcc >> /etc/scratchpkg.mask
# echo glibc >> /etc/scratchpkg.mask
```
then everytime you run `scratch sysup`, `gcc` and `glibc` will be ignored.

## /etc/scratchpkg.alias
You can point certain dependency into other ports by making port alias in `/etc/scratchpkg.alias`. Example if you want to use `rust-bin` instead of `rust` because compiling `rust` from source required a lot of resources and time.
```
# echo 'rust rust-bin' >> /etc/scratchpkg.alias
```
from now on, any ports depends on `rust` will pull `rust-bin` instead. You can also ignore certain dependency by making port alias into empty port. Example:
```
# echo 'libva' >> /etc/scratchpkg.alias
```
then `libva` will not pulled by `scratch` as dependency of any ports.
