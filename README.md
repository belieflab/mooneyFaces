# Mooney Faces (mooney)

```
git clone --recurse-submodules -j4 git@github.com:belieflab/mooneyFaces.git && cd mooneyFaces && git submodule foreach --recursive 'git checkout $(git config -f $toplevel/.gitmodules submodule.$name.branch || echo main)' && git update-index --assume-unchanged exp/conf.js
```

## Overview 

This task presents a randomized array of 48 images of faces; half of the faces are upright and half are inverted.

The participant is prompted to respond whether the image present was or was not a face, within 5 seconds.

The Silverstein version adds 2 additional "forced choice" ratings:
1. whether the face appears to be an adult or child, and
2. whether the face appears to be more masculine or more feminine;
should the participant identifies an image as a face, regardless of its ground truth (upright or inverted).

The Silverstein version also adds 10 inverted and 10 upright catch images which should never be construed as a face.

The total administration time should last no longer than 15 minutes. 

Note: Participants cannot use their number pad for this task, they must use the numbers at the top of the keyboard. 
