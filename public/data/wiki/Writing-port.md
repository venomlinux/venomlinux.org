# Writing ports

Venom Linux uses a package format akin to BSD's ports. The `pkgbuild` tool creates packages from a
`spkgbuild`. A `spkgbuild` is a recipe that contains all metdata relating to a package, and the
instructions to build the package.

In this guide I will use `dfc` as an example. `dfc` is a commandline tool that displays storage space
usage using graphs and colors. The website for `dfc` is `https://projects.gw-computing.net/projects/dfc` and
the source tarball is `https://projects.gw-computing.net/attachments/download/615/dfc-3.1.1.tar.gz`.

## Requirements

- fakeroot

> Note: Install the dependencies using `scratch`, if you haven't already.

## Create local repository

I reccommend creating a local repository, in your home directory.

```
$ mkdir myports
$ cd myports
$ pwd
/home/emmett/myports
```

## Create ports template

Use `portcreate` to create an initial template for your port, then `cd` into its directory. The usage is `portcreate <pkg>`.

```
$ portcreate dfc
Template port have created for 'dfc'.
$ cd dfc
$ pwd
/home/emmett/myports/dfc
```

The template that is created is as follows:

```
# description   :
# depends       :

name=dfc
version=
release=1
options=""
noextract=""
backup=""
source=""

build() {
        cd $name-$version
        ./configure --prefix=/usr
        make
        make DESTDIR=$PKG install
}
```

## spkgbuild format

- `# description`: Short description for package (**required**)
- `# depends`: All required dependencies, space separated
- `name=`: Package name, need same as port directory's name (**required**)
- `version=`: Package's version (**required**)
- `release=`: Package's release version, useful when build script need change with same package version (**required**)
- `source=""`: Package's source urls, space separated (**required**)
- `options=""`: Package's build options, see 'Package options' below for available options
- `backup=""`: File need backup when upgrading package, without leading with '/'
- `noextract=""`: Specify file no need to extract, space separated
- `nostrip=""`: list file to avoid strip, can use regex
- `build() {}`: all build command should placed in this function (**required**)
- `$PKG`: fake installation directory
- `$SRC`: extracted and prepared sources directory

> Note: The port's name must be lower-case and cannot contain spaces or hyphens (-). Using sed to correct this is common.

> Note: If upstream uses a timestamp versioning such as 30102014, ensure to use the reversed date, i.e. 20141030
> (ISO 8601 format). Otherwise, the package will not appear as a newer version.

> Note: For `source=""`, use `<new-source-name>::<source-url>` to save a source file with a different name.
	
> Example: source="$name-$version.tar.gz::https://github.com/Rolinh/dfc/archive/v${version}.tar.gz"

### Package options

For global options, set them in `/etc/scratchpkg.conf`:
```
OPTIONS=""
```

If you need to set options for a specific package, set them in the package's spkgbuild.
```
options=""
```

Add a ! in front of an option to disable it. For instance, to disable stripping and removal of empty directors in a package, you would do the following:
as follows:

```
options="!strip !emptydirs"
```

Available options:

```
libtool:     Keep libtool file (*.la) in packages.
emptydirs:   Keep empty directories in packages.
strip:       Strip symbols from binaries/libraries.
zipman:      Compress manual (man and info) pages with gzip.
buildflags:  Enable buildflags (CFLAGS and CXXFLAGS).
makeflags:   Enable makeflags (MAKEFLAGS).
checksum:    Enable checking checksum.
```

## Edit spkgbuild

Edit the `spkgbuild` to insert any needed variables, information and build commands. Use your favourite
text editor to edit it.

```
$ vim spkgbuild
```

Here is `dfc`'s `spkgbuild`:

```
# description	: Commandline tool to displays file system space usage using graphs and colors
# depends	: cmake

name=dfc
version=3.1.1
release=1
source="https://projects.gw-computing.net/attachments/download/615/dfc-$version.tar.gz"

build() {
	cd $name-$version

	cmake . -DPREFIX=/usr \
		-DSYSCONFDIR=/etc \
		-DCMAKE_BUILD_TYPE=RELEASE
        make
        make DESTDIR=$PKG install

	# remove unused stuff
        rm -r $PKG/{usr/share/man,etc/xdg/dfc}/{fr,nl}
}
```

The `spkgbuild` is now complete. Now, to build it.
> Note: The `pkgbuild` tool requires root access to build a package.
> For new packages, it is recommended to use the `fakeroot` tool to build it. 
> If you have incorrectly configured your package, no lasting changes will be made.

Run `fakeroot pkgbuild` inside the port's directory to build it.

```
$ fakeroot pkgbuild
==> Downloading 'https://projects.gw-computing.net/attachments/download/615/dfc-3.1.1.tar.gz'.
--2019-12-16 14:11:54--  https://projects.gw-computing.net/attachments/download/615/dfc-3.1.1.tar.gz
Resolving projects.gw-computing.net (projects.gw-computing.net)... 37.59.30.58
Connecting to projects.gw-computing.net (projects.gw-computing.net)|37.59.30.58|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: unspecified [application/gzip]
Saving to: '/mnt/data/venom/sources/dfc-3.1.1.tar.gz.partial'

/mnt/data/venom/sources/dfc-     [   <=>                                        ]  51.47K  45.0KB/s    in 1.1s

2019-12-16 14:11:58 (45.0 KB/s) - '/mnt/data/venom/sources/dfc-3.1.1.tar.gz.partial' saved [52709]
==> Unpacking 'dfc-3.1.1.tar.gz'...
==> Start build 'dfc-3.1.1-1'.
+ build
+ cd dfc-3.1.1
+ cmake . -DPREFIX=/usr -DSYSCONFDIR=/etc -DCMAKE_BUILD_TYPE=RELEASE
CMake Warning (dev) at /usr/share/cmake-3.16/Modules/Compiler/ADSP-DetermineCompiler.cmake:4 (set):
  Policy CMP0053 is not set: Simplify variable reference and escape sequence
  evaluation.  Run "cmake --help-policy CMP0053" for policy details.  Use the
  cmake_policy command to set the policy and suppress this warning.

  For input:

    '
    #if defined(__VISUALDSPVERSION__)
      /* __VISUALDSPVERSION__ = 0xVVRRPP00 */
    # define @PREFIX@COMPILER_VERSION_MAJOR @MACRO_HEX@(__VISUALDSPVERSION__>>24)
    # define @PREFIX@COMPILER_VERSION_MINOR @MACRO_HEX@(__VISUALDSPVERSION__>>16 & 0xFF)
...
...
...
-- Installing: /mnt/data/venom/work/dfc/pkg/usr/share/doc/dfc/README.md
-- Installing: /mnt/data/venom/work/dfc/pkg/usr/share/doc/dfc/TRANSLATORS.md
-- Installing: /mnt/data/venom/work/dfc/pkg/usr/share/locale/fr/LC_MESSAGES/dfc.mo
-- Installing: /mnt/data/venom/work/dfc/pkg/usr/share/locale/nl/LC_MESSAGES/dfc.mo
+ rm -r /mnt/data/venom/work/dfc/pkg/usr/share/doc /mnt/data/venom/work/dfc/pkg/usr/share/locale /mnt/data/venom/work/dfc/pkg/usr/share/man/fr /mnt/data/venom/work/dfc/pkg/usr/share/man/nl /mnt/data/venom/work/dfc/pkg/etc/xdg/dfc/fr /mnt/data/venom/work/dfc/pkg/etc/xdg/dfc/nl
==> Build 'dfc-3.1.1-1' success.
drwxrwxr-x root/root         0 2019-12-16 14:19 etc/
drwxrwxr-x root/root         0 2019-12-16 14:19 etc/xdg/
drwxrwxr-x root/root         0 2019-12-16 14:19 etc/xdg/dfc/
-rw-r--r-- root/root      1672 2017-09-09 15:11 etc/xdg/dfc/dfcrc
drwxrwxr-x root/root         0 2019-12-16 14:19 usr/
drwxrwxr-x root/root         0 2019-12-16 14:19 usr/share/
drwxrwxr-x root/root         0 2019-12-16 14:19 usr/share/man/
drwxrwxr-x root/root         0 2019-12-16 14:19 usr/share/man/man1/
-rw-r--r-- root/root      2473 2017-09-09 15:11 usr/share/man/man1/dfc.1.gz
drwxrwxr-x root/root         0 2019-12-16 14:19 usr/bin/
-rwxr-xr-x root/root     51984 2019-12-16 14:19 usr/bin/dfc
==> Successfully created package 'dfc-3.1.1-1.spkg.tar.xz'. (21K)
```

If nothing goes wrong, you will succeed build the package. Then you can install it using `pkgbuild -i`. This time
you really need root to install to real system, use sudo.

```
$ sudo pkgbuild -i
```

Also you can install using `pkgadd <pkg.spkg.tar.xz>`. By default, fetched source will be in
`/var/cache/scratchpkg/sources` and created package will be in `/var/cache/scratchpkg/packages`
directory. You can modify this location in `scratchpkg` config file, `/etc/scratchpkg.conf`.

## Install script

Install scripts are shell scripts that can be used to run commands upon upgrade, removal or installation. The
name of the script run on installtion is `install`. The install script needs to be placed in the port's directory. It will
be included in the compressed package.

This script is executed using `sh`. The following arguments are passed to the install script, 
based on which action is being used.

### install:
```
$1 : pre-install/post-install
$2 : version
```

### upgrade:
```
$1 : pre-upgrade/post-upgrade
$2 : version
$3 : old version
```

### remove:
```
$1 : pre-remove/post-remove
$2 : old version
```

An example install script for `dbus`:

```
# package install script

action=$1
newversion=$2
oldversion=$3

case $action in
        pre-install)
                getent group messagebus >/dev/null || groupadd -g 18 messagebus
                getent passwd messagebus >/dev/null || useradd -c "D-Bus Message Daemon User" -d /var/run/dbus -u 18 -g messagebus -s /bin/false messagebus
                ;;
        post-install)
                dbus-uuidgen --ensure
                ;;
esac
```

