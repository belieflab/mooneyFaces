# Mooney Faces (mooney)

## Overview
Participants will see black and white images and decide whether they think the image is a face. They will press ‘0’ if they think it is not a face and ‘1’ if they do.  

Note: Participants cannot use their number pad for this task, they must use the numbers at the top of the keyboard. 

**Approx run time: 5 minutes**

_The Mooney Faces Task presents a randomized array of 48 images with a break in between. The total administration time should last no longer than 8 minutes._


## Cloning: 
```
git clone --recurse-submodules -j4 git@github.com:belieflab/mooneyFaces.git && cd mooneyFaces && git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)' && git update-index --assume-unchanged exp/conf.js 
    
```
