Mostly from [https://docs.docker.com/installation/windows/]

1. Install [boot2docker](http://boot2docker.io/)
1. Run `set PATH=%PATH%;C:\Program Files\Oracle\VirtualBox;C:\Program Files\Boot2Docker for Windows;C:\Program Files (x86)\Git\bin`
1. Setup file shares

  For some reason, the only `automount` that works in boot2docker iso is `/c/Users` so we just have to replace that with our own share.
  1. Run `boot2docker stop` so we can make some changes
  1. Remove the old shared folder `VBoxManage sharedfolder remove boot2docker-vm --name c/Users`
  1. Run `VBoxManage sharedfolder add boot2docker-vm --automount --name c/Users --hostpath %cd%`
  1. Run `boot2docker start`
1. Connect to boot2docker with PuTTY:
  1. Download [PuTTY](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe)
  1. Download [PuTTYGen](http://the.earth.li/~sgtatham/putty/latest/x86/puttygen.exe)
  1. Download [Pageant](http://the.earth.li/~sgtatham/putty/latest/x86/pageant.exe)
  1. Run `puttygen` and import the docker private key from `%HOMEPATH%\.ssh\id_boot2docker`
  1. Click "Save Private Key" & save it as `%HOMEPATH%\.ssh\id_boot2docker.ppk`
  1. Run `pageant` & add the ppk to it
  1. Run `PuTTY` and connect to `docker@127.0.0.1:2022`
1. Create a new container
  1. ?
1. Hit http://localhost:3000 & enjoy Supp!
