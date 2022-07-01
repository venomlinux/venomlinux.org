# Introduction
If installing Venom Linux from official iso, default Venom use `slim` as display manager to start openbox session for simplicity. There are other display manager in the repo like `lightdm`, `lxdm` and `sddm`.

## Starting window manager or desktop environment through slim
`slim` display manager read `~/.xinitrc` file to start certain program and wm/de upon starting X server. Create `~/.xinitrc` contains this line:
```
exec ck-launch-session dbus-launch --sh-syntax --exit-with-session ~/.startx
```
* `ck-launch-session` required `consolekit2`
* `dbus-launch` required `dbus`

Then create `~/.startx` file to include other program to start along with your wm:
```
# place any program you like with ending '&'
feh --no-fehbg --bg-fill ~/Pictures/wallpaper1.jpg &
sleep 2 && picom -c -r 7 &
/usr/lib/polkit-gnome/polkit-gnome-authentication-agent-1 &

# replace with any wm you like. without ending '&'
dwm
```

Make `~/.startx` executable by running:
```
chmod +x ~/.startx
```

## Replacing Display Manager
I'm assuming `slim` is your current display manager. You can replacing display manager on the fly without rebooting your machine. First install display manager your choice. I use `lxdm` as example.
* install lxdm
```
$ sudo scratch install lxdm
```
* replace slim to lxdm service into `DAEMONS` variable in `/etc/rc.conf` to make it start on boot
```
$ sudo vim /etc/rc.conf
```
(at this point you can just reboot)
* stop slim then start lxdm in one line command
```
$ sudo /etc/rc.d/slim stop && sudo /etc/rc.d/lxdm start
```
Then you should be welcomed by lxdm login. Make sure you save all your work before doing this. 