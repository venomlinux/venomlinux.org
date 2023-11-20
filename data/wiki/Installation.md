# Venom Installation from staged image

Get latest Venom Linux staged image [here](https://github.com/venomlinux/ports/releases)

## Preparing partition

### BIOS systems with MBR.

Create a partition to install Venom Linux on.

```
# cfdisk
# mkswap /dev/sda1
# mkfs.ext4 -L Venom /dev/sda2
```
Create a directory to mount the created partition then mount it.

```
# mkdir /mnt/venom
# mount /dev/sda2 /mnt/venom
```

### EFI systems with GPT.

EFI system requieres aditional partition in vfat for /boot, create it first:

```
# mkfs.vfat /dev/sda1
# cfdisk
# mkswap /dev/sda2
# mkfs.ext4 -L Venom /dev/sda3
```
Create the directories to mount /root and /boot.

```
# mkdir -pv /mnt/venom/boot
# mount /dev/sda3 /mnt/venom
# mount /dev/sda1 /mnt/venom/boot/
```

## Extract Venom's image

Extract Venom's image to the mounted location.

```
# tar xvJpf venom-rootfs-<version>.tar.xz -C /mnt/venom
```

## Enter chroot

Chroot into the extracted venom image.

```
# mount -v --bind /dev /mnt/venom/dev
# mount -vt devpts devpts /mnt/venom/dev/pts -o gid=5,mode=620
# mount -vt proc proc /mnt/venom/proc
# mount -vt sysfs sysfs /mnt/venom/sys
# mount -vt tmpfs tmpfs /mnt/venom/run
# mkdir -pv /mnt/venom/$(readlink /mnt/venom/dev/shm)
# cp -L /etc/resolv.conf /mnt/venom/etc/
# chroot /mnt/venom /bin/bash
```

## Configuring system

Configure the system's hostname, timezone, clock, font, keymap and daemon:

```
# vim /etc/rc.conf
```

Configure /etc/fstab:

```
# vim /etc/fstab
```

Configure locales:

```
# vim /etc/locales
```
uncomment required locales, then run:
```
# genlocales
```

Configure root password:
```
# passwd
```

Add a user:
```
# useradd -m -G users,wheel,audio,video -s /bin/bash <your user>
```
then create a password for your user:
```
# passwd <your user>
```

Kernel installation:
* Sync repositories:
```
# scratch sync
```
* Upgrade system:
```
# scratch sysup
```
* Kernel installation:
```
# scratch install linux
```
> Note: replace 'linux' with 'linux-lts' if you want to use the lts version

Configure the bootloader, GNU `grub`:
* Bios
```
# grub-install /dev/sdX
# grub-mkconfig -o /boot/grub/grub.cfg
```
> Note: replace 'X' with your partition drive

* EFI
	* Install 'grub-efi' package
```
# grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id="venomlinux"
# grub-mkconfig -o /boot/grub/grub.cfg
```
 
Exit chroot environment:
```
# exit
```

Unmount venom partition you mounted before:
```
# umount -v /mnt/venom/dev/pts
# umount -v /mnt/venom/dev
# umount -v /mnt/venom/run
# umount -v /mnt/venom/proc
# umount -v /mnt/venom/sys
# umount /mnt/venom
```

You can restart your machine now, Venom Linux should be bootable.
```
# reboot
```
