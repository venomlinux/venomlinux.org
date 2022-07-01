# Introduction
You can create your own custom Venom Linux ISO with your customization, then this custom ISO can be use to install into other machine.
`./scripts/build.sh` script is used in this process.

## Prepare

Install required dependencies
```
sudo scratch install git syslinux squashfs-tools grub-efi dosfstools libisoburn
```

Cloning ports repository:
```sh
git clone --depth=1 https://github.com/venomlinux/ports
```

Enter ports repository:
```sh
cd ports
```

Modify script's config file:
```sh
cp scripts/config.default scripts/config
vim scripts/config
```

Fetch Venom Linux rootfs:
```sh
sudo ./scripts/build.sh -fetch
```

## Customize to your liking (optional)

Copy your config and customization files into `customize` directory:
> Note: For config files from user directory should be placed into `customize/etc/skel` directory. This configs will automatically copied over when user created.
```sh
mkdir customize
cp [your stuffs] customize/
```

Configure iso login and password, service and etc:
```sh
vim virootfs/root/custom_script.sh
```

## Generate the ISO

Generate iso with needed packages:
- `-zap`  is for cleaning existing working rootfs, then re-prepare rootfs
- `-pkg=` enter your desire package need to include into the iso with comma (,) separated
- `-iso`  is for generating iso
```sh
sudo ./scripts/build.sh -zap -pkg=pkg1,pkg2,pkg3,pkgN -iso
```

Your custom ISO should be created to top directory of ports repository.

## Testing the ISO

You can use qemu to test generated iso. Theres a script I wrote to easily run qemu with decent flags to test the iso.

First, install qemu:
```sh
sudo scratch install qemu
```

Test the iso:
```sh
./scripts/run_qemu <path to your iso>
```

Thats all you need to do to create your own custom iso.
